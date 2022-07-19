import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { server } from "./mocks/server";
import { QueryClient, QueryClientProvider } from "react-query";

import App from "./App";

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
          <App />
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

  it("finds a movie", async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      render(
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
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
  });
});
