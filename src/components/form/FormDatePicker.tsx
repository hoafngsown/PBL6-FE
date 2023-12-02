import { TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import jaLocale from "date-fns/locale/ja";
import moment from "moment";

interface IFormDatePickerProps {
  formik: any;
  label: string;
  name: string;
  required?: boolean;
  isSubmitted: boolean;
  handlerOnChange?: () => void;
  disabledFuture?: boolean;
  isDisabled?: boolean;
  isDisabledTextField?: boolean;
  isDisabledPast?: boolean;
}

const FormDatePicker = (props: IFormDatePickerProps) => {
  const { formik, label, name, isSubmitted, required } = props;

  const handleKeyDown = (e) => {
    if (e.key === " " || props?.isDisabledTextField) {
      e.preventDefault();
    }
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={jaLocale}>
        <DatePicker
          disableFuture={props?.disabledFuture || false}
          disablePast={props?.isDisabledPast || false}
          label={label}
          onChange={(value) =>
            formik.setFieldValue(name, moment(value).format("YYYY-MM-DD"))
          }
          disabled={props?.isDisabled || false}
          value={formik.values[name]}
          renderInput={(params) => (
            <TextField
              variant="outlined"
              required={required}
              size="small"
              fullWidth={true}
              name={name}
              error={isSubmitted && Boolean(formik.errors[name])}
              helperText={isSubmitted && formik.errors[name]}
              onBlur={formik.handleBlur(name)}
              onKeyDown={handleKeyDown}
              {...params}
            />
          )}
        />
      </LocalizationProvider>
    </div>
  );
};

export default FormDatePicker;
