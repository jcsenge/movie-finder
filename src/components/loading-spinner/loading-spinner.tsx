import { Box } from "@mui/material";
import Lottie from "lottie-react";
import React, { FC } from "react";
import movieLoader from "../../../src/resources/lottie-files/movieLoader.json";

const style = { height: 250 };

export const LoadingSpinner: FC = () => {
  return (
    <Box marginY={8}>
      <Lottie style={style} loop={true} animationData={movieLoader} />
    </Box>
  );
};
