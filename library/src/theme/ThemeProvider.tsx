import { PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import GlobalStyle from './GlobalStyle';

function TableThemeProvider({ children }: Readonly<PropsWithChildren>) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}

export default TableThemeProvider;

TableThemeProvider.defaultProps = {
  text: 'default',
};
TableThemeProvider.defaultName = 'ZUITableThemeProvider';
