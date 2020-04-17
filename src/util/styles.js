/**
 * cssVar gets the CSS Variable value from root
 *
 * @param {string} name The css variable name to fetch
 * @returns {string} value The value associated with the css variable
 */
export const cssVar = (name) => {
  if (typeof name === 'string') {
    if (!name.startsWith('--')) {
      name = `--${name}`;
    }
  }

  return getComputedStyle(document.documentElement).getPropertyValue(name);
};

/**
 * datasetColorGenerator creates an object with style key/values to be used in a dataset
 *
 * @param {string} color the color name to create
 * @returns {Object} The style object for the color
 */
export const datasetColorGenerator = (color) => {
  return {
    backgroundColor: cssVar(`--color-${color}-500-a25`).trim(),
    borderColor: cssVar(`--color-${color}-500`).trim(),
    hoverBackgroundColor: cssVar(`--color-${color}-500-a75`).trim(),
    hoverBorderColor: cssVar(`--color-${color}-500`).trim(),
  };
};
