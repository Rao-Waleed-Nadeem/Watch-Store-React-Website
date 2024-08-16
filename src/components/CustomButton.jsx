import React from "react";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/system";

const useStyles = makeStyles({
  customButton: {
    backgroundColor: "#0F0703",
    color: "white",
    transition: "background-color 300ms, color 300ms",
    "&:hover": {
      backgroundColor: "white",
      color: "#0F0703",
    },
  },
});

function CustomButton() {
  const classes = useStyles();

  return (
    <Button type="submit" variant="contained" className={classes.customButton}>
      View Product
    </Button>
  );
}

export default CustomButton;
