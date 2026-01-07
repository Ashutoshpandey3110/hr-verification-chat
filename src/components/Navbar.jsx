export default function Navbar({ onVerify }) {
  return (
    <nav className="h-16 w-full bg-black text-white flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold">HR Verification</h1>

      <button
        onClick={onVerify}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
      >
        Verify Me
      </button>
    </nav>
  );
}
