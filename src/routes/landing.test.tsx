import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Landing from "./landing";
import Index from ".";

const routes = [
  {
    path: "/",
    element: <Landing />,
    children: [
      {
        children: [
          { index: true, element: <div>Index route</div> },
          {
            path: ":type/:value",
            element: <div>Route</div>,
          },
        ],
      },
    ],
  },
];

const router = createMemoryRouter(routes, {
  initialEntries: ["/"],
});

describe("Landing Page", () => {
  it("renders the Landing Page component", async () => {
    const { container } = render(<RouterProvider router={router} />);
    expect(container).toMatchSnapshot();
  });
  describe("Landing Page content", () => {
    beforeEach(() => {
      render(<RouterProvider router={router} />);
    });
    it("should find only one instance of app name and search input", () => {
      const names = screen.queryAllByText("All You Can Read");
      const inputs = screen.queryAllByPlaceholderText("Search by title");
      expect(names.length).toBe(1);
      expect(inputs.length).toBe(1);
    });
    it("should set tag to active when clicked", async () => {
      await userEvent.click(screen.getByText("self-help"));
      expect(screen.getByText("self-help").classList.contains("active")).toBe(
        true,
      );
    });
  });
});
