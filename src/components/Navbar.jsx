export default function Navbar({ onVerifyClick }) {
  return (
    <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-black/40">
      <h1 className="text-lg font-semibold text-white">
        HR Verification
      </h1>

      <button
        onClick={onVerifyClick}
        className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg transition text-white"
      >
        Verify Me
      </button>
    </div>
  );
}
