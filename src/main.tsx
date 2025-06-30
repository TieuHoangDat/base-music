import "@fontsource/roboto";
import {createTheme, ThemeProvider} from "@mui/material";
import store from "@redux/store.ts";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import App from "./App.tsx";
import "./i18n";
import "./styles/main.scss";
// import {initializeFirebase} from "./utils/firebase.ts";

// initializeFirebase();

const theme = createTheme({
  components: {},
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
);
