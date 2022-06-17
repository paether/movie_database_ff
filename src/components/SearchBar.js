import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { Search } from "@mui/icons-material";

import LoadingButton from "@mui/lab/LoadingButton";

import { TextField } from "@mui/material";

export default function SearchBar({
  genreFilter,
  handleChange,
  genres,
  titleFilter,
  setTitleFilter,
  getTitle,
  isLoading,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <FormControl sx={{ m: 1, width: 150 }}>
          <InputLabel id="genre-select-label">Genre</InputLabel>
          <Select
            value={genreFilter}
            label="Genre"
            onChange={handleChange}
            labelId="genre-select-label"
            sx={{ backgroundColor: "#e29e20" }}
            id="genre-select"
            MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
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
        <TextField
          id="outlined-basic"
          label="Movie Title"
          variant="outlined"
          onChange={(e) => setTitleFilter(e.target.value)}
          value={titleFilter}
          sx={{ width: "150px" }}
        />
      </Box>
      <LoadingButton
        size="small"
        onClick={getTitle}
        loading={isLoading}
        loadingPosition="start"
        startIcon={<Search />}
        variant="contained"
        sx={{ backgroundColor: "#00414c" }}
      >
        Search
      </LoadingButton>
    </Box>
  );
}
