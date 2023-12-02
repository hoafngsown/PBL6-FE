import { Route } from "react-router-dom";
import { LoginPage } from "./login";
import { LOGIN_PATH } from "./login/LoginPage.shared";

// const AdminPage = React.lazy(() => import("../admin"));
// const ManagePage = React.lazy(() => import("../manage"));
// const ReceptionistPage = React.lazy(() => import("../receptionist"));

export const renderAuthRoutes = () => (
  <Route path={LOGIN_PATH} element={<LoginPage />} />
);

// export const renderAuthorRoutes = (role: number) => {
//   if (role === RoleAdmin.ADMIN) {
//     return (
//       <>
//         <Route path={ADMIN} element={<AdminPage />} />
//         <Route path={MANAGE} element={<ManagePage />} />
//         <Route path={RECEPTIONIST} element={<ReceptionistPage />} />
//       </>
//     );
//   }

//   if (role === RoleAdmin.MANAGE) {
//     return (
//       <>
//         <Route path={MANAGE} element={<ManagePage />} />
//         <Route path={RECEPTIONIST} element={<ReceptionistPage />} />
//       </>
//     );
//   }

//   return <Route path={RECEPTIONIST} element={<ReceptionistPage />} />;
// };
