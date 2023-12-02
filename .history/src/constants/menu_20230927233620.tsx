import {
  DASHBOARD_PATH,
  RESULT_MANAGEMENT,
  REQUEST,
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
    title: "Quản Lí Kết Quả",
    icon: (
      <img
        src='/images/icons/menu/hotel.svg'
        alt='dashboards'
      />
    ),
    url: RESULT_MANAGEMENT,
    isActive: () =>
      window.location.pathname === RESULT_MANAGEMENT,
  },
];
