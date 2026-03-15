export default function BuilderActions({
  canGoBack,
  canGoNext,
  isLastStep,
  onPrevious,
  onNext,
  onReset,
  labels,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <button
        type="button"
        onClick={onReset}
        className="text-sm font-semibold text-slate-400 transition hover:text-white"
      >
        {labels.reset}
      </button>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onPrevious}
          disabled={!canGoBack}
          className={[
            "rounded-full border px-6 py-3 text-base font-semibold transition",
            canGoBack
              ? "border-white/10 bg-white/[0.03] text-white hover:border-cyan-300/30"
              : "cursor-not-allowed border-white/5 bg-white/[0.02] text-slate-600",
          ].join(" ")}
        >
          {labels.previous}
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!canGoNext}
          className={[
            "rounded-full px-6 py-3 text-base font-bold transition",
            canGoNext
              ? "bg-[linear-gradient(90deg,#7c5cff,#22d3ee)] text-white shadow-[0_12px_35px_rgba(34,211,238,0.18)]"
              : "cursor-not-allowed bg-white/10 text-slate-500",
          ].join(" ")}
        >
          {isLastStep ? labels.finish : labels.next}
        </button>
      </div>
    </div>
  )
}