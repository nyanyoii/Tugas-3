import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

export default function Dashboard({ tasks }) {
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleClickOpen = (task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Daftar Tugas Anda
      </Typography>
      
      <Grid container spacing={3}>
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <Card sx={{ minWidth: 275, boxShadow: 3 }}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Mata Kuliah: {task.matkul}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {task.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {task.desc}
                  </Typography>
                  <Button size="small" sx={{ mt: 2 }} variant="outlined" color="primary" onClick={() => handleClickOpen(task)}>
                    Lihat Detail
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography sx={{ ml: 3 }}>Belum ada tugas.</Typography>
          </Grid>
        )}
      </Grid>

      {/* Pop-up Detail Tugas */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Detail: {selectedTask?.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            <strong>Mata Kuliah:</strong> {selectedTask?.matkul} <br/><br/>
            <strong>Deskripsi:</strong> <br/> {selectedTask?.desc}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Tutup</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}