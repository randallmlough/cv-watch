import Page from '../page';
import { html } from 'lit-html';
import lineChart from '../charts/line';
import { dataCards } from '../components';
import { positiveCasesLineChart, deathsLineChart } from '../components/chart';
import statesTable from '../components/table/states_table';

const page = 'United States';

export default class Homepage extends Page {
  onMount() {
    this.data.usDaily().then((source) => {
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
    const { title } = this.page;
    const data = this.data.usDaily().then(({ value }) => {
      return { current: value[0], previous: value[1] };
    });

    const statesTableData = this.data
      .statesCurrent()
      .then((results) => results.value);
    return html`
      <div class="container mx-auto py-5 px-5 lg:px-0">
        <!-- <h1 class="text-4xl lg:text-6xl text-primary-500">${title}</h1> -->
        <h3 class="md:w-1/2 lg:w-4/12 text-gray-600">
          Aggregating Covid-19 data from credible sources and presenting the
          data in an easy to digest manner.
        </h3>
      </div>
      <div class="container mx-auto pt-5 px-5 lg:px-0">
        <h2 class="text-4xl lg:text-6xl text-gray-700 font-bold">
          ${page}
        </h2>
      </div>
      <div class="container mx-auto pb-5 px-5 lg:px-0 mb-5">
        ${dataCards(data)}
      </div>
      <section>
        <div class="container mb-10 px-5 lg:px-0 mx-auto ">
          <div class="bg-white p-5 rounded shadow">
            ${positiveCasesLineChart({ subtitle: `${page} daily cases` })}
          </div>
        </div>
        <div class="container mb-10 px-5 lg:px-0 mx-auto ">
          <div class="bg-white p-5 rounded shadow">
            ${deathsLineChart()}
          </div>
        </div>
      </section>
      <section>
        <div class="container mb-10 px-5 lg:px-0 mx-auto ">
          <div class="bg-white p-5 rounded shadow">
            <header class="mb-5">
              <h3 class="font-bold text-xl text-gray-700">By State</h3>
            </header>
            <div class="overflow-x-scroll">
              ${statesTable(statesTableData)}
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
