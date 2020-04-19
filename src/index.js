import App from './app';
import Data from './data';

const dataSource = new Data();

const appConfig = {
  title: 'CV 🕵️‍♂️',
  dataSource,
};

window.addEventListener('load', () => {
  const root = document.getElementById('root');
  new App(root, appConfig);
});
