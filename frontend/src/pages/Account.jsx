import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    nameOnCard: "",
    accountNumber: "",
    customerId: "",
    cardNumber: "",
    expiryDate: "",
    cardType: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/gesture-auth");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h2 className="text-3xl font-bold mb-6 animate-bounce">Enter Your Account Details</h2>
      
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg w-80">
        <input
          type="text"
          placeholder="Name on the Card"
          className="w-full mb-3 p-2 rounded bg-gray-700"
          required
        />
        <input
          type="text"
          placeholder="Enter Amount"
          className="w-full mb-3 p-2 rounded bg-gray-700"
          required
        />
        
        <input
          type="text"
          placeholder="Card Number"
          className="w-full mb-3 p-2 rounded bg-gray-700"
          required
        />

<label className="block text-gray-400 text-sm mb-1">Card Type:</label>
        <select className="w-full mb-4 p-2 rounded bg-gray-700 text-gray-300" required>
          <option value="">Select Card Type</option>
          <option value="visa">Visa</option>
          <option value="mastercard">MasterCard</option>
          <option value="rupay">RuPay</option>
          <option value="amex">American Express</option>
        </select>
        <label className="block text-gray-400 text-sm mb-1">Expiry Date:</label>
        <input
          type="date"
          className="w-full mb-3 p-2 rounded bg-gray-700 text-gray-300"
          required
        />

        
    

        <button className="bg-blue-500 px-4 py-2 w-full rounded-lg hover:bg-blue-600 transition-all">
          Proceed with MFA
        </button>
      </form>
    </div>
  );
}
