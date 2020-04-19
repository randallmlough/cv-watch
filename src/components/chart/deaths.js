import { html } from 'lit-html';

export const deathsLineChart = (options = {}) => {
  const { title = 'Total Deaths', subtitle = undefined } = options;
  return html`<header class="mb-5">
      ${title &&
      html`<h3 class="font-bold text-xl text-gray-700">${title}</h3>`}
      ${subtitle && html`<p class="text-gray-600">${subtitle}</p>`}
    </header>
    <canvas id="deaths" width="400" height="400"></canvas>`;
};
