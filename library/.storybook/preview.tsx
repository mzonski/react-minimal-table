import type { Preview, ReactRenderer } from "@storybook/react";
import type { DecoratorFunction } from "@storybook/types";
import { themes } from '@storybook/theming';

import 'modern-normalize/modern-normalize.css';
import TableThemeProvider from '../src/theme/ThemeProvider';

export const withTableTheme: DecoratorFunction<ReactRenderer> = (Story) => {
  return <TableThemeProvider><Story /></TableThemeProvider>
}

const preview: Preview = {
  parameters: {
    actions: {argTypesRegex: "^on[A-Z].*"},
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    darkMode: {
      dark: { ...themes.dark, appBg: 'black' },
      light: { ...themes.normal, appBg: 'lightgrey' }
    },
    backgrounds: {
      default: 'zui-light',
      values: [
        {
          name: 'zui-light',
          value: '#FAF4F0',
        },
        {
          name: 'zui-dark',
          value: '#161616',
        },
      ],
    },
  },
  decorators: [withTableTheme],
};

export default preview;
