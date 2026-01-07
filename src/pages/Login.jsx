import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginHR } from "../firebase/auth";
import Navbar from "../components/Navbar";
import VerifyMeForm from "../components/VerifyMeForm";

const texts = [
  "Verify Employees in Real-Time",
  "Trusted HR Verification Platform",
  "Fast • Secure • Transparent Hiring"
];

export default function Login() {
  const nav = useNavigate();

  // typewriter states
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  // verify-me popup
  const [openForm, setOpenForm] = useState(false);

  // 🔥 TYPEWRITER EFFECT
  useEffect(() => {
    const currentText = texts[textIndex];

    if (charIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + currentText[charIndex]);
        setCharIndex(charIndex + 1);
      }, 80);
      return () => clearTimeout(timeout);
    } else {
      const pause = setTimeout(() => {
        setDisplayText("");
        setCharIndex(0);
        setTextIndex((textIndex + 1) % texts.length);
      }, 1500);
      return () => clearTimeout(pause);
    }
  }, [charIndex, textIndex]);

  return (
    <>
      {/* 🔹 NAVBAR */}
      <Navbar onVerify={() => setOpenForm(true)} />

      {/* 🔹 VERIFY ME FORM */}
      {openForm && <VerifyMeForm onClose={() => setOpenForm(false)} />}

      {/* 🔹 MAIN LOGIN SECTION */}
      <div className="h-[calc(100vh-64px)] flex flex-col items-center justify-center
                      bg-gradient-to-br from-slate-900 to-black text-white">

        {/* TITLE */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          HR Verification System
        </h1>

        {/* TYPEWRITER */}
        <p className="h-8 text-lg md:text-xl text-green-400 font-mono mb-6">
          {displayText}
          <span className="animate-pulse">|</span>
        </p>

        {/* SUBTEXT */}
        <p className="text-gray-400 text-sm mb-10">
          Login securely using your HR Google account
        </p>

        {/* LOGIN BUTTON */}
        <button
          onClick={() => loginHR().then(() => nav("/dashboard"))}
          className="bg-black border border-white/20 text-white px-8 py-4 rounded-xl
                     text-lg font-medium shadow-lg
                     hover:bg-white hover:text-black
                     transition-all duration-300
                     hover:scale-105 active:scale-95"
        >
          Login with Google
        </button>

        {/* FOOTER */}
        <p className="absolute bottom-6 text-xs text-gray-500">
          © {new Date().getFullYear()} HR Verification Platform · BY ASHU
        </p>
      </div>
    </>
  );
}
