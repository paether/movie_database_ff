import { useParams, useNavigate } from "react-router-dom";
import TheatersIcon from "@mui/icons-material/Theaters";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";

import InformationCard from "../components/InformationCard";
import useFetchMovieData from "../hooks/useFetchMovieData";

function Detail() {
  const { id } = useParams();
  const { data, error } = useFetchMovieData(`/titles/${id}`);

  const navigate = useNavigate();

  if (error) {
    const idPattern = /^\w{2}\d{7}/;
    const information = !idPattern.test(id)
      ? "Invalid Movie ID!"
      : "Unknown error occured";

    return (
      <Box sx={{ display: "flex" }}>
        <InformationCard information={information} />
      </Box>
    );
  }
  if (!data) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  const numberStyle = {
    backgroundColor: "primary.main",
    color: "white",
    borderRadius: "5px",
    padding: "5px",
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: "10px",
      }}
    >
      <Button
        size="medium"
        variant="contained"
        startIcon={<ArrowBackIcon />}
        sx={{
          backgroundColor: "secondary.main",
          "&:hover": {
            backgroundColor: "darkOrange.main",
          },
          marginBottom: "30px",
          color: "primary.main",
        }}
        onClick={() => navigate("/")}
      >
        back
      </Button>

      <Box
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "secondary.main",
          borderRadius: "20px",
        }}
      >
        {data.imageUrl ? (
          <Box
            sx={{
              maxHeight: 150,
              overflow: "hidden",
              width: "100%",
              borderTopRightRadius: "20px",
              borderTopLeftRadius: "20px",
            }}
          >
            <Box
              component="img"
              sx={{
                height: "100",
                width: "100%",
              }}
              alt="Movie Cover"
              src={data.imageUrl}
            />
          </Box>
        ) : (
          <TheatersIcon sx={{ fontSize: "350px" }} />
        )}
        <Box sx={{ my: 3, mx: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              mb: "10px",
            }}
          >
            <Typography
              variant="h4"
              component="div"
              sx={{ marginRight: "10px" }}
            >
              {data.title || "Movie Title"}
            </Typography>
            <Typography variant="h6" component="div" sx={{ ...numberStyle }}>
              {data.rating?.aggregateRating || "N/A"}
            </Typography>
          </Box>
          <Typography color="text.secondary" variant="body2">
            {data.plot || "No plot available"}
          </Typography>
        </Box>
        {Array.isArray(data.genres) && (
          <>
            <Divider variant="middle" />

            <Box sx={{ m: 2 }}>
              <Typography
                gutterBottom
                variant="body1"
                sx={{
                  fontSize: "1.4rem",
                  textAlign: { xxs: "center", xs: "left" },
                }}
              >
                Genres
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: "10px",
                  alignItems: "center",
                  flexWrap: "wrap",
                  flexDirection: { xs: "row", xxs: "column" },
                }}
              >
                {data.genres.map((genre) => (
                  <Chip
                    key={genre.id}
                    label={genre.text}
                    sx={{
                      backgroundColor: "primary.main",
                      color: "white",
                    }}
                  />
                ))}
              </Box>
            </Box>
          </>
        )}
        <Divider variant="middle" />
        <Box
          sx={{
            display: "flex",
            flexDirection: { xxs: "column", xs: "row" },
          }}
        >
          <Box
            sx={{
              m: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              flexBasis: "100%",
            }}
          >
            <Typography
              variant="span"
              sx={{
                fontSize: "1.2rem",
              }}
            >
              Nominations
            </Typography>
            <Typography
              variant="span"
              sx={{
                fontSize: "1.2rem",
                ...numberStyle,
              }}
            >
              {data.nominations?.total || "N/A"}
            </Typography>
          </Box>

          <Divider orientation="vertical" flexItem />
          <Box
            sx={{
              m: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              flexBasis: "100%",
              borderTop: { xxs: "1px solid #0000001f", xs: "none" },
            }}
          >
            <Typography variant="span" sx={{ fontSize: "1.2rem" }}>
              Wins
            </Typography>
            <Typography
              variant="span"
              sx={{ fontSize: "1.2rem", ...numberStyle }}
            >
              {data.wins?.total || "N/A"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Detail;
