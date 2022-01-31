const express = require('express');
const axios = require('axios');
const morgan = require('morgan');
const path = require('path');
const dummy = require('./rideSamples.js');
const fakeprofile = require('./profileSamples.js');

const app = express();
const config = require('../config');

// Middleware
app.use(express.json());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '/../client/dist')));
// Note: this wildcard route could cause issues for
// axios requests sent from client-side

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
