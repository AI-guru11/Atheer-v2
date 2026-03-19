export default function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-[linear-gradient(135deg,#7c5cff_0%,#8b5cf6_65%,#22d3ee_100%)] text-white shadow-[0_6px_24px_rgba(124,92,255,0.25)] hover:shadow-[0_8px_28px_rgba(124,92,255,0.38)]",
    secondary:
      "border border-white/[0.10] bg-white/[0.04] backdrop-blur-sm text-white hover:bg-white/[0.07] hover:border-white/[0.15]",
    ghost:
      "bg-transparent text-white hover:bg-white/5",
  };

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-200 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}