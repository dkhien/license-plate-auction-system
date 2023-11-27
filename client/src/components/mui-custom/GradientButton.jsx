import React from 'react';
import { Button } from '@mui/material';

function GradientButton({ children, ...props }) {
  return (
    <Button
      sx={{
        background: 'linear-gradient(90.67deg,#01ab6f 0.13%,#00b49e 95.62%)',
        border: 0,
        borderRadius: 40,
        boxShadow: '0 2px 0 rgba(0, 0, 0, 0.02)',
        color: 'white',
        height: '2.5rem',
        padding: '2px 30px',
        ...props.sx,
      }}
      {...props}
    >
      {children}

    </Button>
  );
}

export default GradientButton;
