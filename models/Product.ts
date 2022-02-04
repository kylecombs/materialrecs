const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  artist: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
