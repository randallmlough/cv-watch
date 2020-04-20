import Page from '../page';
import { html } from 'lit-html';
import { dataCards, navbar } from '../components';
import { parseRequestURL, statesAbv } from '../util';
import chart from '../components/chart';
import { lineChart, barChart } from '../charts';
import { stateDropdown } from '../components/state_dropdown';

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
      barChart(
        'pos-bar',
        this.data.getDataset(data, {
          positiveIncrease: {
            label: '# of positive cases',
            color: 'teal',
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
      barChart(
        'death-bar',
        this.data.getDataset(data, {
          deathIncrease: {
            label: '# of positive cases',
            color: 'orange',
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
        ${stateDropdown(state)}
      </div>
      <div class="container mx-auto pb-5 px-5 lg:px-0 mb-5">
        ${dataCards(currentData, [
          {
            title: 'Positive Cases',
            dataSource: currentData,
            attribute: 'positive',
          },
          {
            title: 'Current Hospitalized',
            dataSource: currentData,
            attribute: 'hospitalizedCurrently',
          },
          {
            title: 'Total Recovered',
            dataSource: currentData,
            attribute: 'recovered',
          },
          {
            title: 'Total Deaths',
            dataSource: currentData,
            attribute: 'death',
          },
        ])}
      </div>
      <section>
        <div class="container px-5 lg:px-0 mx-auto ">
          <div class="flex flex-wrap -mx-4">
            <div class="w-full lg:w-1/2 px-4 mb-10">
              <div class="h-full bg-white p-5 rounded shadow">
                ${chart({
                  id: 'positive',
                  title: 'Total positive cases',
                  subtitle: `${state}`,
                })}
              </div>
            </div>
            <div class="w-full lg:w-1/2 px-4 mb-10">
              <div class="h-full bg-white p-5 rounded shadow">
                ${chart({
                  id: 'pos-bar',
                  title: 'Daily positive cases',
                  subtitle: `${state}`,
                })}
              </div>
            </div>
          </div>
        </div>
        <div class="container px-5 lg:px-0 mx-auto ">
          <div class="flex flex-wrap -mx-4">
            <div class="w-full lg:w-1/2 px-4 mb-10">
              <div class="h-full bg-white p-5 rounded shadow">
                ${chart({
                  id: 'deaths',
                  title: 'Total deaths',
                  subtitle: `${state}`,
                })}
              </div>
            </div>
            <div class="w-full lg:w-1/2 px-4 mb-10">
              <div class="h-full bg-white p-5 rounded shadow">
                ${chart({
                  id: 'death-bar',
                  title: 'Daily deaths',
                  subtitle: `${state}`,
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
