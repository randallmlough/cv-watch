import Chart from 'chart.js';
import { datasetColorGenerator } from '../util/styles';

/**
 *
 *
 * @param {*} ctx
 */
const lineChart = async (ctx, datapoints = [], opts = {}) => {
  const { hideLabel = false } = opts;
  let el;
  if (typeof ctx === 'string') {
    el = document.getElementById(ctx);
  }
  const chart = new Chart(el, {
    type: 'line',
    data: {},
    options: {
      responsive: true,
      legend: {
        display: !hideLabel,
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true,
      },
      scales: {
        x: {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Month',
          },
        },
        y: {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Value',
          },
        },
      },
    },
  });

  datapoints.forEach(({ data, options, labels }, i) => {
    chart.data.labels = labels;
    chart.data.datasets[i] = {
      label: options.label,
      data: data,
      borderWidth: 1,
      hoverBorderWidth: 1,
      ...datasetColorGenerator(options.color),
    };
  });

  chart.update();
};

export default lineChart;
