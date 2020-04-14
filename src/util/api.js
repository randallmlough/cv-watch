const api = {
  /**
   * get gets data from a specified URL
   *
   * @param {string} [url='']
   * @returns {object}
   */
  get: async function postData(url = '') {
    try {
      // Default options are marked with *
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        //   body: JSON.stringify(),
      });
      return response.json(); // parses JSON response into native JavaScript objects
    } catch (error) {
      return error;
    }
  },
};

export default api;
