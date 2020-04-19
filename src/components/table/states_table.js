const headers = {
  id: 'State',
  positive: 'Positive',
  negative: 'Negative',
  recovered: 'Recovered',
  hospitalized: 'Hospitalized',
  death: 'Death',
};

const formatStatesTableData = (data) => {
  const tableData = [];
  data.forEach((row) => {
    const attributes = Object.keys(headers);
    const cols = [];
    for (let [key, value] of Object.entries(row)) {
      attributes.forEach((attr) => {
        if (attr === key) {
          cols.push(value);
        }
      });
    }
    tableData.push(cols);
  });
  return tableData;
};

export const statesTable = (source) => {
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
          ),
        ),
        html`<tr>
          <td class="border px-4 py-2">Loading</td>
        </tr>`,
      )}
    </tbody>
  </table>`;
};
