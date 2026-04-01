export default function BuilderChoiceCard({
  label,
  description,
  isSelected = false,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        relative flex w-full flex-col items-center justify-center overflow-hidden
        rounded-[32px] border px-6 py-8 text-center transition-all duration-300 ease-out
        group active:scale-[0.97] backdrop-blur-xl
        ${isSelected
          ? "border-brand/40 bg-brand/[0.06] shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(129,101,255,0.12)] scale-[1.02] z-10"
          : "border-white/[0.06] bg-white/[0.01] hover:border-white/20 hover:bg-white/[0.04] hover:-translate-y-1"
        }
      `}
    >
      {/* تأثير الإضاءة العلوية (Top Sheen) */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

      {/* مؤشر الاختيار النيوني - يظهر فقط عند التحديد */}
      {isSelected && (
        <div className="absolute top-0 left-1/2 h-[2px] w-16 -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-2 to-transparent shadow-[0_0_12px_rgba(56,225,245,0.8)]" />
      )}

      {/* المحتوى النصي */}
      <span className={`
        block text-lg font-black tracking-tight transition-colors duration-300
        ${isSelected ? "text-white" : "text-slate-300 group-hover:text-white"}
      `}>
        {label}
      </span>

      {description && (
        <span className={`
          mt-3 block text-[11px] font-medium leading-relaxed tracking-wide transition-colors duration-300
          ${isSelected ? "text-brand-2/80" : "text-slate-500 group-hover:text-slate-400"}
        `}>
          {description}
        </span>
      )}

      {/* تأثير التوهج عند الحوّامة (Hover Glow) */}
      <div className="absolute -inset-full bg-gradient-to-tr from-brand/0 via-white/[0.01] to-brand/0 rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
    </button>
  )
}
