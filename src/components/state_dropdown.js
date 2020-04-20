import { html } from 'lit-html';
import { statesAbv } from '../util';

export const stateDropdown = (title) => {
  const currentPage = location.pathname + location.hash;
  const handleClick = {
    handleEvent(e) {
      const wrapper = e.currentTarget.closest('.js-dropdown-wrapper');
      const container = wrapper.querySelector('.js-dropdown-container');
      container.classList.toggle('hidden');
    },
    // event listener objects can also define zero or more of the event
    // listener options: capture, passive, and once.
    capture: true,
  };

  const statesList = () => {
    const stateLink = [];
    for (let [key, value] of Object.entries(statesAbv)) {
      const href = key === 'US' ? '/#/' : `/#/states/${key}`;
      const link = html` <li class="mb-2 text-2xl">
        <a
          href=${href}
          class="block hover:text-orange-400 ${currentPage === href
            ? 'text-orange-400'
            : ''}"
          @click=${handleClick}
          >${value}</a
        >
      </li>`;
      stateLink.push(link);
    }
    return html`<ul class="h-64 overflow-y-scroll px-8 py-4">
      ${stateLink}
    </ul>`;
  };

  return html`
    <div class="relative inline-block js-dropdown-wrapper">
      <button
        class="flex items-center focus:outline-none"
        @click=${handleClick}
      >
        <h1 class="text-4xl lg:text-6xl text-gray-700 font-bold">
          ${title}
        </h1>
        <span
          class="leading-none text-xl lg:text-3xl text-gray-600 ml-2 lg:ml-3 mt-2 lg:mt-3"
          >&#9660;</span
        >
      </button>
      <div class="-mt-2 absolute hidden js-dropdown-container z-50">
        <div class="bg-gray-700 rounded shadow text-white">
          ${statesList()}
          <div
            class="bg-gray-800 opacity-50 py-3 text-center text-gray-200 text-sm"
          >
            &#9650; Scroll to find state &#9660;
          </div>
        </div>
      </div>
    </div>
  `;
};

document.addEventListener('click', (e) => {
  const wrapper = document.querySelector('.js-dropdown-wrapper');
  if (!wrapper.contains(e.target)) {
    const container = wrapper.querySelector('.js-dropdown-container');
    container.classList.add('hidden');
  }
});
