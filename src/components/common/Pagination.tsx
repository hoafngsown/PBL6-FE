import IconArrowLeftDisabled from "@/assets/images/ic-arrow-left-disabled.svg";
import IconArrowLeft from "@/assets/images/ic-arrow-left.svg";
import IconArrowRightDisabled from "@/assets/images/ic-arrow-right-disabled.svg";
import IconArrowRight from "@/assets/images/ic-arrow-right.svg";
import { DOTS, usePaginations } from "@/libs/hooks/usePaginations";
import { MenuItem, Select } from "@mui/material";
interface IPaginationProps {
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  onChangeItemPerPage?: (itemPerPage: number) => void;
}

const OPTION_ITEM_PER_PAGE = [
  {
    value: 10,
    label: "10",
  },
  {
    value: 25,
    label: "25",
  },
  {
    value: 50,
    label: "50",
  },
  {
    value: 100,
    label: "100",
  },
];

function Pagination(props: IPaginationProps) {
  const { page, setPage, paginationRange, setItemsPerPage, itemsPerPage } =
    usePaginations({
      onPageChange: props.onPageChange,
      totalPages: props.totalPages,
    });

  const handleClickPrev = () => {
    if (page <= 1) return;
    setPage((prev) => prev - 1);
  };

  const handleClickNext = () => {
    if (page >= props.totalPages) return;
    setPage((prev) => prev + 1);
  };

  const handleClickPage = (page: number) => {
    setPage(page);
  };

  const onChangeItemPerPage = (number: number) => {
    setItemsPerPage(number);
    if (props.onChangeItemPerPage) props.onChangeItemPerPage(number);
  };

  return (
    <div className="flex items-center">
      <div className="mr-4 flex items-center gap-x-3">
        <span>表示件数</span>

        <Select
          sx={{
            p: 0,
            height: "35px",
            minWidth: "68px",
            maxWidth: "70px",
            bgcolor: "#ececec",
            outline: "none",
            "&:focus": {
              border: "none",
              outline: "none",
            },
          }}
          value={itemsPerPage}
          onChange={(e) => onChangeItemPerPage(+e.target.value)}
        >
          {OPTION_ITEM_PER_PAGE.map((item, idx) => (
            <MenuItem key={idx} value={item?.value}>
              {item?.label}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className="flex items-stretch gap-x-2">
        <button
          className={`w-8 h-8 flex items-center justify-center rounded-sm border-solid border text-sm leading-[1.375rem] font-medium ${page <= 1 && "border-[#E2E2E2]"
            }`}
          disabled={page <= 1}
          onClick={handleClickPrev}
        >
          <img
            src={page <= 1 ? IconArrowLeftDisabled : IconArrowLeft}
            alt="arrow-left"
          ></img>
        </button>
        {paginationRange?.length > 0 &&
          paginationRange.map((item, index: number) => {
            if (item === DOTS)
              return (
                <div
                  key={index}
                  className="w-8 h-8 flex items-center justify-center gap-x-1"
                >
                  <div className="w-[4px] h-[4px] rounded-[50%] bg-[#C8C7C7]"></div>
                  <div className="w-[4px] h-[4px] rounded-[50%] bg-[#C8C7C7]"></div>
                  <div className="w-[4px] h-[4px] rounded-[50%] bg-[#C8C7C7]"></div>
                </div>
              );

            return (
              <button
                key={index}
                className={`w-8 h-8 flex items-center justify-center rounded-sm border-solid border text-sm leading-[1.375rem] font-medium ${page === (item as number) && "border-[#556EE6] text-[#556EE6]"
                  }`}
                onClick={() => handleClickPage(item as number)}
              >
                {item}
              </button>
            );
          })}
        <button
          className={`w-8 h-8 flex items-center justify-center rounded-sm border-solid border text-sm leading-[1.375rem] font-medium ${page >= props.totalPages && "border-[#E2E2E2]"
            }`}
          disabled={page >= props.totalPages}
          onClick={handleClickNext}
        >
          <img
            src={
              page >= props.totalPages ? IconArrowRightDisabled : IconArrowRight
            }
            alt="arrow-right"
          ></img>
        </button>
      </div>
    </div>
  );
}

export default Pagination;
