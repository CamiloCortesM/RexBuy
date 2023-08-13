import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#562a17',
    },
    secondary: {
      main: '#fcb891',
      // main: '#f6f1e9',
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
          boxShadow: '0px 4px 4px rgba(0,0,0,0.05)',
          borderRadius: '2px',
          border: '2px solid #f6f1e9',
          cursor: 'pointer',
          ':hover': {
            boxShadow: '0px 5px 5px rgba(0,0,0,0.1)',
          },
        },
      },
    },

    MuiCardActionArea: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgb(0,0,0,0.1)',
        },
      },
    },
  },
});
