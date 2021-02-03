const express = require('express');
const path = require('path');

const port = 8080;
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let tasks = [
  {
    task: "buy",
    assigned: "rain"
  }
];

app.get('*', (req, res) => {
  res.render('todo', { tasks });
})

app.post('*', (req, res) => {
  const { task, assigned } = req.body;
  tasks.push({ task, assigned });
  res.redirect('todo');
})

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})