import IconArrowDown from "@/assets/images/ic-arrow-down.svg";
// import { listHotel } from "@/constants";
// import * as locales from "react-date-range/dist/locale";
import React, { useState } from "react";
interface IData {
  nickName: string;
  point: string;
}
interface ChartsColumnProps {
  isAdmin: boolean;
  initDate: any;
  onChange: (startDate: Date, endDate: Date) => void;
  initSelectValue: number;
  onChangeSelect: (id: number) => void;
  data: IData[];
}
interface ISelectField {
  options: ISelectOption[];
  value: number;
  onChange: (value: string | number) => void;
  defaultValue: number;
}

export const validate = (startDate: string, endDate: string): boolean => {
  if (!startDate || !endDate) return false;
  return true;
};

function ChartsColumn(props: ChartsColumnProps) {
  // const [listInitHotel] = useRecoilState(listHotel);
  const [dateRangeValue, setDateRangeValue] = useState(
    props?.initDate || {
      startDate: null,
      endDate: null,
      key: "selection",
    }
  );
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);
  const [selectHotelValue, setSelectHotelValue] = useState(
    props.initSelectValue
  );

  const handleChangeSelectValue = (value: number) => {
    setSelectHotelValue(value);
    props.onChangeSelect(value);
    setIsOpenDatePicker(false);
  };

  const optionsChart = React.useMemo(
    () => ({
      chart: {
        type: "column",
        plotBorderWidth: 0.5,
        // plotBorderColor: "#211F20",
      },
      title: {
        text: "",
        align: "left",
      },
      xAxis: {
        type: "category",
        labels: {
          rotation: 30,
          style: {
            color: "#211F20",
            fontSize: "10px",
            fontFamily: "Roboto",
          },
        },

        tickWidth: 0.7,
        tickLength: 12,
        tickColor: "black",
        tickmarkPlacement: "on",
        gridLineWidth: 1,
      },
      yAxis: {
        title: {
          text: "",
        },
        className: "yAxis",
        labels: {
          style: {
            color: "#211F20",
            fontSize: "12px",
            fontFamily: "Roboto",
            position: "relative",
            strokeWidth: "2px",
          },
          formatter: function () {
            return "<span>" + Number(this.value) + "</span>";
          },
        },

        tickWidth: 0.5,
        tickLength: 9,
        tickColor: "black",
        tickmarkPlacement: "on",
        gridLineWidth: 1,
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        column: {
          color: "#556EE6",
        },
      },
      series: [
        {
          name: "ポイント",
          data:
            props?.data && props?.data?.length > 0
              ? props?.data?.map((item: IData) => [
                item?.nickName,
                +item?.point,
              ])
              : [],
          dataLabels: {
            enabled: true,
            align: "center",
            y: 30,
            style: {
              fontSize: "12px",
              fontFamily: "Roboto",
              border: "none",
              lineHeight: "20px",
              color: "#ffffff",
              fontWeight: "normal",
              boxShadow: "none",
            },
          },
        },
      ],
    }),
    [props?.data]
  );

  const handleDateChange = (item: any) => {
    const selection = item.selection;
    const isPassing = validate(selection?.startDate, selection?.endDate);
    setDateRangeValue([selection as any]);
    if (!isPassing) return;
    props.onChange(selection?.startDate, selection?.endDate);
  };

  return (
    <></>
    // <div className="mt-4 bg-[#fff] py-6 px-4 rounder-[5px] shadow-sm position relative w-full h-full">
    //   <div className="flex items-center justify-between">
    //     <span className="inline-block text-base leading-5 font-medium">
    //       ポイント数
    //     </span>
    //     <div className="flex items-center gap-4">
    //       {props.isAdmin && (
    //         <div>
    //           <SelectField
    //             defaultValue={selectHotelValue}
    //             options={listInitHotel?.map((item) => ({
    //               label: item?.name,
    //               value: item?.id,
    //             }))}
    //             value={selectHotelValue}
    //             onChange={handleChangeSelectValue}
    //           />
    //         </div>
    //       )}
    //       <div className="relative cursor-pointer">
    //         <div
    //           className="flex items-center gap-x-2 py-2 px-4 border-[1px] border-solid border-[#EDEDED] rounded-[5px]"
    //           onClick={() => setIsOpenDatePicker((prev) => !prev)}
    //         >
    //           <div className="flex items-center justify-center">
    //             <img src="/images/icons/icon-calendar.svg" alt="calendar" />
    //           </div>
    //           <div className="flex items-center">
    //             <span className="text-sm leading-5">
    //               {formatDayMonth(dateRangeValue[0]?.startDate)}
    //             </span>
    //             <span className="text-sm leading-5">-</span>
    //             <span className="text-sm leading-5">
    //               {formatDayMonth(dateRangeValue[0]?.endDate)}
    //             </span>
    //           </div>
    //         </div>
    //         {isOpenDatePicker && (
    //           <div
    //             className={`absolute z-40 top-[150%] right-0 opacity-0 transition-all ${
    //               isOpenDatePicker && "opacity-100"
    //             }`}
    //             onMouseLeave={() => setIsOpenDatePicker(false)}
    //           >
    //             {/* <DateRange
    //               locale={locales["ja"]}
    //               editableDateInputs={true}
    //               onChange={handleDateChange}
    //               moveRangeOnFirstSelection={false}
    //               ranges={dateRangeValue}
    //               maxDate={new Date()}
    //             /> */}
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    //   <div className="w-[100%] h-full mt-4">
    //     <HighchartsReact highcharts={Highcharts} options={optionsChart} />
    //   </div>
    // </div>
  );
}

const SelectField = (props: ISelectField) => {
  return (
    <div className="flex items-center gap-x-2">
      <div className="relative">
        <select
          id={`my-select-option-${props.value}`}
          defaultValue={props.defaultValue}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          className="px-4 py-2 outline-none border border-solid border-[#E2E2E2] rounded-[3px] h-[36px] w-[228px] select-no-arrow"
        >
          {props?.options &&
            props?.options?.length > 0 &&
            props.options.map((item: ISelectOption, index: number) => (
              <option className="px-4 py-5" key={index} value={item.value}>
                {item.label}
              </option>
            ))}
        </select>
        <img
          src={IconArrowDown}
          alt="arrow-down"
          className="absolute top-[50%] right-4 -translate-y-[50%] pointer-events-none"
        />
      </div>
    </div>
  );
};

export default React.memo(ChartsColumn);
