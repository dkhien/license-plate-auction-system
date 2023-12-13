import React from 'react';
import { Box, Typography } from '@mui/material';

function LicensePlateImage({ plateNumber }) {
  const [plateNumberFirstPart, plateNumberSecondPart] = plateNumber.split('-');
  return (
    <Box
      backgroundColor="white"
      color="black"
      padding="0.5rem"
      border="4px solid black"
      borderRadius=".375rem"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      width="100%"
      sx={
        {
          aspectRatio: '2/1 !important',
        }
      }
    >
      <Typography variant="h2" fontFamily="UKNumberPlate" lineHeight="1">{plateNumberFirstPart}</Typography>
      <Typography variant="h2" fontFamily="UKNumberPlate" lineHeight="1">{plateNumberSecondPart}</Typography>
    </Box>
  );
}

export default LicensePlateImage;
