export const BASE_API = "/v1/api";
export const API_PATH = {
  LOGIN: `${BASE_API}/login`,
  SIGNUP: `${BASE_API}/signup`,
  LOGOUT: `${BASE_API}/logout`,
  USER: {
      GET_ALL: `${BASE_API}/user`,
      VERIFY_EMAIL: `${BASE_API}/user/verify-email`,
  },
  INVITATION: {
    INDEX: `${BASE_API}/invite`,
  },
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
      GET_ALL: `${BASE_API}/project/users`,
    }
  },
};
