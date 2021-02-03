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

// GET REQUEST FOR INDEX/HOMEPAGE OF COMMENTS
app.get('/comments', (req, res) => {
  // const { author, comment } = req.body;
  // res.render('home', { author, comment });
  res.render('comments/index', { posts });
})

// GET REQUEST FOR NEW FORM FOR COMMENTS
app.get('/comments/new', (req, res) => {
  res.render('comments/new');
})

// POST REQUEST FOR CREATING NEW COMMENTS
app.post('/comments', (req, res) => {
  console.log(req.body);
  const { author, comment } = req.body;
  posts.push({ author, comment, id: newID() })
  res.redirect('comments')
})

// GET REQUEST FOR SPECIFIC COMMENTS
app.get('/comments/:id', (req, res) => {
  const { id } = req.params;
  const comment = posts.find(c => c.id === id);
  console.log(comment)
  if (comment) {
    res.render('comments/show', { comment })
  } else {
    res.render('comments');
  }
})

// GET REQUEST FOR EDITING SPECIFIC COMMENTS
app.get('/comments/:id/edit', (req, res) => {
  const { id } = req.params;
  const comment = posts.find(c => c.id === id);
  if (comment) {
    res.render('comments/edit', { comment })
  } else {
    res.render('comments')
  }
})

// PATCH REQUEST FOR EDITING SPECIFIC COMMENTS
app.patch('/comments/:id', (req, res) => {
  const { id } = req.params;
  const comment = posts.find(c => c.id === id);
  const updatedComment = req.body.comment;
  comment.comment = updatedComment
  res.redirect('/comments')
  // res.send('hi!')
})

app.delete('/comments/:id', (req, res) => {
  const { id } = req.params;
  posts = posts.filter(c => c.id !== id);
  res.redirect('/comments')
})

app.listen(3000, () => {
  console.log(`Listening on port: ${port}`);
})