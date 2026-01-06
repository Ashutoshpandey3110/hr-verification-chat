import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PlusCircle, ShieldCheck, Trash2 } from "lucide-react";

export default function Dashboard() {
  const [rooms, setRooms] = useState([]);
  const nav = useNavigate();

  // 🔥 REAL-TIME ROOMS LISTENER
  useEffect(() => {
    return onSnapshot(collection(db, "rooms"), (snap) => {
      setRooms(
        snap.docs.map((d) => ({
          id: d.id,
          status: d.data().status || "pending"
        }))
      );
    });
  }, []);

  // ➕ CREATE ROOM
  const createRoom = async () => {
    const r = await addDoc(collection(db, "rooms"), {
      createdAt: new Date(),
      status: "pending",
      verificationReview: {},
      typing: {}
    });
    nav(`/room/${r.id}`);
  };

  // 🗑 DELETE ROOM
  const deleteRoom = async (id) => {
    if (!window.confirm("Delete this verification?")) return;
    await deleteDoc(doc(db, "rooms", id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black p-8 text-white">
      
      {/* HEADER */}
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <ShieldCheck className="text-green-400" />
          HR Verification Dashboard
        </h1>

        <button
          onClick={createRoom}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 transition px-5 py-2 rounded-lg"
        >
          <PlusCircle size={20} />
          New Verification
        </button>
      </div>

      {/* ROOMS GRID */}
      <div className="grid md:grid-cols-3 gap-6">
        {rooms.map((r) => (
          <motion.div
            key={r.id}
            whileHover={{ scale: 1.04 }}
            className="bg-white/10 p-5 rounded-xl border border-white/20 relative"
          >
            <p className="text-xs text-gray-400">Verification ID</p>

            <p
              onClick={() => nav(`/room/${r.id}`)}
              className="font-mono text-green-300 break-all cursor-pointer hover:underline"
            >
              {r.id}
            </p>

            {/* ✅ STATUS BADGE */}
            <span
              className={`inline-block mt-3 px-3 py-1 text-xs rounded-full ${
                r.status === "completed"
                  ? "bg-green-500/20 text-green-400"
                  : r.status === "partial"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : r.status === "rejected"
                  ? "bg-red-500/20 text-red-400"
                  : "bg-gray-500/20 text-gray-400"
              }`}
            >
              {r.status}
            </span>

            {/* 🗑 DELETE BUTTON */}
            <button
              onClick={() => deleteRoom(r.id)}
              className="absolute top-3 right-3 text-red-400 hover:text-red-500 transition"
            >
              <Trash2 size={16} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
