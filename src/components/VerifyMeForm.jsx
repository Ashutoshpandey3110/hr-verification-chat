export default function VerifyForm({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[420px]">

        <h2 className="text-xl font-semibold mb-4">
          Background Verification
        </h2>

        <form
          name="background-verification"
          method="POST"
          action="/success"
          data-netlify="true"
          netlify-honeypot="bot-field"
          className="space-y-3"
        >
          {/* REQUIRED FOR NETLIFY */}
          <input type="hidden" name="form-name" value="background-verification" />
          <input type="hidden" name="bot-field" />

          <input name="candidateName" placeholder="Candidate Name" required className="w-full border p-2 rounded" />
          <input name="candidateEmail" type="email" placeholder="Candidate Email" required className="w-full border p-2 rounded" />
          <input name="companyName" placeholder="Company Name" required className="w-full border p-2 rounded" />
          <input name="refereeEmail" type="email" placeholder="Referee Email" required className="w-full border p-2 rounded" />

          <textarea name="extraDetails" placeholder="Extra details (optional)" className="w-full border p-2 rounded" />

          <div className="flex gap-2 pt-3">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Submit
            </button>
            <button type="button" onClick={onClose} className="bg-gray-200 px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
