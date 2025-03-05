import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GestureAuth = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict-gesture", formData);

      if (response.status === 200 && response.data.gesture !== "No hand detected") {
        setMessage(`✅ Success: Recognized gesture - ${response.data.gesture}`);
        setIsAuthenticated(true);
        setAuthFailed(false);
      } else {
        setMessage("❌ Authentication Failed: Invalid gesture.");
        setIsAuthenticated(false);
        setAuthFailed(true);
      }
    } catch (error) {
      setMessage("❌ Error occurred while recognizing the gesture.");
      setIsAuthenticated(false);
      setAuthFailed(true);
    }
  };

  const handleProceed = () => {
    if (isAuthenticated) {
      navigate("/face-auth");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white h-screen flex flex-col items-center justify-center bg-gray-900 text-white flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h2 className="text-2xl mb-4 animate-bounce">Upload Gesture for Authentication</h2>
      <input type="file" onChange={handleFileChange} className="mb-4 p-2 border border-gray-300 rounded" />
      <button onClick={handleUpload} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Upload & Recognize
      </button>
      {message && <p className="mt-4 text-lg">{message}</p>}

      <button
        onClick={handleProceed}
        disabled={!isAuthenticated}
        className={`mt-4 px-6 py-2 rounded ${isAuthenticated ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 cursor-not-allowed"}`}
      >
        Proceed to Face Recognition
      </button>

      {authFailed && (
        <button
          onClick={() => navigate("/payment-failed")}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded"
        >
          Go to Payment Failed
        </button>
      )}
    </div>
  );
};

export default GestureAuth;
