import { changeUrlQuery } from "@/utils";
import React, { useEffect, useRef, useState } from "react";

interface IUsePaginationProps {
  onPageChange: (page: number) => void;
  siblingCount?: number;
  totalPages: number;
}

// Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
const PAGE_COUNT: number = 5;
export const DOTS = "DOTS";

export const usePaginations = (options: IUsePaginationProps) => {
  const searchParams = React.useMemo(
    () => new URLSearchParams(window.location.search),
    []
  );

  const siblingCount = options.siblingCount || 1;
  const defaultPage = searchParams.get("page") || 1;
  const defaultItemsPerPage = searchParams.get("itemsPerPage") || 10;

  const [page, setPage] = useState(+defaultPage);
  const [itemsPerPage, setItemsPerPage] = useState(+defaultItemsPerPage);

  const prevPage = useRef(page);
  const prevItemsPerPage = useRef(itemsPerPage);

  const getRange = (start: number, end: number) => {
    let length = end - start + 1;

    return Array.from({ length }, (_, index: number) => index + start);
  };

  useEffect(
    () => {
      if (page !== prevPage.current) {
        changeUrlQuery("page", page.toString());
        options?.onPageChange(page);
        prevPage.current = page;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options.onPageChange, page]
  );

  useEffect(
    () => {
      const paramsPage = new URLSearchParams(window.location.search).get(
        "page"
      );
      if (!paramsPage) return;
      if (+paramsPage !== page) {
        setPage(+paramsPage);
        prevPage.current = +paramsPage;
        options.onPageChange(+paramsPage);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [new URLSearchParams(window.location.search).get("page")]
  );

  useEffect(
    () => {
      const paramsitemPerPage = new URLSearchParams(window.location.search).get(
        "itemsPerPage"
      );
      if (!paramsitemPerPage) return;
      if (+paramsitemPerPage !== itemsPerPage) {
        setItemsPerPage(+paramsitemPerPage);
        prevItemsPerPage.current = +paramsitemPerPage;
        // options.onPageChange(+paramsitemPerPage);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [new URLSearchParams(window.location.search).get("itemsPerPage")]
  );

  useEffect(
    () => {
      const url = new URL(window.location.href);
      const paramsQuery = Object.fromEntries(url.searchParams);
      const page = paramsQuery?.page || "1";
      const itemPerPage = paramsQuery?.itemsPerPage || "10";
      url.searchParams.set("page", page);
      url.searchParams.set("itemsPerPage", itemPerPage);
      window.history.replaceState(null, null, url.toString());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(
    () => {
      if (itemsPerPage !== prevItemsPerPage.current) {
        changeUrlQuery("itemsPerPage", itemsPerPage.toString());
        if (page === 1) {
          options?.onPageChange(1);
        }
        setPage(1);
        prevItemsPerPage.current = itemsPerPage;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [itemsPerPage, options.onPageChange, page]
  );

  const paginationRange = React.useMemo(() => {
    const totalPageNumbers = siblingCount + PAGE_COUNT;

    //   Case 1:
    if (totalPageNumbers >= options.totalPages) {
      return getRange(1, options.totalPages);
    }

    // Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
    const leftSiblingIndex = Math.max(page - siblingCount, 1);
    const rightSiblingIndex = Math.min(page + siblingCount, options.totalPages);
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < options.totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = options.totalPages;

    // Case 2:show right , hide left
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = getRange(1, leftItemCount);

      return [...leftRange, DOTS, options.totalPages];
    }

    // Case 3: Show left , hide right
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = getRange(
        options.totalPages - rightItemCount + 1,
        options.totalPages
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    // Case 4: Both left & right show
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = getRange(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [options.totalPages, siblingCount, page]);

  return {
    page,
    setPage,
    itemsPerPage,
    setItemsPerPage,
    paginationRange,
  };
};
