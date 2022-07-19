import { renderHook, act } from "@testing-library/react-hooks";
import { useStore } from "../movieStore";

const batmanMovieData = {
  id: "tt0035665",
  ratingsSummary: {
    aggregateRating: 6.1,
    voteCount: 2189,
    __typename: "RatingsSummary",
  },
  episodes: null,
  primaryImage: {
    id: "rm3938502144",
    width: 544,
    height: 834,
    url: "https://m.media-amazon.com/images/M/MV5BNTIzMDI1MTk3Nl5BMl5BanBnXkFtZTgwODE4NzM1MjE@._V1_.jpg",
    caption: {
      plainText:
        "Douglas Croft, Shirley Patterson, and Lewis Wilson in Batman (1943)",
      __typename: "Markdown",
    },
    __typename: "Image",
  },
  titleType: {
    text: "Movie",
    id: "movie",
    isSeries: false,
    isEpisode: false,
    __typename: "TitleType",
  },
  genres: {
    genres: [
      {
        text: "Action",
        id: "Action",
        __typename: "Genre",
      },
      {
        text: "Crime",
        id: "Crime",
        __typename: "Genre",
      },
      {
        text: "Family",
        id: "Family",
        __typename: "Genre",
      },
    ],
    __typename: "Genres",
  },
  titleText: {
    text: "Batman",
    __typename: "TitleText",
  },
  releaseYear: {
    year: 1943,
    endYear: null,
    __typename: "YearRange",
  },
  releaseDate: {
    day: 16,
    month: 7,
    year: 1943,
    __typename: "ReleaseDate",
  },
  runtime: {
    seconds: 15600,
    __typename: "Runtime",
  },
  series: null,
  meterRanking: null,
  plot: {
    plotText: {
      plainText:
        "Japanese spymaster Prince Daka operates a covert espionage organization located in Gotham City's now-deserted Little Tokyo which turns American scientists into pliable zombies.",
      __typename: "Markdown",
    },
    language: {
      id: "en-US",
      __typename: "DisplayableLanguage",
    },
    __typename: "Plot",
  },
};

const snatchMovieData = {
  id: "tt0208092",
  ratingsSummary: {
    aggregateRating: 8.3,
    voteCount: 839073,
    __typename: "RatingsSummary",
  },
  episodes: null,
  primaryImage: {
    id: "rm1248859904",
    width: 1026,
    height: 1500,
    url: "https://m.media-amazon.com/images/M/MV5BMTA2NDYxOGYtYjU1Mi00Y2QzLTgxMTQtMWI1MGI0ZGQ5MmU4XkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_.jpg",
    caption: {
      plainText:
        "Brad Pitt, Benicio Del Toro, Dennis Farina, Vinnie Jones, Jason Statham, and Ade in Snatch (2000)",
      __typename: "Markdown",
    },
    __typename: "Image",
  },
  titleType: {
    text: "Movie",
    id: "movie",
    isSeries: false,
    isEpisode: false,
    __typename: "TitleType",
  },
  genres: {
    genres: [
      {
        text: "Comedy",
        id: "Comedy",
        __typename: "Genre",
      },
      {
        text: "Crime",
        id: "Crime",
        __typename: "Genre",
      },
    ],
    __typename: "Genres",
  },
  titleText: {
    text: "Snatch",
    __typename: "TitleText",
  },
  releaseYear: {
    year: 2000,
    endYear: null,
    __typename: "YearRange",
  },
  releaseDate: {
    day: 16,
    month: 11,
    year: 2000,
    __typename: "ReleaseDate",
  },
  runtime: {
    seconds: 6240,
    __typename: "Runtime",
  },
  series: null,
  meterRanking: {
    currentRank: 572,
    rankChange: {
      changeDirection: "DOWN",
      difference: 48,
      __typename: "MeterRankChange",
    },
    __typename: "TitleMeterRanking",
  },
  plot: {
    plotText: {
      plainText:
        "Unscrupulous boxing promoters, violent bookmakers, a Russian gangster, incompetent amateur robbers and supposedly Jewish jewelers fight to track down a priceless stolen diamond.",
      __typename: "Markdown",
    },
    language: {
      id: "en-US",
      __typename: "DisplayableLanguage",
    },
    __typename: "Plot",
  },
};

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
