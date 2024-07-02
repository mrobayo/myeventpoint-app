const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path')

const worldCites = [];

function loadWorldCities() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, '../../data/worldcities.csv'))
      .pipe(parse({
        comment: '#',
        columns: true,
      }))
      .on('data', async (data) => {
        worldCites.push(data);
      })
      .on('error', (err) => {
        reject(err);
      })
      .on('end', async () => {
        console.log(`World cities ${worldCites.length}`);
        //const countCities = (await getAllCities()).length
        //console.log(`${countCities} cites found!`);
        resolve();
      });
  });
}

module.exports = {
  worldCites,
  loadWorldCities,
};
