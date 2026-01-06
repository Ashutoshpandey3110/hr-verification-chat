import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default function LiveStatusBubble({ roomId }) {
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    if (!roomId) return;

    return onSnapshot(doc(db, "rooms", roomId), snap => {
      if (snap.exists()) {
        setStatus(snap.data().status || "pending");
      }
    });
  }, [roomId]);

  const styles = {
    completed: "bg-green-500",
    partial: "bg-yellow-400",
    rejected: "bg-red-500",
    pending: "bg-gray-400"
  };

  return (
    <div className="flex items-center gap-2">
      <span
        className={`w-3 h-3 rounded-full animate-pulse ${styles[status]}`}
      />
      <span className="text-xs capitalize">{status}</span>
    </div>
  );
}
