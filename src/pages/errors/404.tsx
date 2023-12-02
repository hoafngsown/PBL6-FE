import { Box, Typography } from "@mui/material";
import React from "react";

const Error404 = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div>
        <Typography
          sx={{ textAlign: "center" }}
          variant="h1"
          style={{ color: "black" }}
        >
          404
        </Typography>
        <Typography variant="h4" style={{ color: "black" }}>
          The page you are looking for was not found.
        </Typography>
      </div>
    </Box>
  );
};

export default Error404;
