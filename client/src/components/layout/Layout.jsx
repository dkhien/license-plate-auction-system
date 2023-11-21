import React from 'react';
import Container from '@mui/material/Container';
import Header from './Header';

function Layout({ children }) {
  return (
    <>
      <Header />
      <Container maxWidth="xl">
        {children}
      </Container>
    </>
  );
}

export default Layout;
