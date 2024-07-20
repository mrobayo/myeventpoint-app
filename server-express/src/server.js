const http = require('http');
const app = require('./app');
const { loadWorldCities } = require("./models/world-cities.model");

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

async function startServer() {
  await loadWorldCities();

  server.listen(PORT, () => {
    console.log(`Listening EXPRESS server on port ${PORT}...`);
  });
}

startServer();