import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1E3A8A', // Biru Tua (Identitas Visual Akademik)
    },
    secondary: {
      main: '#F59E0B', // Kuning/Oranye (Aksen)
    },
    background: {
      default: '#F3F4F6',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", sans-serif',
    h4: {
      fontWeight: 700,
    },
    button: {
      textTransform: 'none', // Tombol tidak kapital semua
      fontWeight: 600,
    },
  },
});

export default theme;