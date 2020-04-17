import { MainPage, NotFound, StatesPage } from './views';

const router = (config = {}) => {
  const { title } = config;
  const url = new URL(window.location.href);
  switch (true) {
    case url.pathname === '' || url.pathname === '/':
      return new MainPage(config);
    case url.pathname.startsWith('/states/'):
      return new StatesPage(config);
    default:
      return new NotFound();
  }
};

export default router;
