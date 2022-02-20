import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        // light: will be calculated from palette.primary.main,
        main: '#3d1e44',
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        light: '#2299aa',
        main: '#ffdab9',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#121212',
      },
      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      contrastThreshold: 3,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2,
    },
      typography: {
        fontFamily: [
          'BlinkMacSystemFont',
          'sans-serif',
        ].join(','),
     },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 800,
        lg: 1100,
        xl: 1536,
      },
    },
  })
  