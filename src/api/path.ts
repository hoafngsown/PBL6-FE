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
    CREATE: `${BASE_API}/project`,
    GET_ALL: `${BASE_API}/project`,
    INVITATION: `${BASE_API}/project/invitation`,
    DETAIL: `${BASE_API}/project/:id`,
    USERS: `${BASE_API}/project/:id/users`,
    TASK: {
      CHANGE_INDEX: `${BASE_API}/project/task/changeindex`,
      ADD: `${BASE_API}/project/task/add`,
      DELETE: `${BASE_API}/project/task/delete/:taskId`,
    },
    MESSAGES: {
      GET_ALL: `${BASE_API}/project/:id/messages`,
    },
    COLUMN: {
      INDEX: `${BASE_API}/project/:projectId/columns`,
      DETAIL: `${BASE_API}/project/:projectId/columns/:columnId`,
    },
  },
};
