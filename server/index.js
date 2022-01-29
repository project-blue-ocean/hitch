const express = require('express');
const axios = require('axios');
const morgan = require('morgan');
const path = require('path');

const app = express();
const config = require('../config');

// Middleware
app.use(express.json());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '/../client/dist')));
// Note: this wildcard route could cause issues for
// axios requests sent from client-side
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

app.listen(config.port, () => {
  console.log(`listening on port ${config.port}`);
});
