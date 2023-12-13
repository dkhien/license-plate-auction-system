import React from 'react';
import {
  Card, CardContent, Typography, Box,
} from '@mui/material';
import LicensePlateImage from './LicensePlateImage';
import CountdownTimer from './CountdownTimer';

function AuctionInfoPanel({ auction, handleAuctionEnded }) {
  return (
    <Card sx={{
      padding: '1rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}
    >
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
          Thông tin chung
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
          Đấu giá viên:
          {' '}
          {auction.auctioneer.account.name}
        </Typography>
        <Typography variant="body1">
          Thời gian còn lại
          {' '}
        </Typography>
        <CountdownTimer
          startTime={auction.date}
          duration={process.env.REACT_APP_AUCTION_DURATION * 60 * 1000}
          sx={{ marginBottom: '1rem' }}
          handleEnded={handleAuctionEnded}
        />
        <Box sx={{
          marginTop: '1rem', display: 'flex', alignItems: 'center',
        }}
        >
          <Typography variant="body1" sx={{ marginRight: '2rem' }}>
            Tỉnh/thành phố:
            {' '}
            {auction.plate.city}
          </Typography>
          <Typography variant="body1">
            Loại xe:
            {' '}
            {auction.plate.typeOfVehicle}
          </Typography>
        </Box>
        <Box sx={{ width: '100%', marginTop: '2rem' }}>
          <LicensePlateImage plateNumber={auction.plate.plateNumber} />
        </Box>

      </CardContent>
    </Card>
  );
}

export default AuctionInfoPanel;
