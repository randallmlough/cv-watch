import { render as Render } from 'lit-html';
import { parseRequestURL } from './util';

export class Route {
  constructor(path, layout, defaultRoute) {
    this.path = path;
    this.layout = layout;
    this.default = defaultRoute;
  }
  isActiveRoute(hashedPath) {
    const request = parseRequestURL();
    const parsedURL =
      (request.resource ? '/' + request.resource : '/') +
      (request.id ? '/:id' : '') +
      (request.verb ? '/' + request.verb : '');
    return parsedURL === this.path;
  }
}

export default class Router {
  constructor(routes, rootElem) {
    this.routes = routes;
    this.rootElem = rootElem;
    this.init();
  }
  init() {
    var r = this.routes;
    (function (scope, r) {
      window.addEventListener('hashchange', function (e) {
        scope.hasChanged(scope, r);
      });
    })(this, r);
    this.hasChanged(this, r);
  }
  hasChanged(scope, r) {
    // change location if url doesn't start with a hash
    if (!location.href.startsWith(location.origin + '/#/')) {
      location = window.location.origin + '/#' + location.pathname;
    } else {
      r.forEach((route) => {
        if (route.isActiveRoute(window.location.hash.substr(1))) {
          scope.render(route.layout);
        }
      });
    }
  }
  render(layout) {
    scroll(0, 0);
    Render(layout.render(), this.rootElem);
    if (layout.onMount) {
      layout.onMount();
    }
  }
}
