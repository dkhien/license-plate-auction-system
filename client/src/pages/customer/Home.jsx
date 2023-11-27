import React from 'react';
import {
  Typography, Box, Divider, Container,
} from '@mui/material';
import { Link } from 'react-router-dom';
import banner from '../../assets/images/banner.jpg';
import GradientButton from '../../components/mui-custom/GradientButton';
import Header from '../../components/layout/Header';
import newsImage from '../../assets/images/news-mock.png';
import PageTitle from '../../components/layout/PageTitle';
import Footer from '../../components/layout/Footer';

function Home() {
  return (
    <>
      <Header />
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '400px',
        }}
      >
        <img
          src={banner}
          alt="banner"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '25%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'left',
            color: 'white',
          }}
        >
          <Typography variant="h2" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>Đấu giá biển số</Typography>
          <Typography variant="h6" sx={{ fontWeight: '100', marginBottom: '2rem' }}>Chào mừng bạn đến với trang đấu giá biển số trực tuyến!</Typography>
          <Link to="/auction-list">
            <GradientButton>Đấu giá ngay</GradientButton>
          </Link>
        </Box>
      </Box>
      <Divider sx={{ marginTop: '2rem', marginBottom: '2rem' }} />
      <Container maxWidth="xl">
        <PageTitle>Tin tức</PageTitle>
        <a href="https://vpa.com.vn/news/7109679422988288" target="_blank" rel="noopener noreferrer">
          <img src={newsImage} alt="news" />
        </a>
      </Container>
      <Footer />
    </>
  );
}

export default Home;
