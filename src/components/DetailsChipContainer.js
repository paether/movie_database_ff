import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function DetailChipsContainer({ header, children }) {
  return (
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
          {header}
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
          {children}
        </Box>
      </Box>
    </>
  );
}
