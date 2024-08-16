import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";

function NewsPage() {
  const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "#6F7E8C", // Darker version of #A0AAB4
    },
    "& .MuiFilledInput-underline:after": {
      borderBottomColor: "#1A0F08", // Custom color for underline when focused
    },
    "& .MuiFilledInput-root": {
      "& fieldset": {
        borderColor: "#A0AAB4", // Darker version of #E0E3E7
      },
      "&:hover fieldset": {
        borderColor: "#6F7E8C", // Darker version of #B2BAC2
      },
      "&.Mui-focused fieldset": {
        borderColor: "#0F0F0F", // Custom color for fieldset when focused
      },
    },
  });
  return (
    <div className="relative w-full max-h-full">
      <div className="relative w-full max-h-full bg-black">
        <img
          src="news1.jpg"
          className="object-cover w-full h-full opacity-50"
          alt="news"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-center text-white phone:text-3xl tabletLandscape:text-6xl">
            Sports Watches: Functionality and Style for the Active Gentleman
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-center p-4 phone:mt-7 tabletLandscape:flex tabletLandscape:flex-col tabletLandscape:justify-center tabletLandscape:items-center phone:mx-7 tabletLandscape:mx-0">
        <div className="tabletLandscape:w-1/2">
          <p>
            For the active gentleman who enjoys sports, fitness, and adventure,
            a sports watch is more than just a timekeeping device; it’s a
            reliable companion that combines functionality with style. Designed
            to withstand the rigors of physical activities, sports watches offer
            a range of features and robust construction that make them the
            perfect choice for athletes, outdoor enthusiasts, and those with an
            active lifestyle. In this blog post, we will explore the world of
            sports watches, highlighting their exceptional functionality and
            stylish design elements that cater to the needs of the modern active
            gentleman.
          </p>
          <h5 className="text-xl phone:my-7">
            DURABILITY AND WATER RESISTANCE
          </h5>
          <div className="flex tabletLandscape:space-x-20 phone:flex-col tabletLandscape:flex-row">
            <div className="flex flex-col">
              <p>
                Sports watches are built to endure tough conditions, making
                durability a key feature. Look for watches with rugged cases
                made from materials like stainless steel, titanium, or
                high-grade polymers that can withstand impacts and resist
                scratches. Additionally, water resistance is crucial for
                water-based activities. Choose a sports watch with a suitable
                water resistance rating to ensure it can handle swimming,
                diving, or other water sports. Look for watches with rugged
                cases made from materials like stainless steel, titanium, or
                high-grade polymers that can withstand impacts and resist
                scratches.
              </p>
            </div>
            <img
              src="../images/newspage1.png"
              alt="newspage"
              className="bg-cover w-80 h-96 phone:my-8 tabletLandscape:my-0 tabletLandscape:mb-10"
            />
          </div>
          <div className="flex flex-col space-y-7">
            <h4 className="text-2xl ">ADVANCED TIMEKEEPING FEATURES</h4>
            <p>
              Sports watches often offer advanced timekeeping features to
              enhance functionality. Some popular features include:
            </p>
            <h6 className="text-xl font-semibold">DREMOGRAPH</h6>
            <p>
              A chronograph function allows you to measure elapsed time with
              stopwatch-like precision. It is particularly useful for timing
              workouts, runs, or races.
            </p>
            <h6 className="text-xl font-semibold">GPS</h6>
            <p>
              Built-in GPS tracking enables accurate distance and speed
              measurements, route mapping, and navigation. This feature is
              beneficial for outdoor activities like hiking, cycling, and
              running.
            </p>
            <h6 className="text-xl font-semibold">HEART RATE MONITORING</h6>
            <p>
              Many sports watches incorporate heart rate sensors to monitor your
              heart rate during workouts, providing valuable insights into your
              fitness level and helping you optimize your training.
            </p>
            <h6 className="text-xl font-semibold">
              FITNESS TRACKING AND ACTIVITY MONITORING
            </h6>
            <p>
              Sports watches are often equipped with fitness tracking and
              activity monitoring capabilities. They can track steps, calories
              burned, distance traveled, and even sleep patterns. These features
              enable you to set fitness goals, monitor progress, and maintain an
              active and healthy lifestyle.
            </p>
            <h6 className="text-xl font-semibold">
              SPECIALIZED SPORTS FEATURES
            </h6>
            <p>
              Depending on your preferred sports or activities, sports watches
              may offer specialized features tailored to specific needs:
            </p>
            <h6 className="text-xl font-semibold">ALTIMETER</h6>
            <p>
              An altimeter measures altitude, perfect for mountaineering,
              hiking, or any activity involving changes in elevation.
            </p>
            <h6 className="text-xl font-semibold">COMPASS</h6>
            <p>
              A compass function helps with navigation and orientation during
              outdoor adventures.
            </p>
            <h6 className="text-xl phone:font-semibold">LAP TIMERS</h6>
            <p>
              Lap timers allow you to record and analyze lap times, ideal for
              runners and swimmers who want to track their performance.
            </p>
            <h6 className="text-xl font-semibold">STYLE AND VERSTELAITY</h6>
            <p>
              Sports watches have evolved beyond their functional aspects and
              now offer a range of stylish designs suitable for everyday wear.
              Many brands offer sports watches that seamlessly transition from
              gym sessions to casual outings. Look for watches with versatile
              aesthetics, comfortable straps, and designs that align with your
              personal style.
            </p>
            <h6 className="text-xl font-semibold">CONCLUSION</h6>
            <p className="pb-10 mb-20">
              Sports watches are the ultimate companions for the active
              gentleman, providing a perfect blend of functionality and style.
              Whether you’re training for a marathon, exploring the great
              outdoors, or simply leading an active lifestyle, a sports watch
              offers the durability, features, and versatility you need. Embrace
              the power of sports watches, and let them be a symbol of your
              adventurous spirit, while keeping you on time and on track for
              success in both sports and style.
            </p>
            <div className="border-t-[1px] border-black phone:my-10  pb-10 "></div>
          </div>
          <div className="flex flex-col">
            <h4 className="text-3xl">LEAVE A COMMENT</h4>
            <p className="my-10" aria-required>
              Your email address will not be published. Required fields are
              marked *
            </p>
            <form action="" className="flex flex-col space-y-7">
              <div className="w-full comment">
                <CssTextField
                  id="comment"
                  fullWidth
                  required
                  label="Comment"
                  variant="filled"
                  multiline
                  style={{
                    borderColor: "#665500",
                  }}
                  rows={9}
                />
              </div>
              <div className="name">
                <CssTextField
                  id="name"
                  required
                  fullWidth
                  label="Name"
                  variant="filled"
                />
              </div>
              <div className="email">
                <CssTextField
                  id="email"
                  fullWidth
                  required
                  type="email"
                  label="Email"
                  variant="filled"
                />
              </div>
              <div className="website">
                <CssTextField
                  id="website"
                  fullWidth
                  label="Website"
                  type="url"
                  variant="filled"
                />
              </div>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{
                        color: "#0F0703",
                      }}
                    />
                  }
                  label="Save my name, email, and website in this browser for the next time I comment."
                />
              </div>
              <div className="pb-6 button">
                <Button
                  type="submit"
                  variant="contained"
                  style={{ backgroundColor: "#0F0703" }}
                >
                  Post Comment
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsPage;
