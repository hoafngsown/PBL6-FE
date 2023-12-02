import React from "react";

// interface IData {
//   inforTask: IStaffTaskByTask[];
//   pointTaskOther: number;
//   totalTaskOther: number;
//   totalStaff: number;
// }
// interface ChartsPieProps {
//   onChangeFilter: (data: number, id: number) => any;
//   id: number;
//   data: IData;
//   initFilter: string;
// }
interface ChartsPieProps {

}

// const mappingData = (data: IData) => {
//   if (!data) return [];

//   let filterd = [];

//   data?.inforTask?.forEach((item) => {
//     if (+item?.totalTask > 0) {
//       filterd.push({
//         name: item?.workName,
//         y: +item?.totalTask,
//       });
//     }
//   });

//   if (+data?.totalTaskOther > 0) {
//     filterd = filterd.concat([
//       {
//         name: "その他",
//         y: +data?.totalTaskOther,
//       },
//     ]);
//   }

//   return filterd;
// };

function ChartsPie(props: ChartsPieProps) {
  // const [listInitHotel] = useRecoilState(listHotel);

  // const optionsChart = React.useMemo(() => {
  //   return {
  //     chart: {
  //       type: "pie",
  //       backgroundColor: "none",
  //       height: "250px",
  //     },
  //     title: {
  //       text: "",
  //     },
  //     credits: {
  //       enabled: false,
  //     },
  //     xAxis: {
  //       type: "category",
  //       labels: {
  //         rotation: 45,
  //         style: {
  //           fontSize: "13px",
  //           fontFamily: "Verdana, sans-serif",
  //         },
  //       },
  //     },
  //     legend: {
  //       verticalAlign: "bottom",
  //       alignColumns: true,
  //       layout: "horizontal",
  //       align: "center",
  //       x: 0,
  //       y: 10,
  //       itemStyle: {
  //         color: "#000000",
  //         fontWeight: "normal",
  //         fontSize: "12px",
  //         lineHeight: "20px",
  //       },
  //       symbolHeight: 16,
  //       symbolWidth: 16,
  //       symbolRadius: 0,
  //       itemMarginTop: 12,
  //     },
  //     plotOptions: {
  //       pie: {
  //         showInLegend: true,
  //         colors: [
  //           "#0AB39C",
  //           "#F6B94B",
  //           "#2A9CDB",
  //           "#F06547",
  //           "#ed7d31",
  //           "#a5a5a5",
  //         ],
  //       },
  //     },
  //     series: [
  //       {
  //         name: "全部",
  //         data: props?.data ? mappingData(props?.data) : [],
  //         dataLabels: {
  //           distance: 12,
  //           fillColor: "#2A9CDB",
  //         },
  //       },
  //     ],
  //   };
  // }, [props?.data]);

  // const hotelName = React.useMemo(() => {
  //   return (
  //     listInitHotel &&
  //     listInitHotel?.length > 0 &&
  //     listInitHotel.find((hotel) => hotel?.id === props.id)?.name
  //   );
  // }, [props.id, listInitHotel]);

  // const handleChangeFilter = (value: number) => {
  //   props.onChangeFilter(value, props.id);
  // };

  return (
    <></>
    // <div className="bg-[#fff] rounder-[5px]">
    //   <div className="px-[0.75rem]">
    //     <div className="flex justify-between">
    //       <div className="text-[#211F20] font-medium">
    //         <p className="mt-[0.5rem]">{hotelName}</p>
    //       </div>
    //       <div className="text-[#556EE6] flex mt-[5px]">
    //         <span className="text-[0.75rem] font-medium text-[#556EE6] mt-[4px]">
    //           スタッフ数：{props?.data?.totalStaff}名
    //         </span>
    //         <DropdownTime
    //           initValue={props.initFilter}
    //           onChange={handleChangeFilter}
    //         />
    //       </div>
    //     </div>
    //     <div className="text-[#878687]">タスク</div>
    //   </div>

    //   <HighchartsReact highcharts={Highcharts} options={optionsChart} />
    // </div>
  );
}

export default React.memo(ChartsPie);
