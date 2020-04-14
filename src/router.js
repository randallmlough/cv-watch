import * as views from './views';

const router = (config = {}) => {
  const { title } = config;
  const url = new URL(window.location.href);
  switch (url.pathname) {
    case '':
    case '/':
    default:
      return views.home(title);
  }
};

export default router;
