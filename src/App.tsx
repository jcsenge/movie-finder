import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FindMovies } from './pages/find-movies/find-movies';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline } from '@mui/material';
import { initReactI18next } from 'react-i18next';
import i18n from "i18next";
import translationEN from "./lang/en.json";

const resources = {
  en: {
    translation: translationEN,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources: resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#c0ffee",
    },
    secondary: {
      main: "#82b1ff"
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <FindMovies />
    </ThemeProvider>
  );
}

export default App;
