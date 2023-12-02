import DefaultLayout from "@/layout/DefaultLayout";
import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RecoilRoot, useRecoilState } from "recoil";

import Error404 from "@/pages/errors/404";
import { LOGIN_PATH, currentUserState } from './constants';
import { LoginPage } from './pages/auth/login';
import Error403 from "./pages/errors/403";
import { theme } from "./theme";
import { getTokenAndUserId } from './utils';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  const { token, userId } = getTokenAndUserId();
  console.log({ token, userId })
  const hadToken = !!token;
  const [currentUser] = useRecoilState(currentUserState);

  // const { isFetching: isAdminFetching } = useQuery({
  //   refetchOnWindowFocus: false,
  //   queryKey: "GET_CURRENT_ADMIN",
  //   queryFn: () => {
  //     const decodedToken = decodeToken(token);
  //     return getApi(`${API_PATH.ADMIN}/${decodedToken?.user?.id}`, "");
  //   },
  //   onSuccess: (result) => {
  //     setCurrentUser(result.data as AdminInfo);
  //   },
  //   enabled: hadToken,
  //   staleTime: Infinity,
  // });

  // if (isAdminFetching) {
  //   return null;
  // }

  // if (!hadToken) {
  //   if (!window.location.pathname.startsWith(LOGIN_PATH)) {
  //     window.location.replace(LOGIN_PATH);
  //     return null;
  //   }
  // }

  return (
    <BrowserRouter>
      <Routes>
        {/* {renderAuthRoutes()} */}
        <Route path={LOGIN_PATH} element={<LoginPage />} />
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
