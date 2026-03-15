export default function BuilderChoiceCard({
  label,
  isSelected = false,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-3xl border px-5 py-6 text-center text-xl font-bold transition duration-200",
        "bg-white/[0.03] text-white",
        isSelected
          ? "border-cyan-300/60 shadow-[0_0_0_1px_rgba(34,211,238,0.25),0_12px_40px_rgba(34,211,238,0.08)]"
          : "border-white/10 hover:border-cyan-300/30 hover:text-cyan-200",
      ].join(" ")}
    >
      {label}
    </button>
  )
}