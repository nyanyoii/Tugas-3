import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function AddTask({ setTasks }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [matkul, setMatkul] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const newTask = {
      id: Date.now(), 
      title: title,
      matkul: matkul,
      desc: desc,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    navigate('/');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom color="primary">
          Tambah Tugas Baru
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Judul Tugas" variant="outlined" fullWidth required value={title} onChange={(e) => setTitle(e.target.value)} />
          <TextField label="Mata Kuliah" variant="outlined" fullWidth required value={matkul} onChange={(e) => setMatkul(e.target.value)} />
          <TextField label="Deskripsi" variant="outlined" multiline rows={4} fullWidth value={desc} onChange={(e) => setDesc(e.target.value)} />
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
            <Button variant="outlined" color="error" onClick={() => navigate('/')}>Batal</Button>
            <Button type="submit" variant="contained" color="primary">Simpan Tugas</Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}