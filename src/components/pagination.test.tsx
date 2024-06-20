import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Pagination, { PaginationProps } from "./pagination";
import userEvent from "@testing-library/user-event";

const defaultProps: PaginationProps = {
  totalCount: 100,
  itemsPerPage: 25,
  onPageClick: vi.fn(),
  offset: 0,
};

describe("Pagination component", () => {
  function setup({
    totalCount,
    itemsPerPage,
    onPageClick,
    offset,
  }: PaginationProps) {
    const { container } = render(
      <Pagination
        totalCount={totalCount}
        itemsPerPage={itemsPerPage}
        onPageClick={onPageClick}
        offset={offset}
      />,
    );
    return { container };
  }
  it("should render correctly", () => {
    const { container } = setup(defaultProps);
    expect(container).toMatchSnapshot();
  });

  it("should render correct numbder of page buttons", () => {
    setup({
      ...defaultProps,
      totalCount: 200,
      itemsPerPage: 25,
    });
    const pageButtons = screen.queryAllByTestId("btn-page-number");
    expect(pageButtons.length).toBe(8);
  });

  it("should set button as selected based on offset", () => {
    setup({
      ...defaultProps,
      totalCount: 100,
      itemsPerPage: 25,
      offset: 50,
    });
    const pageButtons = screen.queryAllByTestId("btn-page-number");
    expect(pageButtons.length).toBe(4);

    const activeBtn = screen.getByText("3");
    expect(activeBtn.classList.contains("active")).toBeTruthy();

    screen.debug();
  });

  it("should trigger callback with correct offset", async () => {
    const mockfn = vi.fn();
    setup({
      ...defaultProps,
      offset: 50,
      onPageClick: mockfn,
    });

    const btns = screen.queryAllByTestId("btn-page-number");
    await userEvent.click(btns[0]);

    expect(mockfn).toHaveBeenCalledWith(0);

    await userEvent.click(btns[1]);

    expect(mockfn).toHaveBeenCalledWith(25);
  });
});
