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

const ctpApi = 'https://covidtracking.com/api';
export default class CovidTrackingProject {
  // loadFile(fileName) {
  // parseCSV(`/static/data/covid_tracking_project/${fileName}`)
  // }

  async fetchStatesCurrentValues() {
    try {
      return formatCovidTrackingProjectStateData(
        await get(`${ctpApi}/v1/states/current.json`),
      );
    } catch (e) {
      return e;
    }
  }
  async fetchStatesHistoricData() {
    try {
      return formatCovidTrackingProjectStateData(
        await get(`${ctpApi}/v1/states/daily.json`),
      );
    } catch (e) {
      return e;
    }
  }
  async fetchStatesInformation() {
    try {
      return formatCovidTrackingProjectStateData(
        await get(`${ctpApi}/v1/states/info.json`),
      );
    } catch (e) {
      return e;
    }
  }
  async fetchUSCurrentValues() {
    return await get(`${ctpApi}/v1/us/current.json`);
  }
  async fetchUSHistoricData() {
    return await get(`${ctpApi}/us/daily`);
  }
  async fetchCounties() {
    return await get(`${ctpApi}/counties`);
  }
}

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
        positiveIncrease: value.positiveIncrease,
        recovered: value.recovered,
        total: value.totalTestResults,
      };
      stateData.push(stateDatapoint);
    });
  }
  return stateData;
};
