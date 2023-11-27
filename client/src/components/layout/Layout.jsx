import React from 'react';
import Container from '@mui/material/Container';
import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <>
      <Header />
      <Container maxWidth="xl">
        {children}
        <Footer />
      </Container>
    </>
  );
}

export default Layout;
