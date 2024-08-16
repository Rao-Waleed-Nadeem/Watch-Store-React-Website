import React from "react";

function User() {
  return (
    <div className="w-full h-auto flex flex-col -z-50 items-center justify-center">
      <div className="relative bg-black w-full h-screen">
        <img
          src="user1.png"
          alt="User"
          className="absolute  opacity-60 inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white phone:text-5xl tabletLandscape:text-6xl">
            Michael Hickman
          </h1>
        </div>
      </div>
      <div className="text-black px-5 w-full my-16 max-w-3xl">
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
