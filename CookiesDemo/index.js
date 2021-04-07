const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser('thisismysecret'));

app.get('/greet', (req, res) => {
  const { name = "I don't think I know your name!" } = req.cookies;
  res.send(`Hello ${name}`)
})

app.get('/setname', (req, res) => {
  res.cookie('name', 'Phil');
  res.send('Okay, sent you a cookie!');
})

app.get('/getsignedcookie', (req, res) => {
  res.cookie('fruit', 'grape', { signed: true });
  res.send('signed your fruit cookie!');
})

app.get('/verifyfruit', (req, res) => {
  res.send(req.signedCookies);
})

app.listen(3000, () => {
  console.log('listening on localhost 3000');
})