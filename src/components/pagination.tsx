import { useState } from "react";
import "./pagination.scss";

type PaginationProps = {
  offset: number;
  totalCount: number;
  itemsPerPage?: number;
  onPageClick: (offset: number) => void;
};

type PageButton = {
  label: string;
  offset: number;
};

function getPageNumbers(
  totalCount: number,
  itemsPerPage: number,
): { numbers: PageButton[] } {
  const total = totalCount < 500 ? totalCount : 500;
  const pages = Math.ceil(total / itemsPerPage);
  return {
    numbers: new Array(pages).fill("").map((_, index) => ({
      label: String(index + 1),
      offset: index * itemsPerPage,
    })),
  };
}

export default function Pagination({
  offset,
  totalCount,
  itemsPerPage = 50,
  onPageClick,
}: PaginationProps) {
  const { numbers } = getPageNumbers(totalCount, itemsPerPage);

  return (
    <div className="app__pagination">
      {numbers.map((item) => (
        <button
          key={"offset" + item.offset}
          className={item.offset === offset ? "active" : ""}
          onClick={() => onPageClick(item.offset)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
