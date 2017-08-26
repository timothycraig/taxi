
const express = require('express');

const app = express();

// Watch for incoming GET requests
app.get('/api', (req, res) => {
  res.send({ hi: 'there' });
});

module.exports = app;
