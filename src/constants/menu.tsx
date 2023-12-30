import {
  MY_INVITIATION,
  MY_WORKSPACE,
  REQUEST
} from "@/constants";

export const MENU = [
  {
    title: "Correcting spelling mistakes",
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
  {
    title: "Invitiation",
    icon: (
      <img
        src='/images/icons/menu/hotel.svg'
        alt='notes'
      />
    ),
    url: MY_INVITIATION.MAIN,
    isActive: () => window.location.pathname.startsWith(MY_INVITIATION.MAIN),
  },
];
