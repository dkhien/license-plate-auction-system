import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Typography, Box, useTheme,
} from '@mui/material';

function NotFound() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: '6rem',
          fontWeight: 'bold',
          color: theme.palette.primary.main,
          marginBottom: theme.spacing(4),
        }}
      >
        404
      </Typography>
      <Typography
        variant="h2"
        sx={{
          fontSize: '2rem',
          color: theme.palette.text.secondary,
          marginBottom: theme.spacing(4),
        }}
      >
        Oops! Looks like someone got lost!
      </Typography>
      <Link to="/">
        <Button
          variant="contained"
          color="primary"
          sx={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
            padding: theme.spacing(2, 4),
          }}
        >
          Go to Home
        </Button>
      </Link>
    </Box>
  );
}

export default NotFound;
