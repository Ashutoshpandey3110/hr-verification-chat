import { prompts } from "../../utils/prompts";

export default function PromptPanel({ onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {prompts.map((p) => (
        <button
          key={p.key}
          onClick={() => onSelect(p.label)}
          className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
