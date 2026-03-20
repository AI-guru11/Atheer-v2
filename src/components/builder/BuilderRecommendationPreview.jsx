import { cx } from "../../utils/helpers"
import {
  formatConfidence,
  formatSourceLabel,
  getRevealStyleDescription,
  getExecutionModeDisplay,
} from "../../utils/recommendationDisplay"

export default function BuilderRecommendationPreview({ recommendation }) {
  if (!recommendation || !recommendation.topPick) {
    return (
      <div className="charcoal-card rounded-[24px] p-5">
        <div className="space-y-2 text-right">
          <h3 className="text-lg font-bold text-white">
            لا توجد توصية بعد
          </h3>
          <p className="text-sm leading-relaxed text-slate-400">
            أكمل الخطوات حتى يبني أثير التوصية المناسبة.
          </p>
        </div>
      </div>
    )
  }

  const {
    topPick,
    alternatives,
    revealRecommendation,
    executionMode,
    summaryAngle,
    confidenceScore,
  } = recommendation

  const confidence = formatConfidence(confidenceScore)
  const executionDisplay = getExecutionModeDisplay(executionMode.controlMode)
  const revealDescription = getRevealStyleDescription(revealRecommendation.tone)
  const visibleAlternatives = alternatives?.slice(0, 2) || []

  const dotColor = {
    high: "bg-emerald-400",
    good: "bg-cyan-400",
    fair: "bg-amber-400",
    low: "bg-slate-400",
  }

  const labelColor = {
    high: "text-emerald-400",
    good: "text-cyan-400",
    fair: "text-amber-400",
    low: "text-slate-400",
  }

  return (
    <div>

      {/* ── A. Context intro — single signal leads, then headline ── */}
      <div className="mb-4 text-right">
        <div className="mb-2.5 flex items-center justify-end gap-1.5">
          <span className={cx(
            "inline-block h-1.5 w-1.5 rounded-full",
            dotColor[confidence.level] || dotColor.fair,
          )} />
          <span className={cx(
            "text-[11px] font-medium",
            labelColor[confidence.level] || labelColor.fair,
          )}>
            {confidence.text}
          </span>
        </div>

        <h3 className="text-xl font-bold leading-snug text-white sm:text-[1.35rem]">
          {summaryAngle}
        </h3>
      </div>

      {/* ── B. Top recommendation — premium, confident, uncluttered ── */}
      <div className="relative overflow-hidden rounded-[28px] border border-cyan-300/20 bg-gradient-to-bl from-cyan-300/[0.06] via-white/[0.03] to-violet-500/[0.03] p-5 sm:p-6">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-l from-transparent via-cyan-300/40 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-cyan-300/20 via-cyan-300/10 to-transparent" />

        <div className="space-y-3 text-right">

          {/* Badge + price on one line */}
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full bg-white/[0.07] px-3 py-1 text-[13px] font-semibold tabular-nums text-white/90">
              {topPick.priceRange}
            </span>
            <span className="rounded-full border border-cyan-300/25 bg-cyan-300/[0.10] px-3 py-1 text-[11px] font-bold tracking-wide text-cyan-300">
              {topPick.label}
            </span>
          </div>

          {/* Product identity */}
          <div className="space-y-0.5">
            <h4 className="text-[1.35rem] font-bold leading-snug text-white">
              {topPick.title}
            </h4>
            {topPick.subtitle && (
              <p className="text-[12px] font-medium text-cyan-300/45">
                {topPick.subtitle}
              </p>
            )}
          </div>

          {/* Single supporting line — why this fits */}
          <p className="text-[13px] leading-relaxed text-slate-300/80">
            {topPick.whyFit}
          </p>

          {/* Source — minimal, bottom of card */}
          {topPick.sourceName && (
            <span className="block text-[11px] text-slate-500/80">
              {formatSourceLabel(topPick.sourceName)}
            </span>
          )}
        </div>
      </div>

      {/* ── C. Alternatives — clean supporting rows ── */}
      {visibleAlternatives.length > 0 && (
        <div className="mt-5 text-right">
          <p className="mb-2 px-1 text-[11px] font-semibold tracking-wide text-slate-400/70">
            خيارات أخرى
          </p>
          <div className="divide-y divide-white/[0.04] overflow-hidden rounded-[16px] border border-white/[0.07] bg-white/[0.02]">
            {visibleAlternatives.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 px-4 py-3"
              >
                <span className="shrink-0 text-[11px] tabular-nums text-slate-500/80">
                  {item.priceRange}
                </span>
                <div className="min-w-0 flex-1 flex items-center justify-end gap-2">
                  <span className="truncate text-[13px] font-semibold text-white/80">
                    {item.title}
                  </span>
                  <span className="shrink-0 rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[10px] font-semibold text-slate-400/80">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── D. Experience strip — reveal + execution mode ── */}
      <div className="mt-4 grid grid-cols-2 gap-1.5">
        <div className="rounded-[12px] bg-white/[0.025] px-3 py-3 text-right">
          <p className="text-[10px] font-semibold tracking-widest text-slate-500/70">
            الكشف
          </p>
          <p className="mt-1 text-[13px] font-bold leading-snug text-white/80">
            {revealDescription}
          </p>
        </div>

        <div className="rounded-[12px] bg-white/[0.025] px-3 py-3 text-right">
          <p className="text-[10px] font-semibold tracking-widest text-slate-500/70">
            التنفيذ
          </p>
          <p className="mt-1 text-[13px] font-bold leading-snug text-white/80">
            {executionDisplay.title}
          </p>
        </div>
      </div>
    </div>
  )
}
