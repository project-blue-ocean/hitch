const express = require('express');
const axios = require('axios');
const morgan = require('morgan');
const path = require('path');
const compression = require('compression');
const dummy = require('./rideSamples.js');
const fakeprofile = require('./profileSamples.js');

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
  const location = req.query.location;
  const options = {
    method: 'GET',
    url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json`,
    params: {
      "access_token": config.mapbox,
    }
  };

  axios.request(options).then((response) => {
    res.send(response.data);
  }).catch((error) => {
    console.error(error);
  });
})

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
      "alternatives":"false",
      "geometries":'geojson',
      "overview":"simplified",
      "steps":"false",
      "access_token": config.mapbox,
    },
  };
  axios.request(options).then((response) => {
    res.send(response.data);
  }).catch((error) => {
    console.error(error);
    res.send(error)
  });
})

app.get('/rides', (req, res) => {
  // ? dummy api call for fake data
  const search = JSON.parse(req.query.search);
  const from = search.source;
  const toCity = search.destination;
  const results = [];
  for (let i = 0; i < dummy.length; i += 1) {
    if (dummy[i].origin.toLowerCase().includes(from) && toCity.length < 2) {
      results.push(dummy[i]);
    } else if (toCity.length >= 2) {
      if (dummy[i].origin.toLowerCase().includes(from)
        && dummy[i].destination.toLowerCase().includes(toCity)) {
        results.push(dummy[i]);
      }
    }
  }
  res.send(results);
});

app.get('/profile', (req, res) => {
  res.send(fakeprofile);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

app.listen(config.port, () => {
  console.log(`listening on port ${config.port}`);
});
