export default function VerifyMeForm({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <form
        name="verify-me"
        method="POST"
        data-netlify="true"
        className="bg-white w-full max-w-md p-6 rounded-xl space-y-3"
      >
        <input type="hidden" name="form-name" value="verify-me" />

        <h2 className="text-xl font-semibold">Background Verification</h2>

        <input
          name="candidateName"
          placeholder="Candidate Name"
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="email"
          name="candidateEmail"
          placeholder="Candidate Email"
          required
          className="w-full border p-2 rounded"
        />

        <input
          name="company"
          placeholder="Company Name"
          className="w-full border p-2 rounded"
        />

        <input
          type="email"
          name="refereeEmail"
          placeholder="Referee Email"
          required
          className="w-full border p-2 rounded"
        />

        <textarea
          name="notes"
          placeholder="Extra details (optional)"
          className="w-full border p-2 rounded"
        />

        <div className="flex gap-2 pt-2">
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
    </div>
  );
}
