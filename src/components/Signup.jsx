import React, { useEffect, useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import useAuthStore from "../Authentication/AuthStore";
import { doCreateUserWithEmailAndPassword } from "../config/Auth";
// import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { Alert, Button } from "@mui/material";
import SimpleBackdrop from "../Backdrop/SimpleBackdrop";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [noMatch, setNoMatch] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");

  const {
    userLoggedIn,
    currentUser,
    setUserLoggedIn,
    setCurrentUser,
    isEmailUser,
    setIsEmailUser,
  } = useAuthStore();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setNoMatch(true);
      return;
    }
    if (!isRegistering) {
      setNoMatch(false);
      setIsRegistering(true);
      setUserLoggedIn(true);
      setCurrentUser({ email, password });
      setIsEmailUser(true);

      await doCreateUserWithEmailAndPassword(email, password);
    }
  };

  useEffect(() => {
    if (noMatch) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      // Cleanup the timer if the component unmounts or if `noMatch` changes
      return () => clearTimeout(timer);
    }
  }, [noMatch]);

  const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "#A0AAB4",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#B2BAC2",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#E0E3E7",
      },
      "&:hover fieldset": {
        borderColor: "#B2BAC2",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#6F7E8C",
      },
    },
  });

  console.log("isEmailUser: ", isEmailUser);
  console.log("user: ", currentUser);

  return (
    <>
      {userLoggedIn && <Navigate to={"/"} replace={true} />}
      {isRegistering && <SimpleBackdrop isOpen={isRegistering} />}

      {isEmailUser ? (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16">
          <div className="max-w-md mx-auto bg-[#fff9f0] p-8 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-center text-[#724e2d]">
              You have already created an account
            </h1>
            <div className="mt-6 text-center">
              <Link
                to={"/login"}
                className="text-[#b86944] underline hover:text-[#8B4513] text-lg font-semibold"
              >
                Login
              </Link>
            </div>
            <div className="mt-6 text-center">
              <Link
                to="/"
                className="text-[#b86944] underline hover:text-[#8B4513] text-lg font-semibold"
              >
                Go to Homepage
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-full p-6 rounded-lg max-w-screen-tabletPortrait">
              <h1 className="my-3 text-6xl text-center pb-7">Account</h1>
              <h2 className="py-5 pl-4 my-4 text-5xl border shadow-sm border-slate-100">
                Sign Up
              </h2>
              <form
                action=""
                onSubmit={onSubmit}
                className="flex flex-col p-4 mb-8 shadow-xl"
              >
                {showAlert && (
                  <Alert severity="error">
                    Password should match to confirm password
                  </Alert>
                )}
                <label htmlFor="username" className="mt-3 mb-7">
                  <TextField
                    id="email"
                    type="email"
                    label="Email"
                    variant="standard"
                    fullWidth
                    required
                    disabled={isRegistering}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <label htmlFor="password" className="mb-8">
                  <TextField
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    fullWidth
                    disabled={isRegistering}
                    autoComplete="current-password"
                    variant="standard"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                <label htmlFor="password" className="mb-8">
                  <TextField
                    id="standard-password-input"
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    autoComplete="current-password"
                    variant="standard"
                    required
                    disabled={isRegistering}
                    value={confirmPassword}
                    onChange={(e) => setconfirmPassword(e.target.value)}
                  />
                </label>
                <div className="flex items-center justify-center mb-5">
                  <div className="w-full max-w-xs">
                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      disabled={isRegistering}
                      loading={isRegistering}
                      style={{
                        backgroundColor: `${
                          !isRegistering ? "#0F0F0F" : "#D3D3D3"
                        }`,
                      }}
                      type="submit"
                    >
                      {isRegistering ? "Signing Up..." : "Sign Up"}
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-center px-6 mt-2 mb-5">
                  <span className="mr-1 -mt-0.5">Already have an account</span>
                  <div className="mx-1 text-yellow-600 underline hover:text-yellow-800">
                    <Link to="/login" variant="body2">
                      Continue
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Signup;
