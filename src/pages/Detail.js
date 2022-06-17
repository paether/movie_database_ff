import { useParams, useNavigate, useLocation } from "react-router-dom";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import TheatersIcon from "@mui/icons-material/Theaters";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Container from "@mui/material/Container";

import useFetch from "../Hooks/useFetch";

function Detail() {
  const { id } = useParams();
  const { data, error } = useFetch("/titles/" + id);

  const navigate = useNavigate();

  if (error) {
    return <div>error</div>;
  }
  if (!data) {
    return <div>loading</div>;
  }
  if (!data.results) {
    return <div>this movie does not exist</div>;
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div>
        <button onClick={() => navigate(-1)}>back</button>
      </div>
      <Card sx={{ maxWidth: 345 }}>
        {data.results.primaryImage.url ? (
          <Box
            component="img"
            sx={{
              height: 350,
              width: 300,
            }}
            alt="Movie Cover"
            src={data.results.primaryImage.url}
          />
        ) : (
          <TheatersIcon sx={{ fontSize: "350px" }} />
        )}

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {data.results.plot?.plotText.plainText || "No plot available"}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Detail;
