import { useState, useCallback } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { Search } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { TextField } from "@mui/material";

import axiosInstance from "../api";

export default function SearchBar({
  genres,
  titleFilter,
  setTitleFilter,
  updateSearchResult,
}) {
  const [genreFilter, setGenreFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenreChange = (event) => {
    setGenreFilter(event.target.value);
  };

  const getTitle = useCallback(
    async (e) => {
      if (!titleFilter) return;
      try {
        setIsLoading(true);
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
          setIsLoading(false);
          return;
        }

        updateSearchResult(resp.data.results);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    },
    [titleFilter, genreFilter, updateSearchResult]
  );

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
            {genres.map((genre, i) => (
              <MenuItem key={i} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <TextField
        id="outlined-basic"
        label="Movie Title"
        variant="outlined"
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
      <LoadingButton
        size="small"
        onClick={getTitle}
        loading={isLoading}
        loadingPosition="start"
        startIcon={<Search />}
        variant="contained"
        sx={{
          backgroundColor: "secondary.main",
          "&:hover": {
            backgroundColor: "darkOrange.main",
          },
        }}
      >
        Search
      </LoadingButton>
    </Box>
  );
}
