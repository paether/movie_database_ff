import { rest } from "msw";

export const handlers = [
  rest.get(
    process.env.REACT_APP_RAPIDAPI_BASE_URL +
      "titles/search/title/:titleFilter",
    (req, res, ctx) => {
      if (req.params.titleFilter === "test search input") {
        return res(
          ctx.json({
            results: [
              {
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
              },
            ],
          })
        );
      }
    }
  ),
  rest.get(
    process.env.REACT_APP_RAPIDAPI_BASE_URL + "titles/utils/genres",
    (req, res, ctx) => {
      return res(
        ctx.json({
          results: [
            null,
            "Action",
            "Adult",
            "Adventure",
            "Animation",
            "Biography",
            "Comedy",
            "Crime",
            "Documentary",
            "Drama",
            "Family",
            "Fantasy",
            "Film-Noir",
            "Game-Show",
            "History",
            "Horror",
            "Music",
            "Musical",
            "Mystery",
            "News",
            "Reality-TV",
            "Romance",
            "Sci-Fi",
            "Short",
            "Sport",
            "Talk-Show",
            "Thriller",
            "War",
            "Western",
          ],
        })
      );
    }
  ),
];
