import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#5b8ef0',
    },
    secondary: {
      main: '#c084fc',
    },
    warning: {
      main: '#d4903a',
    },
    background: {
      default: '#090b12',
      paper: '#0f1220',
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'html, body, #root': {
          height: '100%',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            backgroundColor: '#0f1220',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '0.72rem',
            textTransform: 'uppercase',
            letterSpacing: 1,
          },
        },
      },
    },
  },
})
