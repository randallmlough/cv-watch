import Router, { Route } from './router';
import { MainPage, NotFound, StatesPage } from './pages';

const defaults = {
  appTitle: '',
};
export default class App {
  constructor(rootElem, config) {
    const { title = '', dataSource } = config;
    this.rootElem = rootElem;
    this.title = title;
    this.dataSource = dataSource;
    this.init();
  }
  init() {
    const r = new Router(
      [
        new Route(
          '/',
          new MainPage(
            {
              title: this.title,
            },
            this.dataSource,
          ),
          true,
        ),
        new Route(
          '/states/:id',
          new StatesPage(
            {
              title: 'States Daily Info',
            },
            this.dataSource,
          ),
        ),
      ],
      this.rootElem,
    );
    this.router = r;
  }
}
