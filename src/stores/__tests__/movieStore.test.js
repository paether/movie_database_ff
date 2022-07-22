import { renderHook, act } from "@testing-library/react-hooks";
import { useStore } from "../movieStore";
import { snatchMovieData, batmanMovieData } from "../../test/fixtures";

describe("movieStore functions", () => {
  test("updates search results", () => {
    const { result } = renderHook(() => useStore());
    const testSearchResult = [batmanMovieData, snatchMovieData];

    act(() => {
      result.current.updateSearchResult(testSearchResult);
    });

    expect(result.current.searchResult).toEqual(testSearchResult);
  });

  test("moves cards to watchList from searchResult", () => {
    const { result } = renderHook(() => useStore());
    const droppableSource = { index: "0", droppableId: "searchResult" };
    const droppableDestination = { index: "0", droppableId: "watchList" };

    act(() => {
      result.current.moveCard(
        "searchResult",
        "watchList",
        droppableSource,
        droppableDestination,
        result.current.state
      );
    });

    expect(result.current.watchList).toEqual([batmanMovieData]);

    act(() => {
      result.current.moveCard(
        "searchResult",
        "watchList",
        droppableSource,
        droppableDestination,
        result.current.state
      );
    });

    expect(result.current.watchList).toEqual([
      snatchMovieData,
      batmanMovieData,
    ]);
  });

  test("reorders cards in watchList", () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.reorderCards("watchList", 0, 1);
    });

    expect(result.current.watchList).toEqual([
      batmanMovieData,
      snatchMovieData,
    ]);
  });

  test("deletes card from watchList", () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.deleteCard("watchList", 0, 0);
    });

    expect(result.current.watchList).toEqual([snatchMovieData]);
  });
});
