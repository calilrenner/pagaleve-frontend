import React from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import themes from '../styles/themes';

export default function TopBar() {
  return (
    <Box sx={{
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
    }}
    >
      <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
      <TextField id="filled-basic" label="Search" variant="standard" />
    </Box>
  );
}
