import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { doSignOut } from "../config/Auth";
import useAuthStore from "../Authentication/AuthStore";
import { useNavigate } from "react-router-dom";
import { red } from "@mui/material/colors";

export default function DialogOpen({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { email, displayName, photoURL } = useAuthStore();
  const { isGoogleUser } = useAuthStore.getState();
  console.log("email: ", email);
  console.log("displayName: ", displayName);
  console.log("photoURL: ", photoURL);
  const handleLogout = () => {
    doSignOut().then(() => {
      navigate("/login");
    });
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
            borderRadius: ".5rem",
          },
        }}
      >
        {isGoogleUser && (
          <div className="flex items-center mx-6 mt-3 mb-3 space-x-4 phone:mb-0">
            <img
              src={photoURL}
              alt="User Avatar"
              className="w-16 h-16 mt-2 rounded-full shadow-lg phone:mt-0 phone:w-11 phone:h-11"
            />
            <div>
              <p className="text-lg font-semibold text-gray-700">
                {displayName}
              </p>
              <p className="text-sm text-gray-500">{email}</p>
            </div>
          </div>
        )}
        <DialogTitle
          id="alert-dialog-title"
          className="text-lg font-bold text-center text-gray-800"
        >
          {"Do you want to log out?"}
        </DialogTitle>
        <DialogContent className=" phone:h-12">
          <DialogContentText
            id="alert-dialog-description"
            className="text-sm text-gray-600"
          >
            By logging out, you will be signed out from your account and
            couldn't buy things.
          </DialogContentText>
        </DialogContent>
        <DialogActions className="flex justify-center mb-4">
          <Button
            onClick={onClose}
            className="text-gray-500"
            style={{ color: "red" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleLogout}
            className="text-white bg-red-500 hover:bg-red-600"
            autoFocus
          >
            Log Out
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
