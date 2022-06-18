import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TheatersIcon from "@mui/icons-material/Theaters";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MediaQuery from "react-responsive";
import { useNavigate } from "react-router-dom";

const MovieCard = ({
  provided,
  type,
  onClickDelete,
  index,
  item,
  snapshot,
}) => {
  const navigate = useNavigate();

  return (
    <Card
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "calc(100% - 30px)",
        margin: "10px 0",
      }}
      style={{
        ...provided.draggableProps.style,
        background: snapshot.isDragging
          ? "rgba(245,245,245, 0.25)"
          : "rgba(245,245,245, 0.75)",
      }}
    >
      <Box>
        <CardContent sx={{ padding: "10px" }}>
          {type === "toWatch" && (
            <Typography
              variant="h6"
              component="span"
              sx={{
                backgroundColor: "#00414c",
                color: "white",
                padding: "5px",
                borderRadius: "5px",
              }}
            >
              {index + 1}
            </Typography>
          )}

          <Typography sx={{ fontSize: { xs: "1rem", sm: "1.2rem" } }}>
            {item.titleText.text}
          </Typography>
          <Typography color="text.secondary">
            {item.releaseYear ? item.releaseYear.year : "Release year unknown"}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => navigate("/" + item.id)}
            size="small"
            sx={{
              padding: "0px",
            }}
          >
            Details
          </Button>
          {type === "toWatch" && (
            <Button onClick={onClickDelete} size="small">
              delete
            </Button>
          )}
        </CardActions>
      </Box>
      <Box sx={{ marginLeft: "auto", alignSelf: "stretch" }}>
        <MediaQuery minWidth={900}>
          {item.primaryImage ? (
            <Box
              component="img"
              sx={{
                width: 100,
                height: "100%",
                borderRadius: "10px",
                padding: "5px",
              }}
              alt="The house from the offer."
              src={item.primaryImage.url}
            />
          ) : (
            <TheatersIcon sx={{ fontSize: "100px" }} />
          )}
        </MediaQuery>
      </Box>
    </Card>
  );
};

export default MovieCard;
