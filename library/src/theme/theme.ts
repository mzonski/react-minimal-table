import { DEFAULT_FONT_SIZE, themeColors } from './theme.const';
import { valueToRem } from './theme.utils';

export const theme = {
  colors: {
    ...themeColors,
  },
  components: {
    table: {},
    typography: {
      head: {
        h1: {
          fontSize: valueToRem(72),
          lineHeight: '140%',
        },
        h2: {
          fontSize: valueToRem(60),
          lineHeight: '140%',
        },
        h3: {
          fontSize: valueToRem(48),
          lineHeight: '140%',
        },
        h4: {
          fontSize: valueToRem(36),
          lineHeight: '140%',
        },
        h5: {
          fontSize: valueToRem(30),
          lineHeight: '132%',
        },
        h6: {
          fontSize: valueToRem(24),
          lineHeight: '130%',
        },
      },
      text: {
        xl: {
          fontSize: valueToRem(20),
          lineHeight: '150%',
        },
        lg: {
          fontSize: valueToRem(18),
          lineHeight: '150%',
        },
        md: {
          fontSize: valueToRem(16),
          lineHeight: '150%',
        },
        sm: {
          fontSize: valueToRem(14),
          lineHeight: '140%',
        },
        xs: {
          fontSize: valueToRem(12),
          lineHeight: valueToRem(16),
        },
      },
    },
  },
  spacing: {
    tiny: '2px',
    small: '4px',
    medium: '8px',
    large: '16px',
  },
  fonts: {
    defaultSize: `${DEFAULT_FONT_SIZE}px`,
    defaultFamily: `'Plus Jakarta Sans Variable', sans-serif;`,
    weights: {
      bold: 700,
      semibold: 600,
      medium: 500,
      normal: 400,
    },
  },
  borders: {
    size: {
      tiny: valueToRem(1),
      small: valueToRem(1.5),
      medium: valueToRem(2.25),
      large: valueToRem(3),
    },
    color: themeColors.black,
    type: 'solid',
    radius: valueToRem(4),
  },
} as const;
