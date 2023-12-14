export const BASE_API = "/v1/api";
export const API_PATH = {
  LOGIN: `${BASE_API}/login`,
  LOGOUT: `${BASE_API}/logout`,
  ERROR_LIST: `${BASE_API}/user/login dien`,
  ADMIN: `${BASE_API}/admin`,
  USER: `user`,
  LOCATION: `locations`,
  PROJECT: {
    CREATE: `${BASE_API}/project/add`,
    GET_ALL: `${BASE_API}/project/getall`,
    DETAIL: `${BASE_API}/project/getdetail`,
    TASK: {
      CHANGE_INDEX: `${BASE_API}/project/task/changeindex`,
      ADD: `${BASE_API}/project/task/add`,
      DELETE: `${BASE_API}/project/task/delete/:taskId`,
    },
    MESSAGES: {
      GET_ALL: `${BASE_API}/project/messages`,
    },
    COLUMN: {
      ADD: `${BASE_API}/project/column/add`,
    },
    USERS: {
      GET_ALL:  `${BASE_API}/project/users`,
    }
  }
};
