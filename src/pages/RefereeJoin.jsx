import { useParams } from "react-router-dom";
import { loginReferee } from "../firebase/auth";
import { useEffect, useState } from "react";
import ChatRoom from "../components/chats/ChatRoom";

const messages = [
  "Connecting securely…",
  "Preparing verification room…",
  "Ensuring data privacy…",
  "Almost ready…"
];

export default function RefereeJoin() {
  const { id } = useParams();
  const [ready, setReady] = useState(false);
  const [text, setText] = useState("");
  const [msgIndex, setMsgIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  // 🔐 Login referee
  useEffect(() => {
    loginReferee().then(() => setReady(true));
  }, []);

  // ✨ Typing animation
  useEffect(() => {
    if (ready) return;

    const current = messages[msgIndex];

    if (charIndex < current.length) {
      const t = setTimeout(() => {
        setText(prev => prev + current[charIndex]);
        setCharIndex(charIndex + 1);
      }, 70);
      return () => clearTimeout(t);
    } else {
      const pause = setTimeout(() => {
        setText("");
        setCharIndex(0);
        setMsgIndex((msgIndex + 1) % messages.length);
      }, 1200);
      return () => clearTimeout(pause);
    }
  }, [charIndex, msgIndex, ready]);

  // 🚀 When ready → open chat
  if (ready) {
    return <ChatRoom roomId={id} role="Referee" />;
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center
                    bg-gradient-to-br from-indigo-900 via-slate-900 to-black
                    text-white relative overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />

      {/* MAIN CARD */}
      <div className="z-10 bg-white/10 backdrop-blur-xl border border-white/20
                      rounded-2xl p-10 text-center shadow-2xl
                      animate-fade-in">

        <h1 className="text-3xl font-bold mb-3">
          Referee Verification Portal
        </h1>

        <p className="text-sm text-gray-300 mb-8">
          You’re joining a secure HR verification session
        </p>

        {/* LOADER */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-14 h-14 border-4 border-blue-400 border-t-transparent
                          rounded-full animate-spin" />
        </div>

        {/* TYPING TEXT */}
        <p className="h-6 font-mono text-green-400 text-sm">
          {text}
          <span className="animate-pulse">|</span>
        </p>
      </div>

      {/* FOOTER */}
      <p className="absolute bottom-6 text-xs text-gray-400">
        This session is encrypted & monitored for security
      </p>
    </div>
  );
}
