import { onlyNumber } from "@/utils/common";
import { TextField } from "@mui/material";

interface IPropsTextField {
  formik: any;
  label: string;
  type: string;
  name: string;
  required?: boolean;
  isSubmitted: boolean;
  handlerOnChange?: () => void;
  isOnlyNumber?: boolean;
  isDisabled?: boolean;
  onFocusOut?: () => void;
  className?: string;
}

const FormTextField = (props: IPropsTextField) => {
  const {
    formik,
    label,
    name,
    // handlerOnChange,
    isSubmitted,
    type,
    required,
    isOnlyNumber = false,
    isDisabled = false,
    onFocusOut,
    className = "",
  } = props;

  // const handleChangeWhiteSpace = (rawEmail: string) => {
  //   if (!rawEmail) {
  //     return "";
  //   }
  //   // remove white space/tab at the end of email
  //   // eslint-disable-next-line no-control-regex
  //   return rawEmail.trim().replace(/	/g, "");
  // };

  // const handleKeyDown = (e) => {
  //   if (e.key === " ") {
  //     e.preventDefault();
  //   }
  // };

  const onChange = (e) => {
    if (isOnlyNumber)
      return formik.setFieldValue(
        name,
        onlyNumber(e.target.value, { allowZeroFirst: true })
      );
    formik.setFieldValue(name, e.target.value);
  };

  const handlerForcusOut = () => {
    formik.handleBlur(name);
    if (!onFocusOut) {
      return false;
    }
    onFocusOut();
  };

  return (
    <>
      <TextField
        className={className}
        size="small"
        fullWidth={true}
        label={label}
        required={required}
        name={name}
        type={type}
        value={formik.values[name]}
        onChange={(e) => onChange(e)}
        onBlur={handlerForcusOut}
        // onKeyDown={handleKeyDown}
        error={
          (isSubmitted || formik.touched[name]) && Boolean(formik.errors[name])
        }
        helperText={
          (isSubmitted || formik.touched[name]) && formik.errors[name]
        }
        disabled={isDisabled}
      />
    </>
  );
};

export default FormTextField;
