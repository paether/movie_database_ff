import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { server } from "../../mocks/server";
import Detail from "../Detail";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
  logger: {
    log: console.log,
    warn: console.warn,
    error: () => {},
  },
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Detail page data displaying", () => {
  test("renders Detail page with mocked data", async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      render(
        <MemoryRouter initialEntries={["/validID"]}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/:id" element={<Detail />} />
            </Routes>
          </QueryClientProvider>
        </MemoryRouter>
      );
    });
    expect(await screen.findAllByText("Guy Ritchie")).toHaveLength(2);
  });
  test("renders error Card in case of failure", async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      render(
        <MemoryRouter initialEntries={["/invalidID"]}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/:id" element={<Detail />} />
            </Routes>
          </QueryClientProvider>
        </MemoryRouter>
      );
    });
    expect(await screen.findByText(/Invalid/i)).toBeInTheDocument();
  });
});
