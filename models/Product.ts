const { Schema, model, models } = require('mongoose');

interface Product {
  image: string;
  title: string;
  price: number;
  artist: string;
  quantity: number;
  tags?: string[];
  bandcampURL?: string;
  description?: string;
}

const productSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
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
  tags: {
    type: Array,
    required: false,
  },
  bandcampURL: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  }
});

// const Product = mongoose.model('Product', productSchema);

module.exports = models.Product || model('Product', productSchema);
