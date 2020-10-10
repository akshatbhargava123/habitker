import { ThemeProvider } from '@chakra-ui/core';
import customTheme from '../theme';
import '../styles.css';

function HabitTrackerApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={customTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default HabitTrackerApp;