import { cx } from "../../utils/helpers"
import {
  formatConfidence,
  formatConfidencePercent,
  formatSourceLabel,
  getRevealStyleDescription,
  getExecutionModeDisplay,
} from "../../utils/recommendationDisplay"

export default function BuilderRecommendationPreview({ recommendation }) {
  if (!recommendation || !recommendation.topPick) {
    return (
      <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
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

      {/* ── A. Context intro (text-only, not a card) ── */}
      <div className="mb-3 text-right">
        <div className="mb-2.5 flex items-center justify-end gap-3">
          <div className="flex items-center gap-1.5">
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
            <span className="text-[10px] tabular-nums text-slate-500/70">
              {formatConfidencePercent(confidenceScore)}
            </span>
          </div>
          <span className="text-[11px] font-semibold tracking-wide text-cyan-300/60">
            توصية أثير
          </span>
        </div>

        <h3 className="text-xl font-bold leading-snug text-white sm:text-2xl">
          {summaryAngle}
        </h3>
      </div>

      {/* ── B. Top Recommendation (dominant card) ── */}
      <div className="relative overflow-hidden rounded-[28px] border border-cyan-300/20 bg-gradient-to-bl from-cyan-300/[0.06] via-white/[0.03] to-violet-500/[0.03] p-5 sm:p-7">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-l from-transparent via-cyan-300/40 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-cyan-300/20 via-cyan-300/10 to-transparent" />

        <div className="space-y-3.5 text-right">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full bg-white/[0.07] px-3 py-1 text-[13px] font-semibold tabular-nums text-white/90">
              {topPick.priceRange}
            </span>

            <span className="rounded-full border border-cyan-300/25 bg-cyan-300/[0.10] px-3 py-1 text-[11px] font-bold tracking-wide text-cyan-300">
              {topPick.label}
            </span>
          </div>

          <div className="space-y-1">
            <h4 className="text-[1.4rem] font-bold leading-snug text-white sm:text-2xl">
              {topPick.title}
            </h4>
            {topPick.subtitle && (
              <p className="text-[13px] font-medium text-cyan-300/50">
                {topPick.subtitle}
              </p>
            )}
          </div>

          <p className="text-[14px] leading-relaxed text-slate-300">
            {topPick.whyFit}
          </p>

          {topPick.shortDescription && (
            <>
              <div className="h-px bg-gradient-to-l from-transparent via-white/[0.06] to-transparent" />
              <p className="text-[12px] leading-relaxed text-slate-400/70">
                {topPick.shortDescription}
              </p>
            </>
          )}

          <span className="block text-[10px] text-slate-500/70">
            {formatSourceLabel(topPick.sourceName)}
          </span>
        </div>
      </div>

      {/* ── C. Alternatives (compact rows) ── */}
      {visibleAlternatives.length > 0 && (
        <div className="mt-5 text-right">
          <p className="mb-1.5 px-1 text-[10px] font-semibold tracking-widest text-slate-500/60">
            خيارات بديلة
          </p>
          <div className="divide-y divide-white/[0.04] overflow-hidden rounded-[16px] border border-white/[0.05] bg-white/[0.015]">
            {visibleAlternatives.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 px-4 py-2.5"
              >
                <span className="shrink-0 text-[11px] tabular-nums text-slate-500/80">
                  {item.priceRange}
                </span>
                <div className="min-w-0 flex-1 flex items-center justify-end gap-2">
                  <span className="truncate text-[13px] font-semibold text-white/80">
                    {item.title}
                  </span>
                  <span className="shrink-0 rounded-full bg-white/[0.04] px-2 py-0.5 text-[9px] font-semibold text-slate-400/70">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── D. Experience details (minimal strip) ── */}
      <div className="mt-4 grid grid-cols-2 gap-1.5">
        <div className="rounded-[12px] bg-white/[0.02] px-3 py-2.5 text-right">
          <p className="text-[9px] font-semibold tracking-widest text-slate-500/50">
            الكشف
          </p>
          <p className="mt-0.5 text-[12px] font-bold leading-snug text-white/75">
            {revealDescription}
          </p>
        </div>

        <div className="rounded-[12px] bg-white/[0.02] px-3 py-2.5 text-right">
          <p className="text-[9px] font-semibold tracking-widest text-slate-500/50">
            التنفيذ
          </p>
          <p className="mt-0.5 text-[12px] font-bold leading-snug text-white/75">
            {executionDisplay.title}
          </p>
        </div>
      </div>
    </div>
  )
}
