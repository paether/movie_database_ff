import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function InformationCard({ information }) {
  const navigate = useNavigate();

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
          padding: "20px",
          textAlign: "center",
          fontWeight: "700",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ErrorOutlineIcon />
        {information}
      </Box>
    </Box>
  );
}
