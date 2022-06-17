import { useParams, useNavigate } from "react-router-dom";
import * as React from "react";
import Card from "@mui/material/Card";
import TheatersIcon from "@mui/icons-material/Theaters";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import useFetchMovieData from "../Hooks/useFetchMovieData";
import NotFound from "./NotFound";
function Detail() {
  const { id } = useParams();
  const { data, error } = useFetchMovieData(`/titles/${id}`);

  const navigate = useNavigate();

  if (error) {
    console.log(error);
    const idPattern = /^\w{2}\d{7}/;
    if (!idPattern.test(id)) {
      return <NotFound />;
    }
    return <div>error</div>;
  }
  if (!data) {
    return <div>loading</div>;
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
        {data.imageUrl ? (
          <Box
            component="img"
            sx={{
              height: 350,
              width: 300,
            }}
            alt="Movie Cover"
            src={data.imageUrl}
          />
        ) : (
          <TheatersIcon sx={{ fontSize: "350px" }} />
        )}

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {data.plot || "No plot available"}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Detail;
