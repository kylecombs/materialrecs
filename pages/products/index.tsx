import { useState } from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card } from 'semantic-ui-react';
import { NextPage } from 'next';
import styled from 'styled-components';

const GalleryImage = styled.img`
  max-width: 15rem;
`;

import React from 'react';

interface IProduct {
  _id: string;
  image: string;
  title: string;
  price: number;
  artist: string;
  quantity: number;
  tags?: string[];
  bandcampURL?: string;
  description?: string;
}

interface Props {
  products: Array<IProduct>;
}

const ProductList: NextPage<Props> = ({ products }) => {
  const [page, setPage] = useState(0);

  return (
    <div className='notes-container'>
      <h1>Vinyl</h1>
      <div className='grid wrapper'>
        {products.map((product) => {
          return (
            <div key={product._id}>
              <GalleryImage
                src={'https://' + product.image}
                alt={product.title + ' cover'}
              />
              <div>
                <Link href={`/${product._id}`} passHref>
                  <a>{product.artist + ' - ' + product.title}</a>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

ProductList.getInitialProps = async () => {
  const res = await fetch(`http://localhost:3000/api/products`);
  const { data } = await res.json();

  return { products: data };
};

export default ProductList;
