import { html } from 'lit-html';
import { percentChange, numberWithCommas } from '../util';
import { until } from 'lit-html/directives/until.js';

const changeTemplate = (change) => {
  let color = 'text-gray-500 text-sm';
  let changeText = 'No change';
  if (change > 0) {
    color = 'text-green-400';
    changeText = `${change}%`;
  } else if (change < 0) {
    color = 'text-red-400';
    changeText = `${change}%`;
  }
  return html`<span
    class="absolute ml-2 pb-1 text-base ${color}"
    style="left:100%"
    >${changeText}</span
  >`;
};
export const datapoint = (data, attribute) =>
  html` <div class="flex py-4">
    ${until(
      data.then(({ current, previous }) => {
        if (current[attribute] === null) {
          return html`<span
            class="font-bold leading-none text-4xl text-gray-700"
            >No data</span
          >`;
        }
        let change;
        if (previous && previous[attribute]) {
          change = percentChange(current[attribute], previous[attribute]);
        }
        return html`
          <span
            class="flex font-bold leading-none items-end justify-end text-4xl text-gray-700 relative"
          >
            ${numberWithCommas(current[attribute])} ${changeTemplate(change)}
          </span>
        `;
      }),
      html`<span>Loading...</span>`,
    )}
  </div>`;

export const dataCard = ({ title, dataSource, attribute }) => html`
  <div class="flex-grow w-full lg:w-3/12 mb-5 lg:mb-0 px-4">
    <div class="bg-white px-5 py-2 shadow rounded">
      <div>
        <h4 class="text-gray-500 text-sm">${title}</h4>
      </div>
      ${datapoint(dataSource, attribute)}
    </div>
  </div>
`;

export const dataCards = (source, cards) => {
  if (!cards) {
    cards = [
      {
        title: 'Positive Cases',
        dataSource: source,
        attribute: 'positive',
      },
      {
        title: 'Current Hospitalized',
        dataSource: source,
        attribute: 'hospitalizedCurrently',
      },
      {
        title: 'Total Recovered',
        dataSource: source,
        attribute: 'recovered',
      },
      {
        title: 'Total Deaths',
        dataSource: source,
        attribute: 'death',
      },
    ];
  }

  return html`
    <div class="flex flex-wrap justify-around -mx-4">
      ${cards.map((card) => dataCard(card))}
    </div>
  `;
};
