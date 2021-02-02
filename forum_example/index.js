const express = require('express');
const path = require('path');

const port = 3000;
const app = express();

let posts = [
  {
    author: "Andrew",
    comment: "This is my comment"
  },
  {
    author: "Phil",
    comment: "I'm the best"
  },
  {
    author: "Raina",
    comment: "I don't read the rules"
  }
]

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  // const { author, comment } = req.body;
  // res.render('home', { author, comment });
  res.render('home', { posts });
})

app.get('/new', (req, res) => {
  res.render('new');
})

app.get('/home', (req, res) => {
  res.send('Get /new response');
})

app.post('/home', (req, res) => {
  console.log(req.body);
  res.send('It worked!')
})

app.listen(3000, () => {
  console.log(`Listening on port: ${port}`);
})