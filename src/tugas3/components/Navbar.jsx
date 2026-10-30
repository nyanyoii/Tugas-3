import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TaskManager Mahasiswa
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">Dashboard</Button>
          <Button color="secondary" variant="contained" component={Link} to="/tambah" sx={{ ml: 2 }}>
            Tambah Tugas
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}