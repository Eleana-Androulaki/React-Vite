import {
  createTheme,
  type PaletteColor,
  type ThemeOptions
} from '@mui/material/styles';
import { themeConfig } from './theme.js';

const { borderRadius, breakpoints, colors, spacing, typography } = themeConfig;

declare module '@mui/material/styles' {
  interface Palette {
    gray?: PaletteColor;
  }
  interface PaletteOptions {
    gray?: {
      main: string;
      light: string;
      dark: string;
    };
  }
}

const tailwindSpacingValues = Object.values(spacing);

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary.DEFAULT,
      light: colors.primary.light,
      dark: colors.primary.dark,
      contrastText: colors.primary.contrastText
    },
    secondary: {
      main: colors.secondary.DEFAULT,
      light: colors.secondary.light,
      dark: colors.secondary.dark,
      contrastText: colors.secondary.contrastText
    },
    error: { main: colors.error },
    warning: { main: colors.warning },
    info: { main: colors.info },
    success: { main: colors.success },
    gray: {
      main: colors.gray.DEFAULT,
      light: colors.gray.light,
      dark: colors.gray.dark
    }
  },
  typography: {
    fontFamily: typography.fontFamily,
    h1: {
      fontSize: typography.sizes.h1,
      fontWeight: typography.fontWeight.bold
    },
    h2: {
      fontSize: typography.sizes.h2,
      fontWeight: typography.fontWeight.bold
    },
    h3: {
      fontSize: typography.sizes.h3,
      fontWeight: typography.fontWeight.normal
    },
    body1: {
      fontSize: typography.sizes.body,
      fontWeight: typography.fontWeight.normal
    },
    button: {
      textTransform: 'none',
      fontWeight: typography.fontWeight.bold
    }
  },
  spacing: (factor: number) => {
    return factor >= 0 && factor < tailwindSpacingValues.length
      ? tailwindSpacingValues[factor]
      : factor * 8;
  },
  shape: {
    borderRadius: parseInt(borderRadius.md)
  },
  breakpoints: {
    values: {
      xs: parseInt(breakpoints.xs),
      sm: parseInt(breakpoints.sm),
      md: parseInt(breakpoints.md),
      lg: parseInt(breakpoints.lg),
      xl: parseInt(breakpoints.xl),
      '2xl': parseInt(breakpoints['2xl'])
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: '600',
          borderRadius: borderRadius.md,
          padding: '10px 16px',
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.md,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: colors.gray.light
            },
            '&:hover fieldset': {
              borderColor: colors.primary.DEFAULT
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.primary.dark
            }
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.lg,
          padding: spacing.md,
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: colors.gray.dark,
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.05)'
        }
      }
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: 'collapse'
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: spacing.md,
          borderBottom: `1px solid ${colors.gray.light}`
        },
        head: {
          fontWeight: '700',
          backgroundColor: colors.gray.light
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: colors.gray.dark,
          color: '#ffffff',
          fontSize: typography.sizes.small,
          padding: spacing.sm,
          borderRadius: borderRadius.md
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.md,
          fontWeight: '600',
          padding: '4px 8px'
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: borderRadius.lg,
          padding: spacing.lg,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: borderRadius.lg,
          padding: spacing.lg,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
        }
      }
    }
  }
} as ThemeOptions);

export default theme;
