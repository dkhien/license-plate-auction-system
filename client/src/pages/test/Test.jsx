import React from 'react';
import LicensePlateCard from '../../components/LicensePlateCard';

function Test() {
  const plate = {
    plateNumber: 'ABC 123',
    city: 'Bucharest',
    typeOfVehicle: 'car',
  };
  return (
    <LicensePlateCard plate={plate} />
  );
}

export default Test;
