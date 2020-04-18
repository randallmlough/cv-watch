import { html } from 'lit-html';
import lineChart from '../charts/line';
import App from '../app';
import { dataCards, navbar } from '../templates';
import loadData from '../data';
import { statesAbv } from '../util/data';

const url = new URL(window.location.href);
const stateCode = url.pathname.substr(8, 2);

const stateData = loadData('covid_tracking_project/states-daily.csv').then(
  (results) => {
    if (results.data) {
      return results.data.filter((row) => row.state === stateCode);
    }
  },
);
export default class State extends App {
  onMount() {
    stateData.then((data) => {
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
    const currentData = stateData.then((results) => {
      return { current: results[0], previous: results[1] };
    });

    return html`
      ${navbar}
      <div class="container mx-auto pt-5 px-5 lg:px-0">
        <h1 class="text-6xl text-gray-700 font-bold">
          ${statesAbv[stateCode]}
        </h1>
      </div>
      <div class="container mx-auto pb-5 px-5 lg:px-0 mb-5">
        ${dataCards(currentData)}
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
    `;
  }
}
