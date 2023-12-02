import {
  MY_WORKSPACE,
  REQUEST
} from "@/constants";

export const MENU = [
  // {
  //   title: "Quản Lí Tài Nguyên",
  //   icon: <img src="/images/icons/menu/dashboard.svg" alt="dashboards" />,
  //   url: DASHBOARD_PATH,
  //   isActive: () => window.location.pathname === DASHBOARD_PATH,
  // },
  {
    title: "Yêu Cầu Xử Lí Công Việc",
    icon: (
      <img
        src='/images/icons/menu/dashboard.svg'
        alt='dashboards'
      />
    ),
    url: REQUEST,
    isActive: () => window.location.pathname === REQUEST,
  },
  {
    title: "My Workspace",
    icon: (
      <img
        src='/images/icons/menu/hotel.svg'
        alt='notes'
      />
    ),
    url: MY_WORKSPACE.MAIN,
    isActive: () => window.location.pathname.startsWith(MY_WORKSPACE.MAIN),
  },
];
