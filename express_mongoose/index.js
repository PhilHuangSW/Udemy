const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product.js');
const methodOverride = require('method-override');
const categories = ['fruit', 'vegetable', 'dairy'];
const AppError = require('./AppError');
// import { AppError } from './AppError'

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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.get('/products', async (req, res) => {
  const { category } = req.query;
  if (category) {
    const products = await Product.find({ category })
    res.render('products/index', { products, category })
  } else {
    const products = await Product.find({})
    res.render('products/index', { products, category: 'All' })
  }
})

app.get('/products/new', async (req, res, next) => {
  // throw new AppError('Not Allowed', 123);
  // return next(new AppError(`Something happened 😭`, 404));
  res.render('products/new', { categories });
})

app.post('/products', async (req, res, next) => {
  try {
    const { name, price, category } = req.body;
    const newProduct = new Product(req.body);
    await newProduct.save();
    // console.log(`name: ${name}`);
    // console.log(`price: ${price}`);
    // console.log(`category: ${category}`);
    res.redirect('products');
  } catch (e) {
    next(e);
  }
})

// app.get('/products/edit', async (req, res) => {
//   const { name, price, category } = req.body;
//   console.log(req.body);
//   res.send('editing');
// })

app.get('/products/:id', async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    console.log('........')
    return next(new AppError('It does not work!', 404));
  }
  res.render('products/show', { product });
})

app.get('/products/:id/edit', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product) {
    res.render(`products/edit`, { product, categories })
  } else {
    res.redirect('products');
  }
})

app.put('/products/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, category } = req.body;
    const product = await Product.findByIdAndUpdate(id, { name: name, price: price, category: category }, { runValidators: true, new: true });
    res.redirect(`/products/${product.id}`);
  } catch (e) {
    next(e)
  }
})

app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  res.redirect('/products');
})

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).send(message);
})

app.get('*', async (req, res) => {
  const products = await Product.find({})
  res.render('products/index', { products, category: 'All' })
})

// app.get('*/*', async (req, res) => {
//   const products = await Product.find({})
//   res.render('products/index', { products })
// })

app.listen(8080, () => {
  console.log("Listening on Port: 8080");
})

