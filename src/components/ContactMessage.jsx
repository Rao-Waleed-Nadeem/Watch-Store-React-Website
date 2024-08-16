import React from "react";
import { useLoaderData } from "react-router-dom";

export function loader({ params }) {
  return { name: params.name };
}
function ContactMessage() {
  const { name } = useLoaderData();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-green-800">
          Thanks! {name} For Contact Us!
        </h1>
        <p className="mt-4 text-center text-lg">
          Your Message has been successfully Sent. We appreciate your
          Interaction!
        </p>
        <p className="mt-2 text-center text-sm text-gray-600">
          You will receive an email of response soon.
        </p>
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-yellow-800 hover:text-yellow-900 text-lg font-semibold"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactMessage;
