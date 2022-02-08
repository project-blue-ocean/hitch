/* eslint-disable quote-props */
const express = require('express');
const axios = require('axios');
const morgan = require('morgan');
const path = require('path');
const compression = require('compression');

const app = express();
const config = require('../config');

// Middleware
app.use(compression());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/../client/dist')));
// Note: this wildcard route could cause issues for
// axios requests sent from client-side

app.get('/coords', (req, res) => {
  const { location } = req.query;
  const options = {
    method: 'GET',
    url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json`,
    params: {
      'access_token': config.mapbox,
    },
  };

  axios.request(options).then((response) => {
    res.send(response.data);
  }).catch((error) => {
    res.send(error);
  });
});

app.get('/directions', (req, res) => {
  const startCoords = JSON.parse(req.query.startCoords);
  const endCoords = JSON.parse(req.query.endCoords);
  const startLongitude = startCoords.longitude;
  const startLatitude = startCoords.latitude;
  const endLongitude = endCoords.longitude;
  const endLatitude = endCoords.latitude;
  const options = {
    method: 'GET',
    url: `https://api.mapbox.com/directions/v5/mapbox/driving/${startLongitude}%2C${startLatitude}%3B${endLongitude}%2C${endLatitude}`,
    params: {
      'alternatives': 'false',
      'geometries': 'geojson',
      'overview': 'simplified',
      'steps': 'false',
      'access_token': config.mapbox,
    },
  };
  axios.request(options).then((response) => {
    res.send(response.data);
  }).catch((error) => {
    res.send(error);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

app.listen(config.port, () => {
  console.log(`listening on port ${config.port}`);
});
