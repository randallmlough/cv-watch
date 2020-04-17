import { html } from 'lit-html';
import { until } from 'lit-html/directives/until.js';

export const header = (title) => html`<th class="px-4 py-2">${title}</th>`;
export const col = (content) =>
  html`<td class="border px-4 py-2">${content}</td>`;

export const row = (cols = []) =>
  html`<tr>
    ${cols.map((item) => col(item))}
  </tr>`;

export const table = (headers = [], rows = []) => {
  debugger;
  return html`<table class="table-auto">
    <thead>
      <tr>
        ${headers.map((item) => header(item))}
      </tr>
    </thead>
    <tbody>
      ${rows.map((item) => row(item))}
    </tbody>
  </table>`;
};

export const lazyTable = (source, opts = {}) => {
  const { headers = [], link = false, linkPrefix } = opts;

  return html`<table class="table-auto">
    <thead>
      <tr>
        ${headers.map((item) => html`<th class="px-4 py-2">${item}</th>`)}
      </tr>
    </thead>
    <tbody>
      ${until(
        source.then((rows) =>
          rows.map(
            (cols) =>
              html`<tr>
                ${cols.map((col, i) => {
                  if (link && i === 0) {
                    const href =
                      linkPrefix !== '' ? `${linkPrefix}/${col}` : `/${col}`;
                    return html`<td class="border px-4 py-2">
                      <a href="${href}" class="text-blue-500">${col}</a>
                    </td>`;
                  }
                  return html`<td class="border px-4 py-2">${col}</td>`;
                })}
              </tr>`,
          ),
        ),
        html`<tr>
          <td class="border px-4 py-2">Loading</td>
        </tr>`,
      )}
    </tbody>
  </table>`;
};
