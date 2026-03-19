export default function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-[linear-gradient(135deg,#7c5cff_0%,#8b5cf6_100%)] text-white shadow-[0_6px_24px_rgba(124,92,255,0.22)] hover:shadow-[0_6px_24px_rgba(124,92,255,0.34)]",
    secondary:
      "glass-panel text-white hover:bg-white/10",
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