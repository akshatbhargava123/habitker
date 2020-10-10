import '@/lib/init-firebase';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import customTheme from '../theme';
import '../styles.css';

function HabitTrackerApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default HabitTrackerApp;