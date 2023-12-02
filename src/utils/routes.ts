export const obtainDynamicRoute = (dynamicRoute: string, params: object) => {
  let route = dynamicRoute;
  Object.keys(params).forEach((key) => {
    const regex = new RegExp(`:${key}`, 'gi');
    route = route.replace(regex, params[key]);
  });
  return route;
};

export const r = obtainDynamicRoute;