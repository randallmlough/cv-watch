import Chart from 'chart.js';
import { datasetColorGenerator } from '../util/styles';
/**
 * @typedef {Object} Data The Options to use in the function createElement.
 * @property {number} data the value of the data point
 * @property {string} label the label for the data point
 * @property {string} [backgroundColor] the background color for the data point
 * @property {string} [borderColor]  the border color for the data point
 */

const toChartData = (data = [{}], opts = {}) => {
  const { label } = opts;
  const chartData = {
    labels: [],
    datasets: [],
  };

  const dataset = {
    label: label,
    data: [],
    backgroundColor: [],
    hoverBackgroundColor: [],
    borderColor: [],
    hoverBorderColor: [],
    borderWidth: 1,
    hoverBorderWidth: 1,
  };

  data.forEach((d) => {
    for (let [key, value] of Object.entries(d)) {
      if (key === 'label') {
        chartData.labels.push(value);
      } else if (key === 'data') {
        dataset.data.push(value);
      } else if (key === 'backgroundColor') {
        dataset.backgroundColor.push(value);
      } else if (key === 'hoverBackgroundColor') {
        dataset.hoverBackgroundColor.push(value);
      } else if (key === 'borderColor') {
        dataset.borderColor.push(value);
      } else if (key === 'hoverBorderColor') {
        dataset.hoverBorderColor.push(value);
      }
    }
  });

  chartData.datasets.push(dataset);
  return chartData;
};

/**
 *
 *
 * @param {*} ctx
 */
const barChartOld = (ctx, data, opts = {}) => {
  const { label = undefined } = opts;
  return new Chart(ctx, {
    type: 'bar',
    data: toChartData(data, { label }),
    options: {
      legend: {
        display: label,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
};

const barChart = async (ctx, datapoints = [], opts = {}) => {
  const { hideLabel = false } = opts;
  let el;
  if (typeof ctx === 'string') {
    el = document.getElementById(ctx);
  }
  const chart = new Chart(el, {
    type: 'bar',
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

export default barChart;
