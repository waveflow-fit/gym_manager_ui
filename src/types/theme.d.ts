import { gymThemePalette } from '@/theme';
import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    palette: typeof gymThemePalette;
  }

  interface ThemeOptions {
    palette?: typeof gymBlackThemePalette;
  }
}
