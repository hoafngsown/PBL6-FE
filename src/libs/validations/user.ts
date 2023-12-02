import * as yup from "yup";

export const validationSchema = yup.object({
  firstName: yup.string().required("Please enter first name"),
  lastName: yup.string().required("Please enter last name"),
  phoneNumber: yup
    .string()
    .min(10, "Please enter at least 10 number")
    .required(),
});
