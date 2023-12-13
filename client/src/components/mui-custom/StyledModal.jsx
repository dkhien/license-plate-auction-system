import React from 'react';
import { Box } from '@mui/material';

function StyledModalBox({ children }) {
  return (

    <Box sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
    }}
    >
      {children}
    </Box>
  );
}

export default StyledModalBox;
