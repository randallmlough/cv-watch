import { render as Render } from 'lit-html';
import router from './router';

const render = (element, component) => {
  // const [layout, onMount] = route;
  Render(component.render(), element);
  if (component.onMount) {
    component.onMount();
  }
};

const appConfig = {
  title: 'CV ⌚',
};

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('root');
  const component = router(appConfig);
  render(app, component);
});
