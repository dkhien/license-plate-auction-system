import React, { useState } from 'react';
import {
  Card, CardContent, Typography, TextField, Button, Box,
} from '@mui/material';

function AuctionPlaceBid({ placeBid }) {
  const [numOfSteps, setNumOfSteps] = useState(0);
  const currentPrice = 100; // Replace with actual current price
  const stepSize = 10; // Replace with actual step size

  const handleNumOfStepsChange = (event) => {
    const { value } = event.target;
    setNumOfSteps(value >= 0 ? value : 0);
  };

  const handleSubmit = () => {
    const resultPrice = stepSize * numOfSteps;
    placeBid(resultPrice);
    setNumOfSteps(0);
    // Place bid logic here
    console.log(`Placing bid for ${numOfSteps} steps with a result price of ${resultPrice}`);
  };

  return (
    <Card sx={{ textAlign: 'center' }}>
      <CardContent>
        <Box sx={{
          marginBottom: '2rem', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column',
        }}
        >
          <Typography variant="h6" sx={{ marginBottom: '0.5rem' }}>
            Giá hiện tại:
            {' '}
            {currentPrice}
          </Typography>
          <Typography variant="h6">
            Bước giá:
            {' '}
            {stepSize}
          </Typography>
        </Box>

        <TextField
          type="number"
          label="Số bước"
          inputProps={{ min: 0 }}
          value={numOfSteps}
          onChange={handleNumOfStepsChange}
          sx={{ marginBottom: 2 }}
        />
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          {currentPrice + stepSize * numOfSteps}
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={handleSubmit}
        >
          Đặt giá
        </Button>
      </CardContent>
    </Card>
  );
}

export default AuctionPlaceBid;
