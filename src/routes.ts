import { MY_WORKSPACE, REQUEST } from "@/constants/paths";
import React from "react";

const AdminPage = React.lazy(() => import("./pages/request"));
const WorkSpacePage = React.lazy(() => import("./pages/workspace"));
const ProjectPage = React.lazy(() => import("./pages/workspace/project"));

const routes = [
  {
    path: REQUEST,
    element: AdminPage,
  },
   {
    path: MY_WORKSPACE.MAIN,
    element: WorkSpacePage,
  },
   {
    path: MY_WORKSPACE.PROJECT_DETAIL,
    element: ProjectPage,
  },
];

export default routes;
