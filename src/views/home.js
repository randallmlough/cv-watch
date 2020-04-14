import { html } from 'lit-html';
import barChart from '../charts/bar';
import { mockData } from '../data/mock';
import { canvas } from '../templates';

const layout = (page = {}) => {
  const { title, charts } = page;
  return html`
    <div class="container mx-auto">
      <h1 class="text-2xl text-primary-500">${title}</h1>
      ${charts.map((chart) => canvas(chart))}
    </div>
  `;
};

const home = (appTitle) => {
  const charts = [
    {
      id: 'myChart',
      data: mockData.data,
      options: mockData.options,
      type: barChart,
    },
  ];
  return {
    layout: layout({
      title: appTitle,
      charts: charts,
    }),
    onMount: () =>
      charts.forEach((chart) => {
        chart.type(
          document.getElementById(chart.id),
          chart.data,
          chart.options,
        );
      }),
  };
};

export default home;
