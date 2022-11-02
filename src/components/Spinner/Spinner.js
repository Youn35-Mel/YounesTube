import React, { useEffect } from "react";
import { Circles } from "react-loader-spinner";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Spinner = ({ msg, progress }) => {
  useEffect(() => {}, [progress]);

  return (
    <div>
      <Circles color="orange" />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" />
        </Box>
        <Box sx={{ minWidth: 35 }}></Box>
      </Box>{" "}
    </div>
  );
};

export default Spinner;
