import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { server } from "../../mocks/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import Home from "../Home";
import { genres } from "../../test/fixtures";
import Detail from "../Detail";

const queryClient = new QueryClient();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Search for movies", () => {
  it("loads home page", async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      render(
        <QueryClientProvider client={queryClient}>
          <Home genres={genres} />
        </QueryClientProvider>
      );
    });

    const searchButton = await screen.findByText(/Search/i);
    expect(searchButton).toBeInTheDocument();

    const movieTitleSearch = await screen.findAllByText(/Movie Title/i);
    expect(movieTitleSearch).toHaveLength(2);

    const genreFilter = await screen.findAllByText(/Genre/i);
    expect(genreFilter).toHaveLength(2);
  });

  it("finds a movie and navigates to Detail tab", async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<Home genres={genres} />} />
              <Route path="/:id" element={<Detail />} />
            </Routes>
          </QueryClientProvider>
        </MemoryRouter>
      );
    });

    const searchInput = screen.getByLabelText(/Movie Title/i);
    const searchButton = await screen.findByText(/Search/i);

    userEvent.type(searchInput, "test search input");

    expect(searchInput).toHaveDisplayValue("test search input");
    expect(searchButton).toBeInTheDocument();

    userEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText(/Snatch/i)).toBeInTheDocument();
    });

    const detailsButton = screen.getByText(/Details/i);

    userEvent.click(detailsButton);

    const backButton = await screen.findByText(/back/i);

    expect(backButton).toBeInTheDocument();
  });
});
