export default function MessageBubble({ msg, self }) {
  return (
    <div className={`flex ${self ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-xl shadow text-sm ${
          self
            ? "bg-blue-600 text-white"
            : "bg-white border text-gray-800"
        }`}
      >
        <p>{msg.text}</p>
        <p className="text-[10px] mt-1 opacity-60">{msg.role}</p>
      </div>
    </div>
  );
}
