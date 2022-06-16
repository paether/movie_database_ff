import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate, Link } from "react-router-dom";

const MovieCard = ({
  provided,
  titleText,
  type,
  releaseYear,
  onClickDelete,
  index,
  id,
}) => {
  const navigate = useNavigate();
  return (
    <Card
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      sx={{ minWidth: 275 }}
    >
      <CardContent>
        {type === "toWatch" && (
          <Typography variant="h5" component="div">
            {index + 1}
          </Typography>
        )}

        <Typography variant="h5" component="div">
          {titleText}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {releaseYear}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Link to={id}>More details </Link> */}
        <Button onClick={() => navigate("/" + id)} size="small">
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
