import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Account from "./pages/Account";
import GestureAuth from "./pages/GestureAuth";
import FaceAuth from "./pages/FaceAuth";
import Success from "./pages/Success";
import PaymentFailed from "./pages/PaymentFailed";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header /> 
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/account" element={<Account />} />
            <Route path="/gesture-auth" element={<GestureAuth />} />
            <Route path="/face-auth" element={<FaceAuth />} />
            <Route path="/payment-success" element={<Success />} />
            <Route path="/payment-failed" element={<PaymentFailed />} />
          </Routes>
        </div>
        <Footer /> 
      </div>
    </Router>
  );
}
