const express = require('express');
const app = express();

app.get('/greet', (req, res) => {
  res.send('Hello!')
})

