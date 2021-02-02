const { PI, add } = require('./math');
const colors = require('colors');
const figlet = require('figlet');
const franc = require('franc');
const langs = require('langs');
const express = require('express');
const redditData = require('./data.json');
const path = require('path');
const port = 8080;

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

// This is important? This allows the template to work, kind of like MVC
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
  console.log("YAY! WE GOT A NEW REQUEST!")
  const title = "Homepage"
  res.render('home', { title })
});

app.get('/random', (req, res) => {
  const rand = Math.floor(Math.random() * 10) + 1;
  const title = "Random Number Page"
  res.render('random', { rand, title });
});

app.get('/r/:subreddit', (req, res) => {
  const { subreddit } = req.params;
  const data = redditData[subreddit];
  const title = "/r/" + subreddit;
  const notFound = "/r/youarelost"
  if (data) {
    res.render('subreddit', { ...data, title });
  } else {
    res.render('notfound', { subreddit, notFound, title })
  }
});

app.get('*', (req, res) => {
  res.send("<h1>Sorry, I don't recognize that page!</h1>")
});

app.listen(port, () => {
  console.log(`LISTENING ON PORT ${port}!`);
});


// console.log(add(5, 1))
// console.log(PI)
// console.log(math.square(8))

// figlet("Phil's Recipes!", function (err, data) {
//   if (err) {
//     console.log("Something went wrong")
//     console.dir(err)
//     return;
//   }
//   console.log(data.random)
// })

// const input = process.argv[2].toString();
// const code = franc(input);

// if (code !== 'und') {
//   // console.log(code)
//   const translated = langs.where("3", code);
//   console.log(translated.name.green)
// } else {
//   console.log('Cannot determine language, need more data.'.red)
// }

