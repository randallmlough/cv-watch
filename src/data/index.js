import { format, parse } from 'date-fns';
import CovidTrackingProject from './covid_tracking_project';
/**
 * A data object data array or object and it's last updated timestamp.
 * @typedef {Object} Data
 * @property {Array<Object[]>|Object} value store.
 * @property {string} lastUpdated string timestamp.
 */
const data = {
  value: undefined,
  lastUpdated: undefined,
};
/**
 * A cache object that stores data.
 * @typedef {Object} Cache
 * @property {Data} us stores the US data.
 * @property {Object} states stores the us states cache.
 */
const cache = {
  us: data,
  states: {
    all: data,
    current: data,
    // add state key
    // ex. states['AK'] = data
  },
};

/**
 * Data creates a new data source to be used to cache or fetch data from it's sources
 *
 * @class Data
 */
export default class Data {
  /**
   * Creates an instance of Data.
   * @param {string} defaultSource
   * @memberof Data
   */
  constructor(defaultSource) {
    this.source = defaultSource ? defaultSource : 'covidTrackingProject';
    this.cache = {
      covidTrackingProject: cache,
    };
  }
  changeSource(source) {
    this.source = source;
  }

  /**
   * us daily gets the current US daily data
   *
   * @param {boolean} [refresh=false] skip cache check and check for new data
   * @returns {Data} data object containing the results of the fetch
   * @memberof Data
   */
  async usDaily(refresh = false) {
    try {
      if (!refresh) {
        const cache = this.cache[this.source];
        if (cache.us && cache.us.value && cache.us.value.length > 0) {
          return cache.us;
        }
      }

      let results;
      if (this.source === 'covidTrackingProject') {
        const source = new CovidTrackingProject();
        results = await source.fetchUSHistoricData();
      }

      const data = {
        value: results,
        lastUpdated: new Date(),
      };
      this.cache[this.source].us = data;
      return data;
    } catch (e) {
      console.log('error fetching us daily', e);
      throw 'could not fetch us daily data';
    }
  }

  async statesData(stateId = 'all', refresh = false) {
    try {
      let cache;
      if (!refresh) {
        cache = this.cache[this.source].states;
        if (cache && cache[stateId] && cache[stateId].value) {
          return cache[stateId];
        }
      }

      let states;
      if (stateId != 'all' && cache && cache.all.value) {
        states = cache.all.value;
      } else {
        if (this.source === 'covidTrackingProject') {
          const source = new CovidTrackingProject();
          states = await source.fetchStatesHistoricData('all');
        }
      }

      let results;
      if (stateId != 'all') {
        if (Array.isArray(results)) {
          results.forEach();
        }
        results = states.filter((row) => row.id === stateId);
      } else {
        results = states;
      }

      const data = {
        value: results,
        lastUpdated: new Date(),
      };
      this.cache[this.source].states[stateId] = data;
      return data;
    } catch (e) {
      console.log('error fetching statesData', e);
      throw 'could not fetch states data';
    }
  }
  /**
   * us daily gets the current US daily data
   *
   * @param {boolean} [refresh=false] skip cache check and check for new data
   * @returns {Data} data object containing the results of the fetch
   * @memberof Data
   */
  async statesCurrent(refresh = false) {
    try {
      let cache;
      if (!refresh) {
        cache = this.cache[this.source].states;
        if (cache && cache.current && cache.current.value) {
          return cache.current;
        }
      }

      let results;
      if (this.source === 'covidTrackingProject') {
        const source = new CovidTrackingProject();
        results = await source.fetchStatesCurrentValues();
      }

      const data = {
        value: results,
        lastUpdated: new Date(),
      };
      this.cache[this.source].states.current = data;
      return data;
    } catch (e) {
      console.log('error fetching us daily', e);
      throw 'could not fetch us daily data';
    }
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
          // todo this cleaner
          let date;
          if (value.date.length > 10) {
            date = format(new Date(value.date), 'MM/dd/yyyy');
          } else {
            date = format(
              parse(value['date'], 'yyyyMMdd', new Date()),
              'MM/dd/yyyy',
            );
          }

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
}
