import { MESSAGES } from '@/constants/messages';
import * as yup from "yup";

export const signInSchema = yup.object({
  email: yup.string().required(MESSAGES.LOGIN.EMAIL_001).email(MESSAGES.LOGIN.EMAIL_002),
  password: yup
    .string()
    .min(4, MESSAGES.LOGIN.PW_002)
    .max(16, MESSAGES.LOGIN.PW_002)
    .required(MESSAGES.LOGIN.PW_001),
});

export const signUpSchema = yup.object({
  email: yup.string().required(MESSAGES.LOGIN.EMAIL_001).email(MESSAGES.LOGIN.EMAIL_002),
  password: yup
    .string()
    .min(4, MESSAGES.LOGIN.PW_002)
    .max(16, MESSAGES.LOGIN.PW_002)
    .required(MESSAGES.LOGIN.PW_001),
  userName: yup.string().required(MESSAGES.LOGIN.USN_001)
});

export const addProjectSchema = yup.object({
  title: yup.string().required(MESSAGES.PROJECT.CREATE.PRJ_001),
});


export const addTaskSchema = yup.object({
  title: yup.string().required(MESSAGES.PROJECT.TASK.T001),
  description: yup.string().required(MESSAGES.PROJECT.TASK.T002),
  deadline_date: yup.date().required(MESSAGES.PROJECT.TASK.T003).typeError(MESSAGES.PROJECT.TASK.T003),
});