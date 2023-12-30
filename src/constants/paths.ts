export const AUTH_PATH = "auth";
export const LOGIN_PATH = "/login";
export const SIGNUP_PATH = "/signup";
export const ADMIN_PATH = "admin";
export const USER_PATH = "user";
export const DRUG_PATH = "drug";
export const DASHBOARD_PATH = "/";
export const MANAGE_LOCATION = "/locations";
export const REQUEST = "/request";
export const RESULT_MANAGEMENT = "/result-management";
export const NOTES = "/notes";
export const ADMIN = "/admin";
export const MANAGE = "/manage";
export const RECEPTIONIST = "/receptionist";
export const HOTEL_PATH = {
  LIST: "/hotel",
  CO_CO_HOTEL_TIARA: {
    STAFF: "/hotel/co-co-hotel-tiara/staff",
    OVERVIEW: "/hotel/co-co-hotel-tiara/task/overview",
    TASK_LIST: "/hotel/co-co-hotel-tiara/task/task-list",
    WORK_LIST: "/hotel/co-co-hotel-tiara/task/work-list",
    PROFILE: "/hotel/co-co-hotel-tiara/staff/:staffId",
  },
  HOTEL_MIKAZATO: {
    STAFF: "/hotel/hotel-mikazato/staff",
    OVERVIEW: "/hotel/hotel-mikazato/task/overview",
    TASK_LIST: "/hotel/hotel-mikazato/task/task-list",
    WORK_LIST: "/hotel/hotel-mikazato/task/work-list",
    PROFILE: "/hotel/hotel-mikazato/staff/:staffId",
  },
  HOTEL_BARON: {
    STAFF: "/hotel/hotel-baron/staff",
    OVERVIEW: "/hotel/hotel-baron/task/overview",
    TASK_LIST: "/hotel/hotel-baron/task/task-list",
    WORK_LIST: "/hotel/hotel-baron/task/work-list",
    PROFILE: "/hotel/hotel-baron/staff/:staffId",
  },
  CO_CO_HOTEL_OWL: {
    STAFF: "/hotel/co-co-hotel-owl/staff",
    OVERVIEW: "/hotel/co-co-hotel-owl/task/overview",
    TASK_LIST: "/hotel/co-co-hotel-owl/task/task-list",
    WORK_LIST: "/hotel/co-co-hotel-owl/task/work-list",
    PROFILE: "/hotel/co-co-hotel-owl/staff/:staffId",
  },
  STAFF: "hotel/:hotel/staff",
  STAFF_DETAIL: "/hotel/:hotel/staff/:staffId",
  OVERVIEW: "/hotel/:hotel/task/overview",
  TASK_LIST: "/hotel/:hotel/task/task-list",
  WORK_LIST: "/hotel/:hotel/task/work-list",
  ROOM: "/:hotel/room-list",
};

export const MY_WORKSPACE = {
  MAIN: "/my-workspace",
  PROJECT: "/my-workspace/project",
  PROJECT_DETAIL: "/my-workspace/project/:id",
}


export const MY_INVITIATION = {
  MAIN: "/my-invitiation"
}