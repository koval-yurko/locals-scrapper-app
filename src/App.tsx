import { HashRouter } from 'react-router';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from '@/contexts/AuthProvider';
import { SDKProvider } from '@/contexts/SDKProvider';
import Header from '@/components/Header';
import Pages from '@/pages/Pages';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <AuthProvider>
          <SDKProvider>
            <Header />
            <Pages />
          </SDKProvider>
        </AuthProvider>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
