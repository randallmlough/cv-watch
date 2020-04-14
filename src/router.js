import * as views from './views';

const router = (config = {}) => {
  const { title } = config;
  const url = new URL(window.location.href);
  switch (url.pathname) {
    case '':
    case '/':
      return views.home(title);
    default:
      return views.notFound;
  }
};

export default router;
