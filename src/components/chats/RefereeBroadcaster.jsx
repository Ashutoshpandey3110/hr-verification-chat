import { useEffect, useRef, useState } from "react";
import { db } from "../../firebase/firebase";
import {
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  arrayUnion
} from "firebase/firestore";

const servers = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
};

export default function RefereeBroadcaster({ roomId }) {
  const videoRef = useRef(null);
  const pcRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);

  useEffect(() => {
    const start = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });

      streamRef.current = stream;
      videoRef.current.srcObject = stream;

      const pc = new RTCPeerConnection(servers);
      pcRef.current = pc;

      stream.getTracks().forEach(track => pc.addTrack(track, stream));

      pc.onicecandidate = e => {
        if (e.candidate) {
          updateDoc(doc(db, "rooms", roomId), {
            refereeCandidates: arrayUnion(e.candidate.toJSON())
          });
        }
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      await setDoc(
        doc(db, "rooms", roomId),
        {
          offer,
          refereeCandidates: [],
          hrCandidates: []
        },
        { merge: true }
      );

      onSnapshot(doc(db, "rooms", roomId), async snap => {
        const d = snap.data();
        if (d?.answer && !pc.currentRemoteDescription) {
          await pc.setRemoteDescription(d.answer);
        }

        d?.hrCandidates?.forEach(async c => {
          try {
            await pc.addIceCandidate(c);
          } catch {}
        });
      });
    };

    start();
  }, [roomId]);

  const toggleCamera = () => {
    streamRef.current
      .getVideoTracks()
      .forEach(t => (t.enabled = !cameraOn));
    setCameraOn(!cameraOn);
  };

  const toggleMic = () => {
    streamRef.current
      .getAudioTracks()
      .forEach(t => (t.enabled = !micOn));
    setMicOn(!micOn);
  };

  return (
    <div className="bg-black rounded-xl p-3 text-white">
      <p className="text-sm mb-2">Your Camera</p>

      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="rounded-lg w-full mb-3"
      />

      <div className="flex gap-2">
        <button
          onClick={toggleCamera}
          className="px-3 py-1 rounded bg-blue-600"
        >
          {cameraOn ? "Turn Camera Off" : "Turn Camera On"}
        </button>

        <button
          onClick={toggleMic}
          className="px-3 py-1 rounded bg-indigo-600"
        >
          {micOn ? "Mute" : "Unmute"}
        </button>
      </div>
    </div>
  );
}
