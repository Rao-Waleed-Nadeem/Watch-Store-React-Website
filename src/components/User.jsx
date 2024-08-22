import React from "react";
import user1 from "/src/images/user1.png";

function User() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-auto -z-50">
      <div className="relative w-full h-screen bg-black">
        <img
          src={user1}
          alt="User"
          className="absolute inset-0 object-cover w-full h-full opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white phone:text-5xl tabletLandscape:text-6xl">
            Michael Hickman
          </h1>
        </div>
      </div>
      <div className="w-full max-w-3xl px-5 my-16 text-black">
        <p>
          “Dremo has truly become my go-to destination for all my accessory
          needs. Not only do they offer a fantastic range of products, but the
          attention to detail and craftsmanship are impeccable. From the moment
          I placed my order to the moment I received it, the entire experience
          was seamless, and the customer support team was always available to
          answer my questions. I can confidently say that this store has
          exceeded my expectations, and I will continue to be a loyal customer.”
        </p>
      </div>
    </div>
  );
}

export default User;
