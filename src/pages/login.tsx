"use client";

import { useState } from "react";
import LoginModal from "@/components/LoginModal";
import SignupModal from "@/components/SignupModal";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      {isLogin ? (
        <LoginModal onSwitch={() => setIsLogin(false)} />
      ) : (
        <SignupModal onSwitch={() => setIsLogin(true)} />
      )}
    </div>
  );
}
