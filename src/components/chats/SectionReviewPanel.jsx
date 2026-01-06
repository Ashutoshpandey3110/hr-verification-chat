import { motion } from "framer-motion";

export default function SectionReviewPanel({
  title,
  sectionKey,
  value,
  onSelect
}) {
  const options = [
    { key: "selected", label: "✓ Selected", cls: "bg-green-500" },
    { key: "partial", label: "△ Partial", cls: "bg-yellow-400 text-black" },
    { key: "rejected", label: "✕ Reject", cls: "bg-red-500" }
  ];

  return (
    <div className="bg-white rounded-xl p-4 shadow border">
      <p className="font-medium mb-3">{title}</p>

      <div className="flex gap-3">
        {options.map((o) => (
          <motion.button
            key={o.key}
            whileTap={{ scale: 0.9 }}
            animate={{
              scale: value === o.key ? 1.05 : 1,
              opacity: value && value !== o.key ? 0.4 : 1
            }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => onSelect(sectionKey, o.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium text-white ${o.cls}`}
          >
            {o.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
