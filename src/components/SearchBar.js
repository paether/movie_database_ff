import { useState, useCallback } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Search } from "@mui/icons-material";
import { TextField } from "@mui/material";

import axiosInstance from "../api";
import { useStore } from "../stores/movieStore";

const inputStyle = {
  borderColor: "secondary.main",
  color: "secondary.main",
  multilineColor: "secondary.main",
  ".Mui-focused": {
    color: "secondary.main",
  },
  "&.Mui-focused": {
    color: "secondary.main",
  },
  ".MuiFormControl-root": {
    borderColor: "secondary.main",
    color: "secondary.main",
  },
  ".MuiOutlinedInput-root": {
    color: "secondary.main",
    "&:hover fieldset": {
      borderColor: "darkOrange.main",
    },
    "&.Mui-focused fieldset": {
      borderColor: "darkOrange.main",
    },
  },
  ".MuiOutlinedInput-notchedOutline": {
    borderColor: "secondary.main",
    borderWidth: "2px",
  },
  ".notchedOutline": {
    borderColor: "secondary.main",
  },
  ":hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "secondary.main",
  },

  ".MuiSelect-icon": {
    color: "secondary.main",
  },

  ".MuiInputBase-root-MuiOutlinedInput-root": {
    borderColor: "secondary.main",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "darkOrange.main",
  },
};

export default function SearchBar({ genres, updateSearchResult }) {
  const watchList = useStore((state) => state.watchList);

  const [genreFilter, setGenreFilter] = useState("");
  const [titleFilter, setTitleFilter] = useState("");

  const handleGenreChange = (event) => {
    setGenreFilter(event.target.value);
  };

  const getTitle = useCallback(
    async (e) => {
      if (!titleFilter) return;

      try {
        const resp = await axiosInstance.get(
          `/titles/search/title/${titleFilter}`,
          {
            params: {
              info: "base_info",
              titleType: "movie",
              ...(genreFilter && { genre: genreFilter }),
            },
          }
        );
        if (resp.data.results?.length === 0) {
          updateSearchResult("No movies found!");
          return;
        }

        //filter out those movies which are already in the WatchList
        const filteredResults = resp.data.results.filter((item) => {
          return !watchList.find(
            (watchListItem) => watchListItem.id === item.id
          );
        });

        updateSearchResult(filteredResults);
      } catch (error) {
        console.log(error);
      }
    },
    [titleFilter, genreFilter, updateSearchResult, watchList]
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: { xxs: "column", sm: "row" },
        gap: "10px",
        padding: { xxs: "20px" },
        backgroundColor: "#002127",
        borderRadius: "10px",
        margin: { xxs: "10px" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "secondary.main",
        }}
      >
        <FormControl sx={{ m: 1, width: 150 }}>
          <InputLabel
            sx={{ ...inputStyle, color: "darkOrange.main" }}
            id="genre-select-label"
          >
            Genre
          </InputLabel>
          <Select
            value={genreFilter}
            label="Genre"
            onChange={handleGenreChange}
            inputProps={{ "data-testid": "genre" }}
            labelId="genre-select-label"
            id="genre-select"
            sx={inputStyle}
            MenuProps={{
              PaperProps: {
                sx: {
                  maxHeight: 300,
                  backgroundColor: "darkOrange.main",
                  color: "primary.main",
                },
              },
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {genres.map(
              (genre, i) =>
                genre && (
                  <MenuItem key={i} value={genre}>
                    {genre}
                  </MenuItem>
                )
            )}
          </Select>
        </FormControl>
      </Box>
      <TextField
        id="outlined-basic"
        label="Movie Title"
        variant="outlined"
        onKeyPress={(ev) => {
          if (ev.key === "Enter") {
            ev.preventDefault();
            getTitle();
          }
        }}
        onChange={(e) => setTitleFilter(e.target.value)}
        value={titleFilter}
        sx={{
          ...inputStyle,
          width: "150px",
          borderColor: "secondary.main",
          "& label.Mui-focused": {
            color: "secondary.main",
          },
          "& label": {
            color: "darkOrange.main",
          },
        }}
      />
      <Button
        size="small"
        onClick={getTitle}
        startIcon={<Search />}
        variant="contained"
        sx={{
          backgroundColor: "secondary.main",
          "&:hover": {
            backgroundColor: "darkOrange.main",
          },
          color: "primary.main",
        }}
      >
        Search
      </Button>
    </Box>
  );
}
