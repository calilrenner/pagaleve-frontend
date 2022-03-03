import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export default function Loading() {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <CircularProgress />
      <Typography
        sx={{ animation: 'blink-animation 1s steps(5, start) infinite' }}
      >
        Carregando...
      </Typography>
    </Box>
  );
}
