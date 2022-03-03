import { useState, useEffect } from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card } from 'semantic-ui-react';
import { NextPage } from 'next';
import styled from 'styled-components';
import Router, { useRouter } from 'next/router';
import { Select, Pagination } from 'semantic-ui-react';
import { usePrevious } from '../../../hooks/usePrevious';
import SearchBar from '../../../components/SearchBar';
import 'semantic-ui-css/semantic.min.css';

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
  const { query, push } = useRouter();
  const [productsPerPage, setProductsPerPage] = useState(query.limit || 18);
  const [startIdx, setStartIdx] = useState(0);
  const [displayProducts, setDisplayProducts] = useState(products);
  const [filters, setFilters] = useState({
    search: '',
  });

  const handlePerPageChange = (e, { value }) => {
    setProductsPerPage(value);
  };

  const handlePageChange = (e, { activePage }) => {
    push(`/products/page/${activePage - 1}?limit=${productsPerPage}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        `http://localhost:3000/api/products/page/${query.page}?limit=${productsPerPage}`
      );
      const { data } = await res.json();
      setDisplayProducts(data);
    };

    fetchProducts();
  }, [productsPerPage, query.page]);

  const totalPages = Math.ceil(242 / productsPerPage);

  const limitOptions = [
    { key: 9, value: 9, text: 9 },
    { key: 18, value: 18, text: 18 },
    { key: 27, value: 27, text: 27 },
    { key: 36, value: 36, text: 36 },
    { key: 48, value: 48, text: 48 },
  ];

  return (
    <div className='notes-container'>
      <h1>Vinyl</h1>
      {/* <Select
        placeholder='number per page'
        options={limitOptions}
        onChange={handlePerPageChange}
      /> */}
      <SearchBar filters={filters} setFilters={setFilters} />
      <Pagination
        activePage={parseInt(query.page) + 1}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <div className='grid wrapper'>
        {displayProducts ? (
          displayProducts.map((product) => {
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
          })
        ) : (
          <h1>LOADING...</h1>
        )}
      </div>
    </div>
  );
};

ProductList.getInitialProps = async ({ query }) => {
  const res = await fetch(
    `http://localhost:3000/api/products/page/${query.page}?limit=${query.limit}`
  );
  const { data } = await res.json();

  return { products: data };
};

export default ProductList;
