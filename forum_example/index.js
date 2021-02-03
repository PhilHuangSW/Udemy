const express = require('express');
const path = require('path');
const { v4: newID } = require('uuid');
const methodOverride = require('method-override');

const port = 3000;
const app = express();

let posts = [
  {
    id: newID(),
    author: "Andrew",
    comment: "This is my comment"
  },
  {
    id: newID(),
    author: "Phil",
    comment: "I'm the best"
  },
  {
    id: newID(),
    author: "Raina",
    comment: "I don't read the rules"
  }
]

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  // const { author, comment } = req.body;
  // res.render('home', { author, comment });
  res.render('home', { posts });
})

app.get('/new', (req, res) => {
  res.render('new');
})

app.post('/home', (req, res) => {
  console.log(req.body);
  const { author, comment } = req.body;
  posts.push({ author, comment, id: newID() })
  res.redirect('/')
})

app.get('/:id', (req, res) => {
  const { id } = req.params;
  const comment = posts.find(c => c.id === id);
  console.log(comment)
  if (comment) {
    res.render('show', { comment })
  } else {
    res.render('/');
  }
})

app.get('/:id/edit', (req, res) => {
  const { id } = req.params;
  const comment = posts.find(c => c.id === id);
  if (comment) {
    res.render('edit', { comment })
  } else {
    res.render('/')
  }
})

app.patch('/:id', (req, res) => {
  const { id } = req.params;
  const comment = posts.find(c => c.id === id);
  const updatedComment = req.body.comment;
  comment.comment = updatedComment
  res.redirect('/')
  // res.send('hi!')
})

app.delete('/:id', (req, res) => {
  const { id } = req.params;
  posts = posts.filter(c => c.id !== id);
  res.redirect('/')
})

app.listen(3000, () => {
  console.log(`Listening on port: ${port}`);
})