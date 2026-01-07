export default function Navbar({ onVerifyClick }) {
  return (
    <nav className="fixed top-0 w-full flex justify-between items-center px-8 py-4 bg-black text-white z-50">
      <h1 className="font-semibold text-lg">HR Verification</h1>

      <button
        onClick={onVerifyClick}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
      >
        Verify Me
      </button>
    </nav>
  );
}
