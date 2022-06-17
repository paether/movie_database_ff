import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
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
      sx={{ width: "calc(100% - 30px)", margin: "10px 0" }}
      style={{
        ...provided.draggableProps.style,
        background: snapshot.isDragging
          ? "rgba(245,245,245, 0.25)"
          : "rgba(245,245,245, 0.75)",
      }}
    >
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

        <Typography variant="h5" component="div">
          {item.titleText.text}
        </Typography>
        <Typography color="text.secondary">
          {item.releaseYear ? item.releaseYear.year : "Release year unknown"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => navigate("/" + item.id)} size="small">
          More details
        </Button>
        {type === "toWatch" && (
          <Button onClick={onClickDelete} size="small">
            delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default MovieCard;
