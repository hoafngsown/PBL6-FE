import { TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState } from "react";

interface IPropsTextField {
  formik: any;
  label: string;
  name: string;
  required?: boolean;
  isSubmitted: boolean;
  handlerOnChange?: () => void;
  isDisabled?: boolean;
  className: string;
}

const FormPasswordField = (props: IPropsTextField) => {
  const {
    formik,
    label,
    name,
    isSubmitted,
    required,
    isDisabled = false,
    className,
  } = props;

  const handleChangeWhiteSpace = (rawEmail: string) => {
    if (!rawEmail) {
      return "";
    }
    // remove white space/tab at the end of email
    // eslint-disable-next-line no-control-regex
    return rawEmail.trim().replace(/	/g, "");
  };

  const handleKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
    <div className={`${className} relative`}>
      <TextField
        autoComplete="new-password"
        size="small"
        fullWidth={true}
        label={label}
        required={required}
        name={name}
        type={showPassword ? "text" : "password"}
        value={formik.values[name]}
        onChange={(e) => {
          const textDield = handleChangeWhiteSpace(e.target.value);
          formik.setFieldValue(name, textDield);
          // handlerOnChange();
        }}
        onBlur={formik.handleBlur(name)}
        onKeyDown={handleKeyDown}
        error={
          (isSubmitted || formik.touched[name]) && Boolean(formik.errors[name])
        }
        helperText={
          (isSubmitted || formik.touched[name]) && formik.errors[name]
        }
        disabled={isDisabled}
      />
      <IconButton
        className="!absolute top-[7px] right-[5px]"
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
      >
        {showPassword ? (
          <Visibility fontSize="small" />
        ) : (
          <VisibilityOff fontSize="small" />
        )}
      </IconButton>
    </div>
  );
};

export default FormPasswordField;
