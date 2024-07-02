const { worldCites } = require("../../models/world-cities.model");

function getWorldCities(request, response) {
  return response.status(200).json(worldCites);
}

module.exports = {
  getWorldCities,
}
