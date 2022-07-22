import { useParams, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import TheatersIcon from "@mui/icons-material/Theaters";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import StarIcon from "@mui/icons-material/Star";
import { motion } from "framer-motion";

import InformationCard from "../components/InformationCard";
import useMovieData from "../hooks/useMovieData";
import DetailChipsContainer from "../components/DetailsChipContainer";

const numberStyle = {
  backgroundColor: "primary.main",
  color: "white",
  borderRadius: "5px",
  padding: "5px",
};

function Detail() {
  const { id } = useParams();
  const { data, isError, isLoading } = useMovieData(id, [
    "rating",
    "awards",
    "base_info",
    "creators_directors_writers",
  ]);

  const navigate = useNavigate();

  const aggregateData = useMemo(() => {
    if (!data) return null;
    const [rating, awards, baseInfo, creators] = data;
    return {
      rating: rating.data.results?.ratingsSummary,
      wins: awards.data.results?.wins,
      nominations: awards.data.results?.nominations,
      plot: baseInfo.data.results?.plot?.plotText?.plainText,
      title: baseInfo.data.results?.titleText?.text,
      releaseYear: baseInfo.data.results?.releaseYear?.year,
      imageUrl: baseInfo.data.results?.primaryImage?.url,
      creators: creators.data.results,
      genres: baseInfo.data.results?.genres?.genres,
    };
  }, [data]);

  if (isError) {
    const idPattern = /^\w{2}\d{7}/;
    const information = !idPattern.test(id)
      ? "Invalid Movie ID!"
      : "Unknown error occured";

    return <InformationCard information={information} />;
  }

  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: "10px",
      }}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
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
          maxWidth: { xxs: "360px", sm: "500px" },
          bgcolor: "secondary.main",
          borderRadius: "20px",
        }}
      >
        {aggregateData.imageUrl ? (
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
              src={aggregateData.imageUrl}
            />
          </Box>
        ) : (
          <TheatersIcon sx={{ fontSize: "200px", width: "100%" }} />
        )}
        <Box sx={{ my: 3, mx: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="h4"
                component="div"
                sx={{ marginRight: "10px" }}
              >
                {aggregateData.title || "Movie Title"}
              </Typography>
              <Typography color="text.secondary">
                {aggregateData.releaseYear || "Release year unknown"}
              </Typography>
            </Box>

            <Box
              sx={{
                ...numberStyle,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <StarIcon />
              <Typography variant="h6" component="div">
                {aggregateData.rating?.aggregateRating || "N/A"}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "10px",
              alignItems: "center",
              flexWrap: "wrap",
              flexDirection: "row",
              pt: "10px",
              pb: "10px",
            }}
          >
            {Array.isArray(aggregateData.genres) &&
              aggregateData.genres.length > 0 &&
              aggregateData.genres.map((genre) => (
                <Chip
                  key={genre.id}
                  label={genre.text}
                  sx={{
                    backgroundColor: "transparent",
                    color: "text.secondary",
                    borderColor: "text.secondary",
                    border: "1px solid",
                  }}
                />
              ))}
          </Box>
          <Typography color="text.secondary" variant="body2">
            {aggregateData.plot || "No plot available"}
          </Typography>
        </Box>
        {Array.isArray(aggregateData.creators?.directors) &&
          aggregateData.creators.directors.length > 0 && (
            <DetailChipsContainer header="Directors">
              {aggregateData.creators.directors[0].credits.map((director) => (
                <Chip
                  key={director.name.id}
                  label={director.name.nameText.text}
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                  }}
                />
              ))}
            </DetailChipsContainer>
          )}
        {Array.isArray(aggregateData.creators?.writers) &&
          aggregateData.creators.writers.length > 0 && (
            <DetailChipsContainer header="Writers">
              {aggregateData.creators.writers[0].credits.map((writer) => (
                <Chip
                  key={writer.name.id}
                  label={writer.name.nameText.text}
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                  }}
                />
              ))}
            </DetailChipsContainer>
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
              {aggregateData.nominations?.total || "N/A"}
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
              {aggregateData.wins?.total || "N/A"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Detail;
