import { Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContactDialog from "./ContactDialog";
import useAuthStore from "../Authentication/AuthStore";

function Contact() {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuthStore();
  const [email, setEmail] = useState("");
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [name, setName] = useState("");
  const [nameEmpty, setNameEmpty] = useState(false);
  const [message, setMessage] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [openDialog, setOpenDialog] = useState(!userLoggedIn);
  // useEffect(() => {}, [name, email, message, setName, setEmail, setMessage]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userLoggedIn) {
      setOpenDialog(true);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (name === "") {
      setNameEmpty(true);
      return;
    }
    if (email === "") {
      setEmailEmpty(true);
      return;
    }
    setNameEmpty(false);
    setEmailEmpty(false);
    if (!emailRegex.test(email)) {
      setEmailInvalid(true);
      return;
    }
    setEmailInvalid(false);
    navigate(`/contactmessage/${name}`);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // const CssTextField = styled(TextField)({
  // "& label.Mui-focused": {
  //   color: "#6F7E8C",
  // },
  // "& .MuiInput-underline:after": {
  //   borderBottomColor: "#4D5B69",
  // },
  // "& .MuiOutlinedInput-root": {
  //   "& fieldset": {
  //     borderColor: "#A0AAB4",
  // },
  //     "&:hover fieldset": {
  //       borderColor: "#6F7E8C",
  //     },
  //     "&.Mui-focused fieldset": {
  //       borderColor: "#3B4754",
  //     },
  //     "&.Mui-focused .MuiInputBase-input": {
  //       // Ensures input text stays visible during focus
  //       color: "#000",
  //     },
  //   },
  //   "& .MuiInputBase-input": {
  //     // Ensures consistent input text visibility
  //     color: "#000",
  //   },
  // });

  return (
    <div className="flex flex-col items-center justify-center ">
      <ContactDialog isOpen={openDialog} onClose={handleCloseDialog} />

      <div className="mt-12 tabletLandscape:w-1/2 phone:w-auto phone:mx-9">
        <h1 className="text-6xl text-center mb-11 text-stone-800">Contact</h1>
        <p className="mb-6 text-justify text-stone-800">
          We value open communication with our customers and are here to assist
          you every step of the way. Feel free to reach out to us through our
          contact form or email, and our dedicated customer support team will
          promptly address any inquiries, concerns, or feedback you may have,
          ensuring that your experience with us is nothing short of exceptional.
          We look forward to hearing from you.
        </p>
        <form onSubmit={handleSubmit} action="">
          <div className="flex space-x-20 mb-11">
            <TextField
              id="Name"
              label="Name"
              variant="standard"
              required
              error={nameEmpty}
              value={name}
              helperText={`${nameEmpty ? "Please Enter Name" : ""}`}
              onChange={handleNameChange}
              fullWidth
            />
            <TextField
              id="Email"
              label={`${
                emailInvalid
                  ? "Invalid Email"
                  : emailEmpty
                  ? "Email cannot be empty"
                  : "Email"
              }`}
              variant="standard"
              required
              helperText={`${
                emailEmpty
                  ? "Please Enter Email"
                  : emailInvalid
                  ? "Invalid Email! Please Enter Correct Email"
                  : ""
              }`}
              type="email"
              error={emailEmpty || emailInvalid}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          </div>
          <TextField
            id="Message"
            label="Message"
            variant="outlined"
            multiline
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={7}
            className="w-full mt-4"
          />
          <div className="py-2 pb-5 my-8 mb-12">
            <Button
              type="submit"
              variant="contained"
              style={{ backgroundColor: "#0F0703" }}
            >
              CONTACT US
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
