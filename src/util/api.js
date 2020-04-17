const api = {
  /**
   * get gets data from a specified URL
   *
   * @param {string} [url='']
   * @returns {object}
   */
  get: async function (url = '') {
    try {
      // Default options are marked with *
      const response = await fetch(url, {
        method: 'GET',
      });
      return response.json(); // parses JSON response into native JavaScript objects
    } catch (error) {
      return error;
    }
  },
};

export default api;
