import { useState } from "react";

export default function VerifyForm({ onClose }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    });

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md">

        {!submitted ? (
          <form
            name="background-verification"
            method="POST"
            data-netlify="true"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="background-verification" />

            <h2 className="text-xl font-semibold mb-4">
              Background Verification
            </h2>

            <input name="candidateName" placeholder="Candidate Name" required className="w-full mb-3 p-2 border rounded" />
            <input name="candidateEmail" placeholder="Candidate Email" required className="w-full mb-3 p-2 border rounded" />
            <input name="company" placeholder="Company Name" required className="w-full mb-3 p-2 border rounded" />
            <input name="refereeEmail" placeholder="Referee Email" required className="w-full mb-3 p-2 border rounded" />
            <textarea name="message" placeholder="Extra details" className="w-full mb-4 p-2 border rounded" />

            <button className="w-full bg-blue-600 text-white py-2 rounded">
              Submit
            </button>
          </form>
        ) : (
          <div className="text-center py-10">
            <h3 className="text-lg font-semibold mb-3">✅ Information Sent</h3>
            <p className="text-gray-600 mb-6">
              Your information has been sent to HR.
            </p>
            <button onClick={onClose} className="bg-blue-600 text-white px-6 py-2 rounded">
              Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
