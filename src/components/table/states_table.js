import { html } from 'lit-html';
import { until } from 'lit-html/directives/until.js';
import { statesAbv, numberWithCommas } from '../../util';

const headers = {
  id: 'State',
  positive: 'Positive',
  negative: 'Negative',
  recovered: 'Recovered',
  hospitalizedCurrently: 'Hospitalized',
  death: 'Death',
};

const formatStatesTableData = (data) => {
  const tableData = [];
  data.forEach((row) => {
    const attributes = Object.keys(headers);
    const cols = [];
    attributes.forEach((attr) => {
      if (row[attr]) {
        let value;
        if (typeof row[attr] === 'number') {
          value = numberWithCommas(row[attr]);
        } else {
          value = row[attr];
        }
        cols.push(value);
      } else {
        cols.push(null);
      }
    });
    tableData.push(cols);
  });
  return tableData;
};

const statesTable = (source) => {
  return html`<table class="table-auto">
    <thead>
      <tr>
        ${Object.values(headers).map(
          (item) => html`<th class="px-4 py-2">${item}</th>`,
        )}
      </tr>
    </thead>
    <tbody>
      ${until(
        source.then((rows) => {
          const data = formatStatesTableData(rows);
          return data.map(
            (cols) =>
              html`<tr>
                ${cols.map((col, i) => {
                  if (i === 0) {
                    const href = `/states/${col}`;
                    return html`<td class="border px-4 py-2">
                      <a href="${href}" class="text-blue-500"
                        >${statesAbv[col.toUpperCase()]}</a
                      >
                    </td>`;
                  }
                  return html`<td class="border px-4 py-2">${col}</td>`;
                })}
              </tr>`,
          );
        }),

        html`<tr>
          <td class="border px-4 py-2">Loading</td>
        </tr>`,
      )}
    </tbody>
  </table>`;
};

export default statesTable;
