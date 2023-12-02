import * as React from "react";
import { TextField, Autocomplete } from "@mui/material";
import { ISelectOption } from "@/types";

interface IPropsMultiSelect {
  formik: any;
  label: string;
  name: string;
  listOption: Array<any>;
  valueOption: string;
  textOption: string;
  required?: boolean;
  isSubmitted: boolean;
  isOnlyNumber?: boolean;
  isDisabled?: boolean;
  height?: number;
}

export default function FormSelect(props: IPropsMultiSelect) {
  const {
    formik,
    name,
    label,
    required,
    isSubmitted,
    listOption,
    valueOption,
    textOption,
    height,
    isDisabled,
  } = props;

  return (
    <Autocomplete
      id="combo-box"
      className="custom-option"
      sx={{
        ".MuiInputBase-root": {
          height: height ? `${height}px` : "auto",
          padding: "0 8px",
        },
      }}
      disabled={isDisabled}
      options={listOption}
      disablePortal
      freeSolo={isDisabled}
      onChange={(e, values: any) => {
        formik.setFieldValue(name, values ? values[valueOption] : "");
      }}
      getOptionLabel={(option: ISelectOption) => option[textOption]}
      isOptionEqualToValue={(option, value) =>
        option[textOption] === value[textOption]
      }
      defaultValue={formik.values[name] !== null ? formik.values[name] : null}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          name={name}
          value={formik.values[name] || null}
          onBlur={formik.handleBlur(name)}
          error={
            (isSubmitted || formik.touched[name]) &&
            Boolean(formik.errors[name])
          }
          helperText={
            (isSubmitted || formik.touched[name]) && formik.errors[name]
          }
          InputLabelProps={{ required: required }}
        />
      )}
    />
  );
}
