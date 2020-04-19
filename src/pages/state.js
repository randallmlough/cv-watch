import Page from '../page';
import { html } from 'lit-html';
import lineChart from '../charts/line';
import { dataCards, navbar } from '../components';
import { parseRequestURL, statesAbv } from '../util';
import { positiveCasesLineChart, deathsLineChart } from '../components/chart';

function stateId() {
  const request = parseRequestURL();
  return request.id;
}
export default class State extends Page {
  onMount() {
    this.data.statesData(stateId()).then((source) => {
      const data = [...source.value].reverse();
      lineChart(
        'deaths',
        this.data.getDataset(data, {
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
        this.data.getDataset(data, {
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
    const currentData = this.data.statesData(stateId()).then(({ value }) => {
      return { current: value[0], previous: value[1] };
    });
    const state = statesAbv[stateId().toUpperCase()];

    return html`
      ${navbar}
      <div class="container mx-auto pt-5 px-5 lg:px-0">
        <h1 class="text-4xl lg:text-6xl text-gray-700 font-bold">
          ${state}
        </h1>
      </div>
      <div class="container mx-auto pb-5 px-5 lg:px-0 mb-5">
        ${dataCards(currentData)}
      </div>
      <section>
        <div class="container mb-10 px-5 lg:px-0 mx-auto ">
          <div class="bg-white p-5 rounded shadow">
            ${positiveCasesLineChart({ subtitle: `${state} daily cases` })}
          </div>
        </div>
        <div class="container mb-10 px-5 lg:px-0 mx-auto ">
          <div class="bg-white p-5 rounded shadow">
            ${deathsLineChart()}
          </div>
        </div>
      </section>
    `;
  }
}
