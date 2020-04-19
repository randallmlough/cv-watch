export const parseRequestURL = () => {
  let url = location.hash.slice(1).toLowerCase() || '/';
  let r = url.split('/');
  let request = {
    resource: null,
    id: null,
    verb: null,
  };
  request.resource = r[1];
  request.id = r[2];
  request.verb = r[3];

  return request;
};

export function numberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export const percentChange = (newValue, oldValue) => {
  let change = (newValue - oldValue) / oldValue;
  return (change * 100).toFixed(2);
};

export const statesAbv = {
  AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
  AS: 'American Samoa',
  DC: 'District of Columbia',
  FM: 'Federated States of Micronesia',
  GU: 'Guam',
  MH: 'Marshall Islands',
  MP: 'Northern Mariana Islands',
  PW: 'Palau',
  PR: 'Puerto Rico',
  VI: 'Virgin Islands',
};
