import { PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';

function TableThemeProvider({ children }: Readonly<PropsWithChildren>) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default TableThemeProvider;

TableThemeProvider.defaultProps = {
  text: 'default',
};
TableThemeProvider.defaultName = 'ZUITableThemeProvider';
