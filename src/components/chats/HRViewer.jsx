import { useEffect, useRef, useState } from "react";
import { db } from "../../firebase/firebase";
import {
  doc,
  updateDoc,
  onSnapshot,
  arrayUnion
} from "firebase/firestore";

const servers = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
};

export default function HRViewer({ roomId }) {
  const videoRef = useRef(null);
  const pcRef = useRef(null);
  const [audioOn, setAudioOn] = useState(true);

  useEffect(() => {
    const pc = new RTCPeerConnection(servers);
    pcRef.current = pc;

    pc.ontrack = e => {
      videoRef.current.srcObject = e.streams[0];
    };

    pc.onicecandidate = e => {
      if (e.candidate) {
        updateDoc(doc(db, "rooms", roomId), {
          hrCandidates: arrayUnion(e.candidate.toJSON())
        });
      }
    };

    onSnapshot(doc(db, "rooms", roomId), async snap => {
      const d = snap.data();
      if (!d?.offer) return;

      if (!pc.currentRemoteDescription) {
        await pc.setRemoteDescription(d.offer);
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        await updateDoc(doc(db, "rooms", roomId), { answer });
      }

      d?.refereeCandidates?.forEach(async c => {
        try {
          await pc.addIceCandidate(c);
        } catch {}
      });
    });
  }, [roomId]);

  const toggleAudio = () => {
    videoRef.current.muted = audioOn;
    setAudioOn(!audioOn);
  };

  return (
    <div className="bg-black rounded-xl p-3 text-white">
      <p className="text-sm mb-2">Referee Live Feed</p>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="rounded-lg w-full mb-3"
      />

      <button
        onClick={toggleAudio}
        className="px-3 py-1 rounded bg-red-600"
      >
        {audioOn ? "Mute Referee" : "Unmute Referee"}
      </button>
    </div>
  );
}
