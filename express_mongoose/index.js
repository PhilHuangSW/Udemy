const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product.js');

const app = express();

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Mongo Connection Opened!");
  })
  .catch(err => {
    console.log("Mongo Connection Error Occurred!")
    console.log(err)
  });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/dog', (req, res) => {
  res.send('Woof!');
})

app.listen(8080, () => {
  console.log("Listening on Port: 8080");
})

