import React from "react";

export default function ThankYou() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-900">
          Thank You!
        </h1>
        <p className="mt-4 text-center text-lg text-gray-700">
          Your order has been successfully placed. We appreciate your business!
        </p>
        <p className="mt-2 text-center text-sm text-gray-600">
          You will receive an email confirmation shortly with the details of
          your order.
        </p>
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-blue-600 hover:text-blue-700 text-lg font-semibold"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}
