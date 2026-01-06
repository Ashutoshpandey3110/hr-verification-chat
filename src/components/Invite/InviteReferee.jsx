import { useState } from "react";
import { Check, Copy, Link2 } from "lucide-react";

export default function InviteReferee({ roomId }) {
  const link = `${window.location.origin}/referee/${roomId}`;
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl p-5
                    bg-gradient-to-br from-blue-50 to-indigo-50
                    border border-blue-100 shadow-lg">

      {/* subtle glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl" />

      <h3 className="flex items-center gap-2 font-semibold text-gray-800 mb-1">
        <Link2 size={18} className="text-blue-600" />
        Invite Referee
      </h3>

      <p className="text-sm text-gray-600 mb-3">
        Share this secure verification link with the referee.
      </p>

      {/* LINK BOX */}
      <div className="flex gap-2 items-center">
        <input
          value={link}
          readOnly
          className="flex-1 px-3 py-2 rounded-lg text-sm
                     bg-white border border-gray-200
                     font-mono text-gray-700 truncate"
        />

        <button
          onClick={copyToClipboard}
          className={`flex items-center gap-1 px-4 py-2 rounded-lg
                      text-sm font-medium transition-all
                      ${
                        copied
                          ? "bg-green-500 text-white scale-105"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
        >
          {copied ? (
            <>
              <Check size={16} />
              Copied
            </>
          ) : (
            <>
              <Copy size={16} />
              Copy
            </>
          )}
        </button>
      </div>

      {/* FOOTER */}
      <p className="text-xs text-gray-500 mt-3">
        🌍 Works on any device · No login required · Secure & time-bound
      </p>
    </div>
  );
}
