import AppContent from "@/components/AppContent";
import { Box } from "@mui/material";
import React from "react";
import AppSidebar from "../components/AppSidebar";

const DefaultLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <AppSidebar />
      <Box
        className="mt-[60px] overflow-hidden"
        component="main"
        sx={{ flexGrow: 1 }}
      >
        <AppContent />
      </Box>
    </Box>
  );
};
export default DefaultLayout;
