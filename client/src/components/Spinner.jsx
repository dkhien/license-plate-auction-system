import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function Spinner() {
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh',
    }}
    >
      <CircularProgress variant="indeterminate" disableShrink />
    </div>
  );
}

export default Spinner;
