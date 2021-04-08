const express = require('express');
const session = require('express-session');
const app = express();

const sessionOptions = { secret: 'thisisasecret', resave: false, saveUninitialized: false };
app.use(session(sessionOptions));

app.get('/viewcount', (req, res) => {
  if (req.session.count) {
    req.session.count += 1;
  } else {
    req.session.count = 1;
  }
  res.send(`This is the view count: ${req.session.count} times!`)
})

app.get('/register', (req, res) => {
  const { username = 'unknown' } = req.query;
  req.session.username = username;
  res.redirect('/greet');
})

app.get('/greet', (req, res) => {
  const { username, count } = req.session;
  res.send(`Welcome back, ${username}! Here is the view count: ${count}`);
})

app.listen(3000, () => {
  console.log('Listening on localhost 3000!');
})