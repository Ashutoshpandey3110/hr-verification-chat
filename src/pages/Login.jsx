import { useEffect, useState } from "react";
import { loginHR } from "../firebase/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import VerifyForm from "../components/VerifyMeForm";

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

  useEffect(() => {
    const currentText = texts[textIndex];
    if (charIndex < currentText.length) {
      const t = setTimeout(() => {
        setDisplayText(p => p + currentText[charIndex]);
        setCharIndex(charIndex + 1);
      }, 80);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDisplayText("");
        setCharIndex(0);
        setTextIndex((textIndex + 1) % texts.length);
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [charIndex, textIndex]);

  return (
    <>
      <Navbar onVerifyClick={() => setShowForm(true)} />
      {showForm && <VerifyForm onClose={() => setShowForm(false)} />}

      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-black text-white">

        <h1 className="text-5xl font-bold mb-4">HR Verification System</h1>

        <p className="h-8 text-xl text-green-400 font-mono mb-6">
          {displayText}<span className="animate-pulse">|</span>
        </p>

        <p className="text-gray-400 mb-10">
          Login securely using your HR Google account
        </p>

        <button
          onClick={() => loginHR().then(() => nav("/dashboard"))}
          className="bg-black border border-white/20 px-8 py-4 rounded-xl hover:bg-white hover:text-black transition"
        >
          Login with Google
        </button>
      </div>
    </>
  );
}
