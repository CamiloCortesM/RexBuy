import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#562a17',
    },
    secondary: {
      main: '#fcb891',
    },
    info: {
      main: '#fff',
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        position: 'fixed',
      },
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          height: 80,
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: 30,
          fontWeight: 600,
        },
        h2: {
          fontSize: 20,
          fontWeight: 400,
        },
        subtitle1: {
          fontSize: 18,
          fontWeight: 600,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        size: 'large',
        disableElevation: true,
        color: 'info',
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          borderRadius: 10,
          ':hover': {
            backgroundColor: 'rgba(0,0,0,0.05)',
            transition: 'all 0.3s ease-in-out',
          },
        },
      },
    },

    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: '0px',
          padding: '1px',
          border: '2px solid #eaeaea',
          cursor: 'pointer',
          transition: 'transform 0.2s, box-shadow 0.2s', // Agregar transiciones suaves
          position: 'relative', // Añadir posición relativa
          zIndex: 1, // Establecer z-index para que esté por encima del contenido
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
            zIndex: 2, // Aumentar el z-index en el estado hover
          },
        },
      },
    },
  },
});
