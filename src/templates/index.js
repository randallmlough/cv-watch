import { html } from 'lit-html';

export const canvas = (options = {}) => {
  const { id = '' } = options;
  return html`<canvas id="${id}" width="400" height="400"></canvas>`;
};
