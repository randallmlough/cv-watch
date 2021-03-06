const get = async function (url = '') {
  try {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'GET',
    });
    return response.json(); // parses JSON response into native JavaScript objects
  } catch (error) {
    return error;
  }
};

export const parseCSV = (file) =>
  new Promise(async (resolve, reject) => {
    try {
      await Papa.parse(`/static/data/${file}`, {
        header: true,
        download: true,
        complete: function (results) {
          resolve(results);
        },
      });
    } catch (e) {
      reject(e);
    }
  });

const ctpApi = 'https://covidtracking.com/api';
export const CovidTrackingProject = {
  loadFile: (fileName) =>
    parseCSV(`/static/data/covid_tracking_project/${fileName}`),

  fetchStatesCurrentValues: async () => {
    try {
      return formatCovidTrackingProjectStateData(
        await get(`${ctpApi}/v1/states/current.json`),
      );
    } catch (e) {
      return e;
    }
  },
  fetchStatesHistoricData: async () => {
    try {
      return formatCovidTrackingProjectStateData(
        await get(`${ctpApi}/v1/states/daily.json`),
      );
    } catch (e) {
      return e;
    }
  },
  fetchStatesInformation: async () => {
    try {
      return formatCovidTrackingProjectStateData(
        await get(`${ctpApi}/v1/states/info.json`),
      );
    } catch (e) {
      return e;
    }
  },
  fetchUSCurrentValues: async () => get(`${ctpApi}/v1/us/current.json`),
  fetchUSHistoricData: async () => get(`${ctpApi}/us/daily`),
  fetchCounties: async () => get(`${ctpApi}/counties`),
};

const formatCovidTrackingProjectStateData = (data) => {
  const stateData = [];
  if (Array.isArray(data)) {
    data.forEach((value) => {
      const stateDatapoint = {
        id: value.state.toLowerCase(),
        date: value.dateChecked,
        death: value.death,
        hospitalized: value.hospitalized,
        hospitalizedCurrently: value.hospitalizedCurrently,
        negative: value.negative,
        positive: value.positive,
        recovered: value.recovered,
        total: value.totalTestResults,
      };
      stateData.push(stateDatapoint);
    });
  }
  return stateData;
};
