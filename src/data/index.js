export default (file) =>
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
