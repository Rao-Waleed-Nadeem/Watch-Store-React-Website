import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";

export default function ContactDialog({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
  };

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiPaper-root": {
            borderRadius: ".5rem", // Equivalent to `rounded-xl` in Tailwind CSS
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {"Please Sign In to Contact us"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You have to sign in or create account to contact us. We will take
            necessary information to conduct meaningful survays and collect
            information
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            style={{
              color: "red",
            }}
          >
            Cancel
          </Button>
          <Button onClick={() => navigate("/login")} autoFocus>
            Sign In
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
