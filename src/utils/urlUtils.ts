export const getUrlQueryValue = (key: string) => {
  const url = new URL(window.location.href);
  return url.searchParams.get(key);
};

export const changeUrlQuery = (key: string, value: string) => {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.replaceState(null, null, url.toString());
};
