export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 text-gray-500 text-sm">
      <span className="flex gap-1">
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
      </span>
      typing…
    </div>
  );
}
