export default function BuilderChoiceCard({
  label,
  description,
  isSelected = false,
  onClick,
  compact = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "group relative flex w-full flex-col items-center justify-center overflow-hidden backdrop-blur-xl transition-all duration-300 ease-out active:scale-[0.97]",
        compact
          ? "min-h-[118px] rounded-[26px] px-4 py-5 sm:min-h-[130px] sm:px-5 sm:py-6"
          : "rounded-[28px] px-5 py-6 sm:rounded-[32px] sm:px-6 sm:py-8",
        isSelected
          ? "z-10 scale-[1.01] border border-brand/40 bg-brand/[0.06] shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(129,101,255,0.12)]"
          : "border border-white/[0.06] bg-white/[0.01] hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.04]",
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent" />

      {isSelected && (
        <div className="absolute left-1/2 top-0 h-[2px] w-16 -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-2 to-transparent shadow-[0_0_12px_rgba(56,225,245,0.8)]" />
      )}

      <span
        className={[
          "block tracking-tight transition-colors duration-300",
          compact ? "text-base font-black sm:text-lg" : "text-lg font-black sm:text-xl",
          isSelected ? "text-white" : "text-slate-300 group-hover:text-white",
        ].join(" ")}
      >
        {label}
      </span>

      {description && (
        <span
          className={[
            "mt-2 block leading-relaxed transition-colors duration-300",
            compact ? "text-[10px] sm:text-[11px]" : "text-[11px] sm:text-[12px]",
            isSelected ? "text-brand-2/80" : "text-slate-500 group-hover:text-slate-400",
          ].join(" ")}
        >
          {description}
        </span>
      )}

      <div className="pointer-events-none absolute -inset-full rotate-45 translate-x-[-100%] bg-gradient-to-tr from-brand/0 via-white/[0.01] to-brand/0 transition-transform duration-1000 group-hover:translate-x-[100%]" />
    </button>
  )
}
