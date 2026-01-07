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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">

        {!submitted ? (
          <form
            name="background-verification"
            method="POST"
            data-netlify="true"
            onSubmit={handleSubmit}
          >
            <input
              type="hidden"
              name="form-name"
              value="background-verification"
            />

            {/* HEADER */}
            <h2 className="text-2xl font-semibold text-gray-900 mb-1 text-center">
              Background Verification
            </h2>
            <p className="text-sm text-gray-500 mb-5 text-center">
              Fill the details below to start verification
            </p>

            {/* INPUTS */}
            <input
              name="candidateName"
              placeholder="Candidate Name"
              required
              className="w-full mb-3 px-4 py-2.5 rounded-lg border
                         bg-white text-gray-900 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              name="candidateEmail"
              placeholder="Candidate Email"
              required
              className="w-full mb-3 px-4 py-2.5 rounded-lg border
                         bg-white text-gray-900 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="company"
              placeholder="Company Name"
              required
              className="w-full mb-3 px-4 py-2.5 rounded-lg border
                         bg-white text-gray-900 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              name="refereeEmail"
              placeholder="Referee Email"
              required
              className="w-full mb-3 px-4 py-2.5 rounded-lg border
                         bg-white text-gray-900 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              name="message"
              placeholder="Extra details (optional)"
              rows="3"
              className="w-full mb-5 px-4 py-2.5 rounded-lg border
                         bg-white text-gray-900 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />

            {/* ACTION BUTTONS */}
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg
                           hover:bg-blue-700 transition font-medium"
              >
                Submit
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-200 text-gray-800 py-2.5 rounded-lg
                           hover:bg-gray-300 transition font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          /* SUCCESS STATE */
          <div className="text-center py-10">
            <div className="text-green-600 text-4xl mb-3">✅</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Information Sent
            </h3>
            <p className="text-gray-600 mb-6 text-sm">
              Your information has been sent to HR.  
              We will connect with you shortly.
            </p>

            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg
                         hover:bg-blue-700 transition font-medium"
            >
              Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
