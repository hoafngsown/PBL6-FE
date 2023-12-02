import { Box, Typography } from "@mui/material";
import React from "react";

const Error403 = () => {
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
          403
        </Typography>
        <Typography variant="h4" style={{ color: "black" }}>
          You do not have permission to access this page
        </Typography>
      </div>
    </Box>
  );
};

export default Error403;
