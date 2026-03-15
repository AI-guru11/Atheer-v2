export default function Badge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold tracking-[0.14em] text-[#c4b5fd] ${className}`}
    >
      {children}
    </span>
  );
}