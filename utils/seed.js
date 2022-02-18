const fetch = require('isomorphic-unfetch');
const productsToSeed = require('./seed_data/products.json');

const createProduct = async (product) => {
  try {
    const res = await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
  } catch (error) {
    console.log(error);
  }
};

for (let i = 0; i < productsToSeed.length; i++) {
  createProduct(productsToSeed[i]);
}

// createProduct(productsToSeed[0]);
