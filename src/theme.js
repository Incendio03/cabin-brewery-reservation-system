import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8B4513', // Brown color representing wood/cabin
      light: '#A67C52',
      dark: '#5E2F0D',
      contrastText: '#FFF',
    },
    secondary: {
      main: '#D9A566', // Amber/gold color representing beer
      light: '#E6C18A',
      dark: '#B78445',
      contrastText: '#000',
    },
    background: {
      default: '#FAF6F1', // Light cream background
      paper: '#FFF',
    },
    text: {
      primary: '#2C1810', // Dark brown for primary text
      secondary: '#5E4534', // Medium brown for secondary text
    },
  },
  typography: {
    fontFamily: [
      'Montserrat',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontFamily: 'Playfair Display, serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: 'Playfair Display, serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: 'Playfair Display, serif',
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
        },
        containedPrimary: {
          boxShadow: '0 4px 6px rgba(139, 69, 19, 0.2)',
        },
        containedSecondary: {
          boxShadow: '0 4px 6px rgba(217, 165, 102, 0.2)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export default theme;
