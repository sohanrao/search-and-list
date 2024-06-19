import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import useApi from "./useApi";

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
}));

vi.mock("axios", async (importActual) => {
  const actual = await importActual<typeof import("axios")>();

  const mockAxios = {
    default: {
      ...actual.default,
      create: vi.fn(() => ({
        ...actual.default.create(),
        get: mocks.get,
        post: mocks.post,
      })),
    },
  };

  return mockAxios;
});

vi.mock("@tanstack/react-query", () => ({
  useQuery: () => ({
    isPending: false,
    error: null,
    data: { data: [{ foo: "bar" }] },
  }),
}));

describe("useApi hook", () => {
  it("should render the hook correctly", () => {
    mocks.get.mockResolvedValueOnce({
      data: { foo: "baz" },
    });
    const { result } = renderHook(() => useApi({ key: "foo", url: "foo.bar" }));
    expect(result.current.isPending).toBeFalsy();
  });
});
