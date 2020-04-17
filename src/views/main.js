import { html } from 'lit-html';
import { until } from 'lit-html/directives/until.js';
import lineChart from '../charts/line';
import App from '../app';
import { lazyTable, dataCards } from '../templates';
import loadData from '../data';

const mainData = loadData('covid_tracking_project/us-daily.csv').then(
  (results) => results.data,
);

const headers = {
  state: 'State',
  positive: 'Positive',
  negative: 'Negative',
  recovered: 'Recovered',
  hospitalized: 'Hospitalized',
  death: 'Death',
};
const statesTableData = loadData(
  'covid_tracking_project/states-current.csv',
).then((results) => {
  const tableData = [];
  results.data.forEach((row) => {
    const attributes = Object.keys(headers);
    const cols = [];
    for (let [key, value] of Object.entries(row)) {
      if (attributes.includes(key)) {
        cols.push(value);
      }
    }
    tableData.push(cols);
  });
  return tableData;
});
export default class Homepage extends App {
  onMount() {
    mainData.then((data) => {
      data.reverse();
      lineChart(
        'deaths',
        this.getDataset(data, {
          death: {
            label: '# of deaths',
            color: 'red',
          },
        }),
        {
          hideLabel: true,
        },
      );
      lineChart(
        'positive',
        this.getDataset(data, {
          positive: {
            label: '# of positive cases',
            color: 'blue',
          },
        }),
        {
          hideLabel: true,
        },
      );
    });
  }

  render() {
    const { title } = this.page;
    const data = mainData.then((results) => {
      return { current: results[0], previous: results[1] };
    });
    return html`
      <div class="container mx-auto py-5 px-5 lg:px-0">
        <h1 class="text-6xl text-primary-500">${title}</h1>
      </div>
      <div class="container mx-auto py-5 px-5 lg:px-0 mb-5">
        ${dataCards(data)}
      </div>
      <section>
        <div class="container bg-white mb-10 mx-auto p-5 rounded shadow">
          <header class="mb-5">
            <h3 class="font-bold text-xl text-gray-700">Positive cases</h3>
            <p class="text-gray-600">United States daily cases</p>
          </header>
          <canvas id="positive" width="400" height="400"></canvas>
        </div>
        <div class="container bg-white mb-10 mx-auto p-5 rounded shadow">
          <header class="mb-5">
            <h3 class="font-bold text-xl text-gray-700">Total Deaths</h3>
            <p class="text-gray-600">United States daily cases</p>
          </header>
          <canvas id="deaths" width="400" height="400"></canvas>
        </div>
      </section>
      <section>
        <div class="container bg-white mb-10 mx-auto p-5 rounded shadow">
          <header class="mb-5">
            <h3 class="font-bold text-xl text-gray-700">By State</h3>
          </header>
          ${lazyTable(statesTableData, {
            headers: Object.values(headers),
            link: true,
            linkPrefix: '/states',
          })}
        </div>
      </section>
    `;
  }
}
