import IconCalendar from "@/assets/images/ic-calendar.svg";
import { IDateRange } from "@/types";
import { formatDayMonth } from "@/utils/dateUtils";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React from "react";

interface MyDateRangePickerProps {
  initialDate: IDateRange;
  minDate?: number;
  maxDate?: number;
  onDateChange: (date: IDateRange) => any;
  numberOfCalendar?: 1 | 2 | 3;
  isDisabledFuture?: boolean;
  dateRangeClassName?: string;
}

function MyDateRangePicker(props: MyDateRangePickerProps) {
  const [value, setValue] = React.useState<IDateRange>(
    props.initialDate || [new Date(), new Date()]
  );

  const handleChangeValue = (valueRange: IDateRange) => {
    setValue(valueRange);
    props.onDateChange(valueRange);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        minDate={props.minDate}
        calendars={props.numberOfCalendar || 1}
        value={value}
        onChange={(value) => handleChangeValue(value as any)}
        // disableFuture={props.isDisabledFuture}
        disableFuture={true}
        className={props.dateRangeClassName}
        renderInput={(startProps, endProps) => (
          <div className="flex items-center py-2 px-4 bg-white rounded-[5px] border border-solid border-[#EDEDED]">
            <img
              src={IconCalendar}
              alt="ic-calendar"
              className="inline-block mr-2.5"
            />
            <div className="flex items-center">
              <label
                htmlFor="start-date"
                className="text-[#556EE6] text-sm font-normal cursor-pointer"
              >
                {formatDayMonth(startProps.inputProps.value)}
              </label>
              <TextField
                id="start-date"
                sx={{ display: "none" }}
                {...startProps}
              />
              <span className="text-[#556EE6] text-sm font-normal">-</span>
              <label
                htmlFor="end-date"
                className="text-[#556EE6] text-sm font-normal cursor-pointer"
              >
                {formatDayMonth(endProps.inputProps.value)}
              </label>
              <TextField id="end-date" sx={{ display: "none" }} {...endProps} />
            </div>
          </div>
        )}
      />
    </LocalizationProvider>
  );
}

export default MyDateRangePicker;
