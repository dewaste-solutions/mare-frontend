"use client";

import { useState } from "react";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignupModal";

const AuthModal: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login & Signup

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      {isLogin ? (
        <LoginModal onSwitch={() => setIsLogin(false)} />
      ) : (
        <SignUpModal onSwitch={() => setIsLogin(true)} />
      )}
    </div>
  );
};

export default AuthModal;
