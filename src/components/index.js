import { html } from 'lit-html';

export { table, lazyTable } from './tables';
export { datapoint, dataCards } from './data';

export const logo = html`<a href="/#/"
  ><h1 class="text-2xl text-primary-500">CV ⌚</h1></a
>`;

export const navbar = html`
  <header>
    <div class="container mx-auto flex items-center py-4 px-5 lg:px-0">
      <div class="mr-10">${logo}</div>
      <nav>
        <ul>
          <li>
            <a href="/#/" class="text-blue-400 text-sm font-bold">Home</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
`;
