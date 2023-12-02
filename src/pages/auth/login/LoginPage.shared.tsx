import { AUTH_PATH } from '@/constants';

export const LOGIN_PATH = 'login';

export const getLoginUrl = () => `/${AUTH_PATH}/${LOGIN_PATH}`;