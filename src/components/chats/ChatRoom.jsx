import { useEffect, useState, useRef } from "react";
import { db } from "../../firebase/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc
} from "firebase/firestore";

import PromptPanel from "./PromptPanel";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import SectionReviewPanel from "./SectionReviewPanel";
import LiveStatusBubble from "./LiveStatusBubble";

export default function ChatRoom({ roomId, role }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState({});
  const [review, setReview] = useState({});
  const bottomRef = useRef(null);

  // 🔹 Messages
  useEffect(() => {
    const q = query(
      collection(db, "messages", roomId, "chat"),
      orderBy("timestamp")
    );
    return onSnapshot(q, snap =>
      setMessages(snap.docs.map(d => d.data()))
    );
  }, [roomId]);

  // 🔹 Room listener (NO overwrite)
  useEffect(() => {
    return onSnapshot(doc(db, "rooms", roomId), snap => {
      const d = snap.data();
      if (!d) return;
      setTyping(d.typing || {});
      setReview(d.verificationReview || {});
    });
  }, [roomId]);

  // 🔹 Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const updateTyping = async val => {
    await updateDoc(doc(db, "rooms", roomId), {
      [`typing.${role}`]: val
    });
  };

  // ✅ FIXED HR DECISION HANDLER
  const updateReview = async (section, decision) => {
    const updated = {
      ...review,
      [section]: decision
    };

    const values = Object.values(updated);
    let status = "pending";

    // 🔥 STATUS PRIORITY (IMPORTANT)
    if (values.includes("rejected")) {
      status = "rejected";
    } else if (values.length && values.every(v => v === "selected")) {
      status = "completed";
    } else if (values.some(v => v === "selected" || v === "partial")) {
      status = "partial";
    }

    await updateDoc(doc(db, "rooms", roomId), {
      verificationReview: updated,
      status
    });
  };

  const send = async () => {
    if (!text.trim()) return;

    await addDoc(collection(db, "messages", roomId, "chat"), {
      text,
      role,
      timestamp: new Date()
    });

    setText("");
    updateTyping(false);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-xl border overflow-hidden">

      {/* HEADER */}
      <div className="px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex justify-between items-center">
        <div>
          <h2 className="font-semibold">Verification Chat</h2>
          <p className="text-xs opacity-80">
            HR ↔ Referee verification
          </p>
        </div>

        {/* ✅ LIVE STATUS BUBBLE */}
        <LiveStatusBubble roomId={roomId} />
      </div>

      {/* HR REVIEW PANEL */}
      {role === "HR" && (
        <div className="p-4 grid md:grid-cols-2 gap-4 bg-gray-50 border-b">
          <SectionReviewPanel
            title="Role & Duration"
            sectionKey="role"
            value={review.role}
            onSelect={updateReview}
          />
          <SectionReviewPanel
            title="Responsibilities"
            sectionKey="responsibilities"
            value={review.responsibilities}
            onSelect={updateReview}
          />
          <SectionReviewPanel
            title="Performance Feedback"
            sectionKey="feedback"
            value={review.feedback}
            onSelect={updateReview}
          />
          <SectionReviewPanel
            title="Rehire Decision"
            sectionKey="rehire"
            value={review.rehire}
            onSelect={updateReview}
          />
        </div>
      )}

      {/* CHAT */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-100">
        {messages.map((m, i) => (
          <MessageBubble key={i} msg={m} self={m.role === role} />
        ))}

        {Object.entries(typing).some(
          ([r, v]) => r !== role && v
        ) && <TypingIndicator />}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="p-4 border-t flex gap-3 bg-white">
        <input
          value={text}
          onChange={e => {
            setText(e.target.value);
            updateTyping(e.target.value.length > 0);
          }}
          onKeyDown={e => {
            if (e.key === "Enter") {
              e.preventDefault();
              send();
            }
          }}
          className="flex-1 px-4 py-2 rounded-full border focus:ring-2 focus:ring-blue-500"
          placeholder="Type message…"
        />
        <button
          onClick={send}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-full font-medium"
        >
          Send
        </button>
      </div>
    </div>
  );
}
