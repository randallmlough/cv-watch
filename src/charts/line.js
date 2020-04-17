import Chart from 'chart.js';
import { datasetColorGenerator } from '../util/styles';

/**
 * @typedef {Object} Data The Options to use in the function createElement.
 * @property {number} data the value of the data point
 * @property {string} label the label for the data point
 * @property {string} [backgroundColor] the background color for the data point
 * @property {string} [borderColor]  the border color for the data point
 */

const toLineChartData = (data = [{}], opts = {}) => {
  const { labels = [] } = opts;
  const chartData = {
    labels: [],
    datasets: [],
  };

  const dataset = {
    label: label,
    data: [],
    backgroundColor: '',
    hoverBackgroundColor: '',
    borderColor: '',
    hoverBorderColor: '',
    borderWidth: 1,
    hoverBorderWidth: 1,
  };

  data.forEach((set) => {
    chartData.datasets.push(set);
  });

  return chartData;
};

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
