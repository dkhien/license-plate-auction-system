import React from 'react';
import {
  Button,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import LicensePlateImage from './LicensePlateImage';
import HoverableCard from './mui-custom/HoverableCard';

function LicensePlateCard({ plate }) {
  const { plateNumber, city, typeOfVehicle } = plate;
  return (
    <HoverableCard display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <LicensePlateImage plateNumber={plateNumber} />
      <CardContent>
        <Typography variant="body2">
          {city}
        </Typography>
        <Typography variant="body2">
          {typeOfVehicle}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </HoverableCard>
  );
}

export default LicensePlateCard;
