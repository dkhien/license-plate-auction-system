import React from 'react';
import {
  Button,
  CardActions,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import LicensePlateImage from './LicensePlateImage';
import HoverableCard from './mui-custom/HoverableCard';
import CountdownTimer from './CountdownTimer';

function LicensePlateCard({ plate, handleRegister }) {
  const {
    plateNumber, city, typeOfVehicle,
  } = plate;

  const startTime = plate.auction.date;

  const currentTime = new Date();
  const duration = new Date(startTime) - currentTime;

  return (
    <HoverableCard
      sx={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <LicensePlateImage plateNumber={plateNumber} />
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Typography variant="body1">{city}</Typography>
          <Typography variant="body1">{typeOfVehicle}</Typography>
        </Box>
        <Typography variant="body1" sx={{ marginTop: '0.5rem' }}>
          Thời gian chờ đấu giá
          {' '}
          <CountdownTimer startTime={currentTime.toISOString()} duration={duration} />
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="large" variant="contained" onClick={() => handleRegister(plate)}>
          Đăng ký
        </Button>
      </CardActions>
    </HoverableCard>
  );
}

export default LicensePlateCard;
