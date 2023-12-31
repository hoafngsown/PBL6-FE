import DefaultLayout from "@/layout/DefaultLayout";
import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RecoilRoot } from "recoil";

import Error404 from "@/pages/errors/404";
import { LOGIN_PATH, SIGNUP_PATH } from './constants';
import { LoginPage } from './pages/auth/login';
import { SignUpPage } from './pages/auth/signup/SignUpPage';
import Error403 from "./pages/errors/403";
import { theme } from "./theme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* {renderAuthRoutes()} */}
        <Route path={LOGIN_PATH} element={<LoginPage />} />
        <Route path={SIGNUP_PATH} element={<SignUpPage />} />
        <Route path="/403" element={<Error403 />} />
        <Route path="/404" element={<Error404 />} />
        <Route path="*" element={<DefaultLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <RecoilRoot>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

window.addEventListener("unload", function () { });

export default App;
