// // import { useState } from 'react'
// // import heroImg from './assets/hero.png'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from './assets/vite.svg'
// // import './App.css'

// // function App() {
// //   const [count, setCount] = useState(0)

// //   return (
// //     <>
// //       <section id="center">
// //         <div className="hero">
// //           <img src={heroImg} className="base" width="170" height="179" alt="" />
// //           <img src={reactLogo} className="framework" alt="React logo" />
// //           <img src={viteLogo} className="vite" alt="Vite logo" />
// //         </div>
// //         <div>
// //           <h1>Get started</h1>
// //           <p>
// //             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
// //           </p>
// //         </div>
// //         <button
// //           type="button"
// //           className="counter"
// //           onClick={() => setCount((count) => count + 1)}
// //         >
// //           Count is {count}
// //         </button>
// //       </section>

// //       <div className="ticks"></div>

// //       <section id="next-steps">
// //         <div id="docs">
// //           <svg className="icon" role="presentation" aria-hidden="true">
// //             <use href="/icons.svg#documentation-icon"></use>
// //           </svg>
// //           <h2>Documentation</h2>
// //           <p>Your questions, answered</p>
// //           <ul>
// //             <li>
// //               <a href="https://vite.dev/" target="_blank">
// //                 <img className="logo" src={viteLogo} alt="" />
// //                 Explore Vite
// //               </a>
// //             </li>
// //             <li>
// //               <a href="https://react.dev/" target="_blank">
// //                 <img className="button-icon" src={reactLogo} alt="" />
// //                 Learn more
// //               </a>
// //             </li>
// //           </ul>
// //         </div>
// //         <div id="social">
// //           <svg className="icon" role="presentation" aria-hidden="true">
// //             <use href="/icons.svg#social-icon"></use>
// //           </svg>
// //           <h2>Connect with us</h2>
// //           <p>Join the Vite community</p>
// //           <ul>
// //             <li>
// //               <a href="https://github.com/vitejs/vite" target="_blank">
// //                 <svg
// //                   className="button-icon"
// //                   role="presentation"
// //                   aria-hidden="true"
// //                 >
// //                   <use href="/icons.svg#github-icon"></use>
// //                 </svg>
// //                 GitHub
// //               </a>
// //             </li>
// //             <li>
// //               <a href="https://chat.vite.dev/" target="_blank">
// //                 <svg
// //                   className="button-icon"
// //                   role="presentation"
// //                   aria-hidden="true"
// //                 >
// //                   <use href="/icons.svg#discord-icon"></use>
// //                 </svg>
// //                 Discord
// //               </a>
// //             </li>
// //             <li>
// //               <a href="https://x.com/vite_js" target="_blank">
// //                 <svg
// //                   className="button-icon"
// //                   role="presentation"
// //                   aria-hidden="true"
// //                 >
// //                   <use href="/icons.svg#x-icon"></use>
// //                 </svg>
// //                 X.com
// //               </a>
// //             </li>
// //             <li>
// //               <a href="https://bsky.app/profile/vite.dev" target="_blank">
// //                 <svg
// //                   className="button-icon"
// //                   role="presentation"
// //                   aria-hidden="true"
// //                 >
// //                   <use href="/icons.svg#bluesky-icon"></use>
// //                 </svg>
// //                 Bluesky
// //               </a>
// //             </li>
// //           </ul>
// //         </div>
// //       </section>

// //       <div className="ticks"></div>
// //       <section id="spacer"></section>
// //     </>
// //   )
// // }

// // export default App


// // // import Dashboard from "./KosPaket/pages/Dashboard";

// // // function App() {
// // //   return <Dashboard />;
// // // }

// // // export default App;




// // import { useEffect, useState } from "react";

// // import Login from "./KosPaket/pages/Login";
// // import AdminDashboard from "./KosPaket/pages/AdminDashboard";
// // import UserDashboard from "./KosPaket/pages/UserDashboard";

// // import {
// //   loadPackages,
// //   savePackages,
// //   loadSession,
// //   saveSession,
// //   clearSession,
// // } from "./KosPaket/utils/storage";

// // function App() {
// //   const [packages, setPackages] = useState(loadPackages);
// //   const [user, setUser] = useState(loadSession);

// //   useEffect(() => {
// //     savePackages(packages);
// //   }, [packages]);

// //   function handleLogin(account) {
// //     saveSession(account);
// //     setUser(account);
// //   }

// //   function handleLogout() {
// //     clearSession();
// //     setUser(null);
// //   }

// //   function handleAddPackage(newPackage) {
// //     setPackages((previous) => [newPackage, ...previous]);
// //   }

// //   function handleStatusChange(id, newStatus) {
// //     setPackages((previous) =>
// //       previous.map((item) => {
// //         if (item.id !== id || item.status === newStatus) {
// //           return item;
// //         }

// //         return {
// //           ...item,
// //           status: newStatus,
// //           history: [...(item.history || [item.status]), newStatus],
// //         };
// //       })
// //     );
// //   }

// //   if (!user) {
// //     return <Login onLogin={handleLogin} />;
// //   }

// //   if (user.role === "admin") {
// //     return (
// //       <AdminDashboard
// //         user={user}
// //         packages={packages}
// //         onAdd={handleAddPackage}
// //         onStatusChange={handleStatusChange}
// //         onLogout={handleLogout}
// //       />
// //     );
// //   }

// //   return (
// //     <UserDashboard
// //       user={user}
// //       packages={packages}
// //       onLogout={handleLogout}
// //     />
// //   );
// // }

// // export default App;





// import { useEffect, useState } from "react";
// import Login from "./KosPaket/pages/Login.jsx";
// import AdminDashboard from "./KosPaket/pages/AdminDashboard.jsx";
// import UserDashboard from "./KosPaket/pages/UserDashboard.jsx";

// import {
//   loadPackages,
//   savePackages,
//   loadSession,
//   saveSession,
//   clearSession,
// } from "./KosPaket/utils/storage.js";

// export default function App() {
//   const [packages, setPackages] = useState(loadPackages);
//   const [user, setUser] = useState(loadSession);

//   useEffect(() => {
//     savePackages(packages);
//   }, [packages]);

//   function handleLogin(account) {
//     saveSession(account);
//     setUser(account);
//   }

//   function handleLogout() {
//     clearSession();
//     setUser(null);
//   }

//   function handleAddPackage(newPackage) {
//     setPackages((current) => [newPackage, ...current]);
//   }

//   function handleStatusChange(id, newStatus) {
//     setPackages((current) =>
//       current.map((item) => {
//         if (item.id !== id || item.status === newStatus) {
//           return item;
//         }

//         return {
//           ...item,
//           status: newStatus,
//           history: [...(item.history || [item.status]), newStatus],
//         };
//       })
//     );
//   }

//   if (!user) {
//     return <Login onLogin={handleLogin} />;
//   }

//   if (user.role === "admin") {
//     return (
//       <AdminDashboard
//         user={user}
//         packages={packages}
//         onAdd={handleAddPackage}
//         onStatusChange={handleStatusChange}
//         onLogout={handleLogout}
//       />
//     );
//   }
//   return (
//     <UserDashboard
//       user={user}
//       packages={packages}
//       onLogout={handleLogout}


import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, Button, TextField, Box, Paper, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

// 1. KUSTOMISASI TEMA PINK PASTEL
const theme = createTheme({
  palette: {
    primary: { main: '#F48FB1' }, // Warna Pink Pastel
    secondary: { main: '#FFF59D' }, // Warna Kuning Pastel untuk aksen
    background: { default: '#FCE4EC' }, // Background Pink Sangat Muda
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", sans-serif',
    button: { textTransform: 'none', fontWeight: 'bold' }, // Teks tombol tidak kapital semua
  },
  components: {
    // Membuat sudut Card dan Paper lebih membulat (aesthetic)
    MuiCard: { styleOverrides: { root: { borderRadius: 16 } } },
    MuiPaper: { styleOverrides: { root: { borderRadius: 16 } } },
    MuiButton: { styleOverrides: { root: { borderRadius: 20 } } }, // Tombol jadi kapsul
  }
});

function App() {
  const [halaman, setHalaman] = useState('dashboard');
  
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Tugas Mandiri 1', matkul: 'Pemrograman Web', desc: 'Implementasi MUI' },
    { id: 2, title: 'Tugas Mandiri 2', matkul: 'Pemrograman Web', desc: 'Kustomisasi Tema' },
  ]);

  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [form, setForm] = useState({ title: '', matkul: '', desc: '' });

  const handleSimpan = (e) => {
    e.preventDefault();
    const newTask = { id: Date.now(), ...form };
    setTasks([...tasks, newTask]);
    setForm({ title: '', matkul: '', desc: '' }); 
    setHalaman('dashboard'); 
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* NAVBAR */}
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            TaskManager Mahasiswa
          </Typography>
          <Button color="inherit" onClick={() => setHalaman('dashboard')}>Dashboard</Button>
          {/* Tombol Tambah pakai warna secondary (kuning pastel) dengan teks hitam */}
          <Button 
            variant="contained" 
            color="secondary" 
            sx={{ ml: 2, color: '#333' }} 
            onClick={() => setHalaman('tambah')}
          >
            Tambah Tugas
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        
        {/* HALAMAN DASHBOARD */}
        {halaman === 'dashboard' && (
          <>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#D81B60', mb: 3 }}>
              Daftar Tugas Anda
            </Typography>
            <Grid container spacing={3}>
              {tasks.map((task) => (
                <Grid item xs={12} sm={6} md={4} key={task.id}>
                  {/* Card dibuat sedikit transparan/putih dengan shadow halus */}
                  <Card sx={{ boxShadow: '0px 4px 20px rgba(244, 143, 177, 0.2)', bgcolor: '#FFFFFF' }}>
                    <CardContent>
                      <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} color="primary" gutterBottom>
                        {task.matkul}
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        {task.title}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1, color: '#666' }}>
                        {task.desc}
                      </Typography>
                      <Button 
                        size="small" sx={{ mt: 3 }} variant="outlined" color="primary"
                        onClick={() => { setSelectedTask(task); setOpen(true); }}
                      >
                        Lihat Detail
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {/* HALAMAN TAMBAH TUGAS */}
        {halaman === 'tambah' && (
          <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', bgcolor: '#FFFFFF' }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#D81B60' }}>
              Tambah Tugas Baru
            </Typography>
            <form onSubmit={handleSimpan} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
              <TextField label="Judul Tugas" fullWidth required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <TextField label="Mata Kuliah" fullWidth required value={form.matkul} onChange={(e) => setForm({ ...form, matkul: e.target.value })} />
              <TextField label="Deskripsi" multiline rows={3} fullWidth value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} />
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                <Button variant="outlined" sx={{ color: '#D81B60', borderColor: '#D81B60' }} onClick={() => setHalaman('dashboard')}>Batal</Button>
                <Button type="submit" variant="contained" color="primary">Simpan Tugas</Button>
              </Box>
            </form>
          </Paper>
        )}

      </Container>

      {/* POP-UP DETAIL */}
      <Dialog open={open} onClose={() => setOpen(false)} PaperProps={{ style: { borderRadius: 20 } }}>
        <DialogTitle sx={{ fontWeight: 'bold', color: '#D81B60' }}>Detail Tugas</DialogTitle>
        <DialogContent dividers>
          <Typography sx={{ mb: 1 }}><strong>Judul:</strong> {selectedTask?.title}</Typography>
          <Typography sx={{ mb: 1 }}><strong>Matkul:</strong> {selectedTask?.matkul}</Typography>
          <Typography><strong>Deskripsi:</strong> <br/> {selectedTask?.desc}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary" variant="contained">Tutup</Button>
        </DialogActions>
      </Dialog>

    </ThemeProvider>
  );
}

export default App;