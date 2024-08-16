import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingSpinner = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-75 z-50">
      <CircularProgress color="inherit" />
    </div>
  );
};

export default LoadingSpinner;
