import { useState } from "react";

export default function VerifyForm({ onClose }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md relative">

        {!submitted ? (
          <form
            name="background-verification"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={() => setSubmitted(true)}
          >
            {/* 🔑 REQUIRED FOR NETLIFY */}
            <input type="hidden" name="form-name" value="background-verification" />
            <input type="hidden" name="bot-field" />

            <h2 className="text-xl font-semibold mb-4">
              Background Verification
            </h2>

            <input
              name="candidateName"
              placeholder="Candidate Name"
              required
              className="w-full mb-3 px-3 py-2 border rounded"
            />

            <input
              name="candidateEmail"
              placeholder="Candidate Email"
              required
              className="w-full mb-3 px-3 py-2 border rounded"
            />

            <input
              name="company"
              placeholder="Company Name"
              required
              className="w-full mb-3 px-3 py-2 border rounded"
            />

            <input
              name="refereeEmail"
              placeholder="Referee Email"
              required
              className="w-full mb-3 px-3 py-2 border rounded"
            />

            <textarea
              name="message"
              placeholder="Extra details (optional)"
              className="w-full mb-4 px-3 py-2 border rounded"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 rounded"
              >
                Submit
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-200 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-10">
            <h3 className="text-lg font-semibold mb-3">
              ✅ Information Sent
            </h3>
            <p className="text-gray-600 mb-6">
              Your information has been sent to HR.  
              We will connect with you shortly.
            </p>

            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-6 py-2 rounded"
            >
              Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
