import React from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 text-center">
      <h1 className="text-4xl font-bold mb-6 animate-bounce">
        Welcome to Secure Pay
      </h1>
      <p className="max-w-2xl text-lg mb-6 leading-relaxed">
        Experience the next-generation payment authentication system that 
        combines Hand Gesture Recognition & Face Structure Recognition for 
        secure, fast, and effortless transactions. Say goodbye to passwords 
        and PINs—your identity is your key!
      </p>

      {/* Advantages Section */}
      <div className="bg-white text-gray-800 rounded-lg p-6 shadow-lg max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">
          Why Choose Biometric Payment Authentication?
        </h2>
        <ul className="list-disc list-inside text-left text-lg space-y-2">
          <li><strong>🔒 Enhanced Security:</strong> Prevents fraud & unauthorized access.</li>
          <li><strong>⚡ Faster Transactions:</strong> No need to enter PINs or passwords.</li>
          <li><strong>🖐️ Hands-Free Authentication:</strong> Ideal for contactless payments.</li>
          <li><strong>🧑‍💻 User-Friendly:</strong> Simple and intuitive for all users.</li>
        </ul>
      </div>

      <button
        onClick={() => navigate("/account")}
        className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-lg text-xl font-semibold shadow-lg hover:bg-gray-200 transition-all duration-300"
      >
        Proceed
      </button>
    </div>
  );
}
