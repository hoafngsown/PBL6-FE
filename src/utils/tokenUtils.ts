export const saveTokenAndUserIdToCookies = (token: string, userId: string) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + 30);
  document.cookie = `xClientId=${userId};expires=${expires.toUTCString()}`;
  document.cookie = `token=${token};expires=${expires.toUTCString()};path=/;`;
};

export const saveTokenAndUserIdToSession = (token: string ,  userId: string) => {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("x-client-id", userId);
};

export const getTokenAndUserIdFromCookies = () => {
  const result = { token: '', userId: '' }; 
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith("token=")) {
      result.token = cookie.substring(6);
    }
    if (cookie.startsWith("xClientId=")) {
      result.userId = cookie.substring(10);
    }
  }
  return result;
};

export const getTokenAndUserIdFromSession = () => {
  return {token: sessionStorage.getItem("token") , userId: sessionStorage.getItem("x-client-id")}
};

export const getTokenAndUserId = () => {
  return getTokenAndUserIdFromCookies() || getTokenAndUserIdFromSession();
};

export const decodeToken = (token: string) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
};

export const removeToken = () => {
  document.cookie = "token=;x-client-id=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;";
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("userId");
};
