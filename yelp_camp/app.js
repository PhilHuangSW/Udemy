const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/home', (req, res) => {
  res.render('home');
})

app.get('*', (req, res) => {
  res.render('home');
})

app.listen(8080, () => {
  console.log('Listening on port: 8080!')
})