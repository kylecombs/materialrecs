import Link from 'next/link';
import React from 'react';

const Navbar: React.FC = () => (
  <nav className='navbar'>
    <Link href='/new'>
      <a className='create'>Create Note</a>
    </Link>
  </nav>
);

export default Navbar;
