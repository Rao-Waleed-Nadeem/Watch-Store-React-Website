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

export default function DialogOpen({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { email, displayName, photoURL } = useAuthStore();

  const handleLogout = () => {
    // setUserLoggedIn(false);
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
      >
        {email && (
          <div className="mx-6 mt-3 mb-3 flex items-center space-x-4">
            <img
              src={photoURL}
              alt="User Avatar"
              className="w-16 mt-2 h-16 rounded-full shadow-lg"
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
          className="text-center font-bold text-lg text-gray-800"
        >
          {"Do you want to log out?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            className="text-gray-600 text-sm"
          >
            By logging out, you will be signed out from your account and will
            need to log in again to continue using our services.
          </DialogContentText>
        </DialogContent>
        <DialogActions className="flex justify-center mb-4">
          <Button onClick={onClose} className="text-gray-500">
            Cancel
          </Button>
          <Button
            onClick={handleLogout}
            className="bg-red-500 text-white hover:bg-red-600"
            autoFocus
          >
            Log Out
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
