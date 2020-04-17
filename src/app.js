import { format, parse } from 'date-fns';

export default class App {
  constructor(page) {
    this.page = page;
  }

  getDataset(source, datapoints = {}) {
    if (!source) {
      return null;
    }

    const labels = [];
    const results = [];
    for (let [datapoint, options] of Object.entries(datapoints)) {
      const data = [];
      source.forEach((value) => {
        if (value['date']) {
          const date = format(
            parse(value['date'], 'yyyyMMdd', new Date()),
            'MM/dd/yyyy',
          );
          labels.push(date);
        }
        if (value[datapoint]) {
          data.push(value[datapoint]);
        }
      });
      results.push({ data, options, labels });
    }

    return results;
  }
  onMount() {}
  render() {}
}
