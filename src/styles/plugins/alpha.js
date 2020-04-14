const Color = require('color');

const defaultAlphas = [0.75, 0.5, 0.25];

function alphaGenerator(colors, alphas) {
  objIter(colors, alphas);
}

function objIter(obj, alphas) {
  for (let [key, value] of Object.entries(obj)) {
    if (key === 'transparent' || value === 'transparent') continue;
    else if (typeof value === 'string') {
      alphas.forEach((a) => {
        const color = Color(value).alpha(a).string();
        obj[`${key}-a${a.toString().slice(2)}`] = color;
      });
    } else if (typeof value === 'object') {
      objIter(value, alphas);
    }
  }
  return obj;
}

module.exports = function (opts = {}) {
  return ({ theme }) => {
    let { alphas = defaultAlphas } = opts;
    colors = theme('colors', {});
    alphaGenerator(colors, alphas);
  };
};
