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
          lineHeight: valueToRem(30),
        },
        lg: {
          fontSize: valueToRem(18),
          lineHeight: valueToRem(27.36),
        },
        md: {
          fontSize: valueToRem(16),
          lineHeight: valueToRem(25),
        },
        sm: {
          fontSize: valueToRem(14),
          lineHeight: valueToRem(19.6),
        },
        xs: {
          fontSize: valueToRem(12),
          lineHeight: valueToRem(16),
        },
      },
    },
  },
  spacing: {
    0: '0px',
    px: '1px',
    0.5: '2px',
    1: '4px',
    1.5: '6px',
    2: '8px',
    2.5: '10px',
    3: '12px',
    3.5: '14px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    9: '36px',
    10: '40px',
    12: '48px',
    14: '56px',
    16: '64px',
    18: '72px',
    20: '80px',
    24: '96px',
    28: '112px',
    32: '128px',
    36: '144px',
    40: '160px',
    44: '176px',
    48: '192px',
    52: '208px',
    56: '224px',
    60: '240px',
    64: '256px',
    72: '288px',
    80: '320px',
    96: '384px',
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
