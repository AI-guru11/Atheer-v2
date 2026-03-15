export default function BuilderProgress({
  currentStep,
  totalSteps,
  currentTitle,
}) {
  const progressPercentage = Math.round((currentStep / totalSteps) * 100)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-cyan-300">
          الخطوة {currentStep} من {totalSteps}
        </div>

        <div className="text-sm text-slate-400">{currentTitle}</div>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,#7c5cff,#22d3ee)] transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  )
}