const express = require('express');
const app = express();
const User = require('./models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost:27017/authDemo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
  console.log("Mongo Connection Open!!");
}).catch(err => {
  console.log("Oh no! Mongo Connection error!");
  console.log(err)
})

app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', (req, res) => {
  res.send('This is the home page!');
})

app.get('/register', (req, res) => {
  res.render('register');
})

app.post('/register', async (req, res) => {
  const { password, username } = req.body;
  const hash = await bcrypt.hash(password, 12);
  const user = new User({
    username,
    password: hash
  })
  await user.save();
  res.redirect('/')
})

app.get('/login', (req, res) => {
  res.render('login');
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    res.send("Incorrect username or password")
  }
  const validPassword = await bcrypt.compare(password, user.password)
  if (validPassword) {
    res.send(`Welcome in ${username}!`);
  } else {
    res.send('Incorrect username or password');
  }
})


app.get('/secret', (req, res) => {
  res.send('This is a secret! You cannot see me!');
})

app.listen(3000, () => {
  console.log('Listening on port 3000!');
})