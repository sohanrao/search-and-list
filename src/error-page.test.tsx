import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrorPage from "./error-page";
import userEvent from "@testing-library/user-event";
import Landing from "./routes/landing";

describe("Error Page", () => {
  it("renders the Error Page component", async () => {
    const FAKE_EVENT = { name: "test event" };
    const routes = [
      {
        path: "/",
        errorElement: <ErrorPage />,
        element: <Landing />,
        loader: () => FAKE_EVENT,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/foo"],
      initialIndex: 1,
    });

    const { container } = render(<RouterProvider router={router} />);

    expect(container).toMatchSnapshot();

    const p = screen.findByText("Sorry, an unexpected error has occurred.");
    const btnHome = screen.getByText("Home");
    expect(p).to.exist;
    expect(btnHome).to.exist;

    await userEvent.click(btnHome);

    expect(screen.getByText("All You Can Read")).to.exist;
  });
});
