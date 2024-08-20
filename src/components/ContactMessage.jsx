import React from "react";
import { useLoaderData } from "react-router-dom";

export function loader({ params }) {
  return { name: params.name };
}
function ContactMessage() {
  const { name } = useLoaderData();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10 bg-gray-100">
      <div className="max-w-md p-8 mx-auto bg-white shadow-lg rounded-xl">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          Thanks! {name} For Contact Us!
        </h1>
        <p className="mt-4 text-lg text-center">
          Your Message has been successfully Sent. We appreciate your
          Interaction!
        </p>
        <p className="mt-2 text-sm text-center text-zinc-800">
          You will receive an email of response soon.
        </p>
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-lg font-semibold text-slate-600 hover:text-slate-800"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactMessage;
