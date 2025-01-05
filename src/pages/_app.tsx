import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';
import { SDKProvider } from '@/contexts/SDKProvider';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '@/components/Header';
import Container from '@mui/material/Container';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <SDKProvider>
          <CssBaseline />
          <Header />
          <Container maxWidth='lg'>
            <Component {...pageProps} />
          </Container>
        </SDKProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
