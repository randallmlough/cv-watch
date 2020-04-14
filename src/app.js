import { render as Render } from 'lit-html';
import router from './router';

const render = (element, route) => {
  const { layout, onMount } = route;
  Render(layout, element);
  if (onMount) {
    onMount();
  }
};

const appConfig = {
  title: 'CV Watch',
};

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  const route = router(appConfig);
  render(root, route);
});
