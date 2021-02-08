const mongoose = require('mongoose');
const Product = require('./models/product.js');

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Mongo Connection Opened!");
  })
  .catch(err => {
    console.log("Mongo Connection Error Occurred!")
    console.log(err)
  });

const seedProducts = [
  {
    name: 'Fairy Eggplant',
    price: 1.00,
    category: 'vegetable'
  },
  {
    name: 'Organic Goddess Melon',
    price: 4.99,
    category: 'fruit'
  },
  {
    name: 'Organic Mini Seedless Watermelon',
    price: 3.99,
    category: 'fruit'
  },
  {
    name: 'Celery',
    price: 1.50,
    category: 'vegetable'
  },
  {
    name: 'Chocolate Whole Milk',
    price: 2.69,
    category: 'dairy'
  }
]

Product.insertMany(seedProducts)
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })

// const p = new Product({
//   name: 'Ruby Grapefruit',
//   price: 1.99,
//   category: 'fruit'
// })
// p.save()
//   .then(p => {
//     console.log(p)
//   })
//   .catch(err => {
//     console.log(err)
//   })