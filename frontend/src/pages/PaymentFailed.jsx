import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-900 text-white">
      <h2 className="text-3xl font-bold mb-4 animate-bounce">❌ Payment Failed</h2>
      <p className="mb-6 text-lg">Authentication failed. Please try again.</p>
      <button
        onClick={() => navigate("/account")}
        className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg text-lg font-semibold"
      >
        Retry Payment
      </button>
    </div>
  );
};

export default PaymentFailed;
