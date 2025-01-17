'use client';

import { createTheme } from '@mui/material/styles';

export const gymThemePalette = {
  primary: {
    main: '#1F1F1F', // Deep black-gray for primary elements
    light: '#333333', // Lighter black-gray for hover and focus
    dark: '#000000', // Pure black for high contrast
    contrastText: '#FFFFFF', // White text for readability
  },
  secondary: {
    main: '#00BFA6', // Teal for energetic accents
    light: '#5DF2D6', // Light teal for softer highlights
    dark: '#00867D', // Dark teal for buttons and focus
    contrastText: '#000000', // Black text for secondary elements
  },
  background: {
    default: '#121212', // Dark gray background
    paper: '#1C1C1C', // Slightly lighter gray for cards and containers
  },
  text: {
    primary: '#E0E0E0', // Light gray text for high readability
    secondary: '#B3B3B3', // Medium gray text for subtle emphasis
    disabled: '#8C8C8C', // Muted gray for disabled elements
  },
  action: {
    active: '#5DF2D6', // Active teal for icons and active states
    hover: '#00BFA6', // Teal hover for interactivity
    selected: '#333333', // Subtle dark gray for selected items
  },
  error: {
    main: '#FF5252', // Bright red for errors
  },
  success: {
    main: '#4CAF50', // Calm green for success
  },
  custom: { name: 'aniket' },
};

// Create a theme function for the dark gym theme
const theme = createTheme({
  cssVariables: true,
  palette: gymThemePalette,
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 16,
    h1: {
      fontSize: '2.75rem',
      fontWeight: 700,
      color: gymThemePalette.text.primary,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: gymThemePalette.text.primary,
    },
    h3: {
      fontSize: '2.25rem',
      fontWeight: 500,
      color: gymThemePalette.text.primary,
    },
    h4: { fontSize: '2rem', color: gymThemePalette.text.primary },
    h5: { fontSize: '1.75rem', color: gymThemePalette.text.primary },
    h6: { fontSize: '1.5rem', color: gymThemePalette.text.primary },
    body1: { fontSize: '1.25rem', color: gymThemePalette.text.primary },
    body2: { fontSize: '1rem', color: gymThemePalette.text.primary },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Keep button text case as-is
        },
        containedPrimary: {
          backgroundColor: '#00BFA6', // Teal button for primary actions
          color: '#000000', // Black text
          '&:hover': {
            backgroundColor: '#00867D', // Darker teal on hover
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#1C1C1C', // Dark gray paper background
          color: '#E0E0E0', // Light gray text
          padding: '1rem', // Consistent spacing
          borderRadius: 8, // Rounded edges
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#000000', // Solid black AppBar
          color: '#FFFFFF', // White text
        },
      },
    },
  },
});

export default theme;
