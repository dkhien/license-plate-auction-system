import React from 'react';
import { Card } from '@mui/material';

function HoverableCard({ children, ...props }) {
  return (
    <Card
      variant="outlined"
      sx={{
        '&:hover': {
          cursor: 'pointer',
          boxShadow: '0 4px 20px #1c7756',
          border: '1px solid #00cda8',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.2s ease-in-out',
          ...props.sx,
        },
      }}
      {...props}
    >
      {children}
    </Card>
  );
}

export default HoverableCard;
