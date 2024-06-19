import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Landing from "../routes/landing";
import Grid from "./grid";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

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
            element: <Grid />,
          },
        ],
      },
    ],
  },
];

const router = createMemoryRouter(routes, {
  initialEntries: ["/genre/love"],
});

describe("Grid", () => {
  it("should show loader when data is inPending state", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    expect(screen.getByText("Loading...")).to.exist;
  });
});
