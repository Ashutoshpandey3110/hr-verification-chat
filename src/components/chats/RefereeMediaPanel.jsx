import { useState } from "react";

export default function RefereeMediaPanel() {
  const [stream, setStream] = useState(null);

  const startCamera = async () => {
    const s = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });
    setStream(s);
  };

  const startScreen = async () => {
    const s = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true
    });
    setStream(s);
  };

  return (
    <div className="bg-white border rounded-xl p-4 shadow space-y-3">
      <h3 className="font-semibold text-sm">Live Verification</h3>

      <div className="flex gap-3">
        <button
          onClick={startCamera}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          Camera + Mic
        </button>

        <button
          onClick={startScreen}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          Screen Share
        </button>
      </div>

      {stream && (
        <video
          autoPlay
          playsInline
          ref={(el) => el && (el.srcObject = stream)}
          className="rounded-lg border w-full mt-2"
        />
      )}
    </div>
  );
}
