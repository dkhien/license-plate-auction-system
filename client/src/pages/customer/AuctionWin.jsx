import React from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import LicensePlateImage from '../../components/LicensePlateImage';

function AuctionWin({ username }) {
  const plateNumber = '29A 12345';
  const { width, height } = useWindowSize();
  return (
    <>
      <Confetti width={width} height={height} />
      <Typography variant="h6">
        Chúc mừng quý khách
        {' '}
        {username}
        {' '}
        đã trúng đấu giá biến số!
      </Typography>
      <LicensePlateImage plateNumber={plateNumber} />
      <Link to="/">
        <Button
          variant="contained"
          color="primary"
          sx={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
            padding: '1rem',
          }}
        >
          Go to Home
        </Button>
      </Link>
    </>
  );
}

export default AuctionWin;
