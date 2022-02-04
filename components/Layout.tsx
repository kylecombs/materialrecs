import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar'

const Layout: React.FC = ({ children }) => (
  <>
  <Head>
    <title>Material Records</title>
  </Head>
  <Navbar/>
  {children}
  </>
)

export default Layout;
