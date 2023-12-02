import * as React from "react";
import { TextField, Checkbox, Autocomplete } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { ISelectOption } from "@/types";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface IPropsMultiSelect {
  formik: any;
  label: string;
  name: string;
  listOption: ISelectOption[];
  required?: boolean;
  isSubmitted: boolean;
  isOnlyNumber?: boolean;
  isDisabled?: boolean;
}

export default function FormMultiSelect(props: IPropsMultiSelect) {
  const { formik, name, label, required, isSubmitted, listOption } = props;

  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={listOption}
      disableCloseOnSelect
      onChange={(e, values: any) => {
        const listValue = values.map((element) => element.value);
        formik.setFieldValue(name, listValue);
      }}
      getOptionLabel={(option: ISelectOption) => option.label}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      renderOption={(props, option: ISelectOption, { selected }) => {
        return (
          <li {...props} className="flex justify-between">
            {option.label}
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          name={name}
          value={formik.values[name]}
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
