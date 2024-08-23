import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { Alert, Button } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import useAuthStore from "../Authentication/AuthStore";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
  handleRedirectResult,
} from "../config/Auth";
import SimpleBackdrop from "../Backdrop/SimpleBackdrop";

function Login() {
  const { userLoggedIn, setUserLoggedIn, isEmailUser, currentUser } =
    useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    handleRedirectResult();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!isSigningIn) {
      setIsSigningIn(true);

      try {
        const user = await doSignInWithEmailAndPassword(email, password);
        setErrorMessage("");
        setShowAlert(false);
      } catch (error) {
        console.error("Error in signing in: ", error.message);
        setUserLoggedIn(false);
        setShowAlert(true);
        setErrorMessage(error.message);
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  const onGoogleSignIn = (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle().catch((err) => {
        setIsSigningIn(false);
      });
    }
  };

  useEffect(() => {
    if (errorMessage) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

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

  return (
    <>
      {isSigningIn && <SimpleBackdrop isOpen={isSigningIn} />}
      <div className="flex items-center justify-center min-h-screen">
        {userLoggedIn && <Navigate to={"/"} replace={true} />}
        <div className="w-full p-6 rounded-lg max-w-screen-tabletPortrait">
          <h1 className="pb-3 text-6xl text-center">Account</h1>
          <h2 className="py-5 pl-4 my-3 text-5xl border shadow-md rounded-xl border-slate-100">
            Login
          </h2>
          <form
            action=""
            onSubmit={onSubmit}
            className="flex flex-col p-4 mb-8 shadow-xl rounded-xl"
          >
            {showAlert && (
              <Alert severity="error">Incorrect Email or Password</Alert>
            )}
            <label htmlFor="username" className="mt-3 mb-4">
              <TextField
                id="email"
                type="email"
                label="Email"
                variant="standard"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label htmlFor="password" className="mb-5">
              <TextField
                id="standard-password-input"
                label="Password"
                type="password"
                fullWidth
                autoComplete="current-password"
                variant="standard"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <div className="flex justify-between px-4 mb-3">
              <label htmlFor="rememberme" className="flex items-center -mt-2">
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="Remember me"
                  className="text-sm"
                />
              </label>
              <Link
                to="/"
                className="text-yellow-600 underline hover:text-yellow-800"
              >
                Forgot password
              </Link>
            </div>
            <div className="flex items-center justify-center mb-3">
              <div className="w-full max-w-xs">
                <Button
                  variant="contained"
                  fullWidth
                  disabled={isSigningIn}
                  size="large"
                  loading={isSigningIn}
                  loadingIndicator="Loading…"
                  style={{
                    backgroundColor: `${!isSigningIn ? "#0F0F0F" : "#D3D3D3"}`,
                  }}
                  type="submit"
                >
                  {isSigningIn ? "Logging In..." : "Login"}
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center px-6 mt-1 mb-3">
              <span className="mr-1 -mt-0.5">Don't have an account</span>
              <Link
                className="mx-1 text-yellow-600 hover:text-yellow-800 hover:underline"
                to="/signup"
                variant="body2"
              >
                Sign Up
              </Link>
            </div>
            <div className="flex flex-row w-full text-center">
              <div className="w-full mb-2 mr-2 border-b-2"></div>
              <div className="text-sm font-bold w-fit">OR</div>
              <div className="border-b-2 mb-2.5 ml-2 w-full"></div>
            </div>
            <div className="my-3">
              <button
                disabled={isSigningIn}
                onClick={(e) => {
                  onGoogleSignIn(e);
                }}
                className={`w-full flex items-center text-base bg-slate-50 justify-center gap-x-3 py-2.5 border rounded-lg  font-medium  ${
                  isSigningIn
                    ? "cursor-not-allowed"
                    : "hover:bg-gray-200 transition duration-300 active:bg-gray-200"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_17_40)">
                    <path
                      d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                      fill="#34A853"
                    />
                    <path
                      d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                      fill="#FBBC04"
                    />
                    <path
                      d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                      fill="#EA4335"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_17_40">
                      <rect width="48" height="48" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                {isSigningIn ? "Signing In..." : "Continue with Google"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
