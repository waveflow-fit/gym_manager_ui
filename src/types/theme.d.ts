import { gymThemePalette } from '@/theme';
import '@mui/material/styles';

interface IVariables {
  custom: {
    leftPanelWidth: string;
  };
}
declare module '@mui/material/styles' {
  interface Theme extends IVariables {
    palette: typeof gymThemePalette;
  }

  interface ThemeOptions extends IVariables {
    palette?: typeof gymBlackThemePalette;
  }
}
