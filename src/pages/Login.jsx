import { useEffect, useState } from "react";
import { loginHR } from "../firebase/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import VerifyForm from "../components/VerifyForm";

const texts = [
  "Verify Employees in Real-Time",
  "Trusted HR Verification Platform",
  "Fast • Secure • Transparent Hiring"
];

export default function Login() {
  const nav = useNavigate();

  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);

  // TYPEWRITER
  useEffect(() => {
    const text = texts[textIndex];
    if (charIndex < text.length) {
      const t = setTimeout(() => {
        setDisplayText(prev => prev + text[charIndex]);
        setCharIndex(charIndex + 1);
      }, 80);
      return () => clearTimeout(t);
    } else {
      const p = setTimeout(() => {
        setDisplayText("");
        setCharIndex(0);
        setTextIndex((textIndex + 1) % texts.length);
      }, 1500);
      return () => clearTimeout(p);
    }
  }, [charIndex, textIndex]);

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 to-black text-white">

      {/* NAVBAR */}
      <Navbar onVerifyClick={() => setShowForm(true)} />

      {/* MAIN */}
      <div className="flex flex-col items-center justify-center h-[80%] text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          HR Verification System
        </h1>

        <p className="h-8 text-lg md:text-xl text-green-400 font-mono mb-6">
          {displayText}
          <span className="animate-pulse">|</span>
        </p>

        <p className="text-gray-400 text-sm mb-10">
          Login securely using your HR Google account
        </p>

        <button
          onClick={() => loginHR().then(() => nav("/dashboard"))}
          className="bg-black border border-white/20 px-8 py-4 rounded-xl
                     text-lg font-medium shadow-lg
                     hover:bg-white hover:text-black transition"
        >
          Login with Google
        </button>
      </div>

      {/* FOOTER */}
      <p className="absolute bottom-6 w-full text-center text-xs text-gray-500">
        © {new Date().getFullYear()} HR Verification Platform · BY ASHU
      </p>

      {/* FORM POPUP */}
      {showForm && <VerifyForm onClose={() => setShowForm(false)} />}
    </div>
  );
}
