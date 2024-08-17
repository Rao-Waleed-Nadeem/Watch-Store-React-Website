import React, { useEffect, useReducer, useState } from "react";
// import BillingReducers from "./BillingReducers";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
// import unirest from "unirest";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./Cart.css"; // Make sure this file contains CSS for transitions
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import useAuthStore from "../Authentication/AuthStore";

export default function OrderStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [isNext, setIsNext] = useState(true);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [address, setAddress] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [states, setStates] = useState([]);
  const [state, setState] = useState("");
  const [cities, setCitites] = useState([]);
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [authToken, setAuthToken] = useState(null);

  const { userLoggedIn } = useAuthStore();

  useEffect(() => {
    const fetchData = () => {
      fetch("https://www.universal-tutorial.com/api/getaccesstoken", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "api-token":
            "Njl3bsqrDkfOe_Lk4SRUveGNV2g7Kndm5CEbo6M948EG6oflbW6QI33kbVTFmTjDNKw",
          "user-email": "waleedhafiz702@gmail.com",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log("Response:", data);
          setAuthToken(data.auth_token);
        })
        .catch((error) => console.log("Error:", error));
    };
    fetchData();
  }, [setAuthToken, authToken]);

  useEffect(() => {
    const fetchData = () => {
      fetch("https://www.universal-tutorial.com/api/countries/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setCountries(data);
        })
        .catch((error) => console.error("Error:", error));
    };
    fetchData();
  }, [setCountries, countries]);

  const initialBillingAddress = {
    fname: "",
    lname: "",
    address: "",
    country: "",
    state: "",
    city: "",
    zip: "",
    phone: "",
  };

  function billingReducers(billingAddress, action) {
    switch (action.type) {
      case "SET_BILLING_ADDRESS": {
        return {
          ...billingAddress,
          fname: action.fname,
          lname: action.lname,
          address: action.address,
          country: action.country,
          state: action.state,
          city: action.city,
          zip: action.zip,
          phone: action.phone,
        };
      }
      case "SET_fname": {
        return {
          ...billingAddress,
          fname: action.fname,
        };
      }
      case "SET_lname": {
        return {
          ...billingAddress,
          lname: action.lname,
        };
      }
      case "SET_address": {
        return {
          ...billingAddress,
          address: action.address,
        };
      }
      case "SET_country": {
        return {
          ...billingAddress,
          country: action.country,
        };
      }
      case "SET_state": {
        return {
          ...billingAddress,
          state: action.state,
        };
      }
      case "SET_city": {
        return {
          ...billingAddress,
          city: action.city,
        };
      }
      case "SET_zip": {
        return {
          ...billingAddress,
          zip: action.zip,
        };
      }
      case "SET_phone": {
        return {
          ...billingAddress,
          phone: action.phone,
        };
      }
      default:
        return billingAddress;
    }
  }

  const [billingAddress, dispatch] = useReducer(
    billingReducers,
    initialBillingAddress
  );

  const steps = [
    "Contact Information",
    "Shipping Address",
    "Billing Address",
    "Shipping Options",
    "Payment Options",
  ];

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setCountry(selectedCountry);
    dispatch({ type: "SET_country", country: selectedCountry });
    fetch(`https://www.universal-tutorial.com/api/states/${selectedCountry}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setStates(data);
        // console.log("Country: ", selectedCountry);
        // console.log("States: ", data);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleBillCountryChange = (event) => {
    dispatch({ type: "SET_country", country: event.target.value });
    fetch(
      `https://www.universal-tutorial.com/api/states/${event.target.value}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setStates(data);
        // console.log("Country: ", selectedCountry);
        // console.log("States: ", data);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setState(selectedState);
    dispatch({ type: "SET_state", state: selectedState });

    fetch(`https://www.universal-tutorial.com/api/cities/${selectedState}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCitites(data);
        // console.log("Country: ", selectedState);
        // console.log("States: ", data);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleBillStateChange = (event) => {
    const selectedState = event.target.value;
    dispatch({ type: "SET_state", state: selectedState });

    fetch(`https://www.universal-tutorial.com/api/cities/${selectedState}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCitites(data);
        // console.log("Country: ", selectedState);
        // console.log("States: ", data);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setCity(selectedCity);
    dispatch({ type: "SET_city", city: selectedCity });
  };

  const handleBillCityChange = (event) => {
    const selectedCity = event.target.value;
    dispatch({ type: "SET_city", city: selectedCity });
  };

  console.log("countries: ", countries);

  // useEffect(() => {
  //   if (authToken) {
  //     // console.log("auth_token: ", authToken);

  //     fetch(`https://www.universal-tutorial.com/api/states/${country}`, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${authToken}`,
  //         Accept: "application/json",
  //       },
  //     })
  //       .then((response) => console.log("response: ", response))
  //       .then((data) => {
  //         setStates(data);
  //         console.log("country: ", country);
  //         console.log("States: ", data);
  //       })
  //       .catch((error) => console.error("Error:", error));
  //   }
  // }, [authToken]);

  // Njl3bsqrDkfOe_Lk4SRUveGNV2g7Kndm5CEbo6M948EG6oflbW6QI33kbVTFmTjDNKw;

  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7I…g1NH0.WPIrbEkntIUMO_9wrzQd_DMY1FYBaD-A93CyE84p_Gk

  // const selectArray = [];

  const stepContents = [
    <div className="flex flex-col px-5 py-10 space-y-6 step-content">
      <h3 className="text-3xl">Contact Information</h3>
      <p>
        We'll use this email to send you details and updates about your order.
      </p>
      <TextField
        fullWidth
        id="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={emailError}
        helperText={emailError}
        type="email"
        label={`${emailError !== "" ? "Invalid Email" : "Email"}`}
        variant="outlined"
      />
    </div>,
    <div className="flex flex-col px-5 py-10 space-y-6 step-content">
      <h3 className="text-3xl">Shipping address</h3>
      <p>Enter the address where you want your order delivered.</p>
      <div className="flex w-full space-x-4">
        <TextField
          fullWidth
          id="first-name"
          label="First Name"
          required
          value={fname}
          onChange={(e) => {
            setFname(e.target.value);
            dispatch({ type: "SET_fname", fname: e.target.value });
            console.log("fname: ", fname);
          }}
          variant="outlined"
        />
        <TextField
          fullWidth
          id="last-name"
          value={lname}
          onChange={(e) => {
            setLname(e.target.value);
            dispatch({ type: "SET_lname", lname: e.target.value });
          }}
          label="Last Name"
          variant="outlined"
        />
      </div>
      <TextField
        fullWidth
        id="address"
        label="Address"
        required
        value={address}
        onChange={(e) => {
          setAddress(e.target.value);
          dispatch({ type: "SET_Address", address: e.target.value });
        }}
        variant="outlined"
      />
      <FormControl fullWidth sx={{ m: 1, minWidth: 120 }} size="medium">
        <InputLabel id="">Country</InputLabel>
        {
          <Select
            labelId="country"
            id="country"
            value={country}
            label="Country"
            onChange={handleCountryChange}
            fullWidth
          >
            {/* <MenuItem value="">
              <em>None</em>
            </MenuItem> */}
            {countries.map((singleCountry) => (
              <MenuItem
                key={singleCountry.country_short_name}
                value={singleCountry.country_name}
              >
                {singleCountry.country_name}
              </MenuItem>
            ))}
          </Select>
        }
      </FormControl>
      <div className="flex w-full space-x-4">
        <FormControl fullWidth sx={{ m: 1, minWidth: 120 }} size="medium">
          <InputLabel id="">State</InputLabel>
          <Select
            labelId="state"
            id="state"
            value={state}
            label="State"
            onChange={handleStateChange}
            fullWidth
          >
            {states.length === 0 && (
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
            )}
            {states.map((state) => (
              <MenuItem value={state.state_name}>{state.state_name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ m: 1, minWidth: 120 }} size="medium">
          <InputLabel id="">City</InputLabel>
          <Select
            labelId="city"
            id="city"
            value={city}
            label="City"
            onChange={handleCityChange}
            fullWidth
          >
            {cities.length === 0 && (
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
            )}
            {cities.map((city) => (
              <MenuItem value={city.city_name}>{city.city_name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="flex w-full space-x-4">
        <TextField
          fullWidth
          type="number"
          id="zip-code"
          required
          value={zip}
          onChange={(e) => {
            setZip(e.target.value);
            dispatch({ type: "SET_zip", zip: e.target.value });
          }}
          label="Zip Code"
          variant="outlined"
        />
        <TextField
          fullWidth
          type="number"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            dispatch({ type: "SET_phone", phone: e.target.value });
          }}
          id="phone"
          label="Phone(Optional)"
          variant="outlined"
        />
      </div>
    </div>,
    <div className="flex flex-col px-5 py-10 space-y-6 step-content">
      <h3 className="text-3xl">Billing address</h3>
      <p>Enter the billing address that matches your payment method.</p>
      <div className="flex w-full space-x-4">
        <TextField
          fullWidth
          id="outlined-basic"
          label="First Name"
          value={billingAddress.fname}
          onChange={(e) =>
            dispatch({ type: "SET_fname", fname: e.target.value })
          }
          variant="outlined"
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="Last Name"
          value={billingAddress.lname}
          onChange={(e) =>
            dispatch({ type: "SET_lname", lname: e.target.value })
          }
          variant="outlined"
        />
      </div>
      <TextField
        fullWidth
        id="outlined-basic"
        label="Address"
        value={billingAddress.address}
        onChange={(e) =>
          dispatch({ type: "SET_address", address: e.target.value })
        }
        variant="outlined"
      />
      {/* <TextField
        fullWidth
        id="outlined-basic"
        label="Apartment, suite, etc. (optional)"
        variant="outlined"
      /> */}
      <FormControl fullWidth sx={{ m: 1, minWidth: 120 }} size="medium">
        <InputLabel id="">Country</InputLabel>
        {
          <Select
            labelId="country"
            id="country"
            value={billingAddress.country}
            label="Country"
            onChange={handleBillCountryChange}
            fullWidth
          >
            {/* <MenuItem value="">
              <em>None</em>
            </MenuItem> */}
            {countries.map((singleCountry) => (
              <MenuItem
                key={singleCountry.country_short_name}
                value={singleCountry.country_name}
              >
                {singleCountry.country_name}
              </MenuItem>
            ))}
          </Select>
        }
      </FormControl>
      <div className="flex w-full space-x-4">
        <FormControl fullWidth sx={{ m: 1, minWidth: 120 }} size="medium">
          <InputLabel id="">State</InputLabel>
          <Select
            labelId="state"
            id="state"
            value={billingAddress.state}
            label="State"
            onChange={handleBillStateChange}
            fullWidth
          >
            {states.length === 0 && (
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
            )}
            {states.map((state) => (
              <MenuItem value={state.state_name}>{state.state_name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ m: 1, minWidth: 120 }} size="medium">
          <InputLabel id="">City</InputLabel>
          <Select
            labelId="city"
            id="city"
            value={billingAddress.city}
            label="City"
            onChange={handleBillCityChange}
            fullWidth
          >
            {cities.length === 0 && (
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
            )}
            {cities.map((city) => (
              <MenuItem value={city.city_name}>{city.city_name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="flex w-full space-x-4">
        <TextField
          fullWidth
          id="zip-code"
          required
          value={billingAddress.zip}
          onChange={(e) => dispatch({ type: "SET_zip", zip: e.target.value })}
          label="Zip Code"
          variant="outlined"
        />
        <TextField
          fullWidth
          id="phone"
          value={billingAddress.phone}
          onChange={(e) =>
            dispatch({ type: "SET_phone", phone: e.target.value })
          }
          label="Phone(Optional)"
          variant="outlined"
        />
      </div>
    </div>,
    <div className="flex flex-col px-5 py-10 space-y-6 step-content">
      <h3 className="text-3xl">Shipping options</h3>
      <p>Free shipping</p>
    </div>,
    <div className="flex flex-col px-5 py-10 space-y-6 step-content">
      <div className="w-full px-4 py-4 border border-black rounded-md">
        <h4 className="text-2xl font-semibold">Payment Options</h4>
        <p>
          Please send a check to Store Name, Store Street, Store Town, Store
          State / County, Store Postcode.
        </p>
      </div>
      <p>
        By proceeding with your purchase you agree to our Terms and Conditions
        and Privacy Policy
      </p>
    </div>,
  ];

  const validateEmail = (email) => {
    // Basic HTML5 validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  useEffect(() => {}, [
    setFname,
    setAddress,
    setCountry,
    setState,
    setCity,
    setZip,
  ]);

  // const handleFirstName = (e) => {};

  const handleSubmitAddress = (e) => {
    if (
      fname === "" ||
      address === "" ||
      country === "" ||
      state === "" ||
      city === "" ||
      zip === ""
    ) {
      // console.log("fname: ", fname);
      // console.log("address: ", address);
      // console.log("country: ", country);
      // console.log("state: ", state);
      // console.log("city: ", city);
      // console.log("zip: ", zip);
      return false;
    }
    dispatch({
      type: "SET_BILLING_ADDRESS",
      fname,
      lname,
      address,
      country,
      state,
      city,
      zip,
      phone,
    });
    if (e) e.preventDefault();
  };

  const handleSubmitEmail = (e) => {
    if (email === "") return false;
    if (e) e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }
    setEmailError("");
    return true;
  };
  const submitArray = [handleSubmitEmail, handleSubmitAddress];

  const handleNext = () => {
    if (activeStep === 0) {
      if (!handleSubmitEmail()) return;
    }

    if (activeStep < steps.length - 1) {
      setIsNext(true);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setIsNext(false);
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  const handleFinish = () => {
    // Redirect to the home page
    window.location.href = "/thankyou";
  };

  const isStepOneValid = () => {
    return (
      fname !== "" &&
      address !== "" &&
      country !== "" &&
      state !== "" &&
      city !== "" &&
      zip !== ""
    );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-auto space-y-9">
      {userLoggedIn ? (
        <>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <form className="w-full" onSubmit={submitArray[activeStep]}>
            <div className="w-full h-auto">
              <TransitionGroup>
                <CSSTransition
                  key={activeStep}
                  timeout={300}
                  classNames={isNext ? "fade" : "fade-back"}
                >
                  {stepContents[activeStep]}
                </CSSTransition>
              </TransitionGroup>
            </div>
            <div className="flex justify-between w-full px-5 mt-5 ">
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                className="mr-1"
              >
                Back
              </Button>
              <div className="flex-grow" />
              <Button
                onClick={
                  activeStep === steps.length - 1 ? handleFinish : handleNext
                }
                // type="submit"
                disabled={
                  activeStep === 0
                    ? emailError !== "" || email === ""
                    : activeStep === 1
                    ? !isStepOneValid()
                    : false
                }
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </form>
        </>
      ) : (
        <div className="flex items-center justify-center pt-48 text-3xl italic font-medium">
          <span>Sign In for order checking</span>
        </div>
      )}
    </div>
  );
}
