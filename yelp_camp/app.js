const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const methodOverride = require('method-override');
const morgan = require('morgan');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const catchAsync = require('./utils/catchAsync');
const Joi = require('joi');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
})

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.render('home');
})

app.get('/campgrounds', catchAsync(async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render('campgrounds/index', { campgrounds });
}))

app.get('/campgrounds/new', (req, res) => {
  res.render('campgrounds/new');
})

app.post('/campgrounds', catchAsync(async (req, res, next) => {
  const campgroundSchema = Joi.object({
    campground: Joi.object({
      title: Joi.string().required(),
      price: Joi.number().required().min(0)
    }).required()
  })
  const { error } = campgroundSchema.validate(req.body)
  if (error) {
    const msg = error.details.map(el => el.message).join(',')
    throw new ExpressError(msg, 400)
  }
  const campground = new Campground(req.body.campground);
  await campground.save();
  res.render('campgrounds/show', { campground });
}))

app.get('/campgrounds/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  res.render('campgrounds/show', { campground });
}))

app.get('/campgrounds/:id/edit', catchAsync(async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  res.render('campgrounds/edit', { campground });
}))

app.put('/campgrounds/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  // console.log(title)
  // console.log(location)
  console.log(req.body);
  const campground = await Campground.findByIdAndUpdate(id, req.body.campground, { new: true });
  // campground.title = title;
  // campground.location = location;
  // await campground.save()
  res.redirect(`/campgrounds/${campground.id}`);
}))

app.delete('/campgrounds/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndDelete(id)
  res.redirect('/campgrounds');
}))

app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
})

app.use((err, req, res, next) => {
  const { status = 400 } = err;
  if (!err.message) err.message = "This is a default error message, I don't know what went wrong!"
  res.status(status).render('error', { err });
})

app.listen(8080, () => {
  console.log('Listening on port: 8080!')
})
