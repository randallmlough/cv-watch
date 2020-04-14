/**
 * @typedef {Object} Options The Options to use in the function createElement.
 * @property {string} [className] Classes to add to the element
 * @property {string} [innerText] Inner text to add to the element
 * @property {Object} [opts.attributes = {}]  Attributes to add to the element, like an id
 */

/**
 * createElement creates an html element
 *
 * @param {string} element The type of html element to create
 * @param {Options} [opts] Options to add to the element
 * @returns {HTMLElement} The html element created
 */
export const createHTMLElement = (element, opts = {}) => {
  const { className, innerText, attributes = {} } = opts;
  const el = document.createElement(element);

  if (className) {
    const classes = className.split(' ');
    el.classList.add(...classes);
  }

  if (innerText) {
    el.appendChild(document.createTextNode(innerText));
  }

  for (let [key, value] of Object.entries(attributes)) {
    el.setAttribute(key, value);
  }
  return el;
};

export const createCanvasElement = (id, opts = {}) => {
  const { attributes = {} } = opts;
  attributes.id = id;
  opts.attributes = attributes;
  return createHTMLElement('canvas', opts);
};
