import { cx } from "../../utils/helpers"
import {
  formatConfidence,
  formatConfidencePercent,
  formatSourceLabel,
  formatPriceRangeFromString,
  getRevealStyleDescription,
  getExecutionModeDisplay,
} from "../../utils/recommendationDisplay"

function ConfidenceDot({ level }) {
  const color = {
    high: "bg-emerald-400",
    good: "bg-cyan-400",
    fair: "bg-amber-400",
    low: "bg-slate-400",
  }

  return (
    <span className={cx("inline-block h-2 w-2 rounded-full", color[level] || color.fair)} />
  )
}

export default function BuilderRecommendationPreview({ recommendation }) {
  if (!recommendation || !recommendation.topPick) {
    return (
      <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
        <div className="space-y-3 text-right">
          <h3 className="text-xl font-bold text-white sm:text-2xl">
            لا توجد توصية جاهزة بعد
          </h3>
          <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
            أكمل الخطوات المطلوبة حتى يبني أثير اتجاه الهدية والتجربة المناسبة.
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

  return (
    <div className="space-y-3 sm:space-y-4">

      {/* ── A. Recommendation Hero ── */}
      <div className="relative overflow-hidden rounded-[28px] border border-cyan-300/15 bg-gradient-to-bl from-cyan-300/[0.06] via-white/[0.02] to-violet-500/[0.04] p-5 sm:p-6">
        <div className="space-y-3 text-right">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-cyan-300">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-300 animate-pulse" />
            توصية أثير
          </span>

          <h3 className="text-xl font-bold leading-snug text-white sm:text-2xl">
            {summaryAngle}
          </h3>

          <p className="text-[13px] leading-relaxed text-slate-400">
            بناءً على تفضيلاتك، اخترنا لك ما يناسب المناسبة والشخص
          </p>

          <div className="flex items-center justify-end gap-2 text-sm text-slate-400">
            <span>{confidence.text}</span>
            <ConfidenceDot level={confidence.level} />
            <span className="text-xs text-slate-500">{formatConfidencePercent(confidenceScore)}</span>
          </div>
        </div>
      </div>

      {/* ── B. Top Recommendation Card (Primary) ── */}
      <div className="relative overflow-hidden rounded-[28px] border border-cyan-300/20 bg-gradient-to-bl from-cyan-300/[0.05] via-white/[0.03] to-white/[0.01] p-5 sm:p-7">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-l from-transparent via-cyan-300/40 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-cyan-300/20 via-cyan-300/10 to-transparent" />

        <div className="space-y-4 text-right">
          <div className="flex items-start justify-between gap-3">
            <span className="shrink-0 rounded-full border border-cyan-300/30 bg-cyan-300/[0.12] px-3.5 py-1.5 text-[11px] font-bold tracking-wide text-cyan-300">
              {topPick.label}
            </span>

            <span className="rounded-full bg-white/[0.08] px-3.5 py-1.5 text-[13px] font-semibold tabular-nums text-white/90">
              {topPick.priceRange}
            </span>
          </div>

          <div className="space-y-1.5">
            <h4 className="text-xl font-bold leading-snug text-white sm:text-2xl">
              {topPick.title}
            </h4>
            {topPick.subtitle && (
              <p className="text-[13px] font-medium text-cyan-300/60">
                {topPick.subtitle}
              </p>
            )}
          </div>

          <p className="text-[14px] leading-relaxed text-slate-300">
            {topPick.whyFit}
          </p>

          {topPick.shortDescription && (
            <p className="text-[13px] leading-relaxed text-slate-400/80">
              {topPick.shortDescription}
            </p>
          )}

          <div className="pt-1">
            <span className="text-[11px] text-slate-500">
              {formatSourceLabel(topPick.sourceName)}
            </span>
          </div>
        </div>
      </div>

      {/* ── C. Alternatives (Secondary) ── */}
      {visibleAlternatives.length > 0 && (
        <div className="space-y-1.5">
          <p className="px-1 text-[11px] font-semibold tracking-wide text-slate-500 text-right">
            خيارات أخرى
          </p>
          <div className="grid gap-2">
            {visibleAlternatives.map((item) => (
              <div
                key={item.id}
                className="rounded-[18px] border border-white/[0.06] bg-white/[0.02] px-4 py-3"
              >
                <div className="flex items-start justify-between gap-3 text-right">
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full border border-white/8 bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-semibold text-slate-400">
                        {item.label}
                      </span>
                    </div>
                    <h5 className="text-[14px] font-bold leading-snug text-white/85">
                      {item.title}
                    </h5>
                    <p className="text-[12px] leading-relaxed text-slate-400/80 line-clamp-2">
                      {item.whyFit}
                    </p>
                  </div>
                  <span className="shrink-0 pt-1 text-[11px] tabular-nums text-slate-500">
                    {item.priceRange}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── D + E. Experience Direction & Execution Mode (Compact) ── */}
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-[18px] border border-white/[0.06] bg-white/[0.02] px-3.5 py-3">
          <div className="space-y-1 text-right">
            <p className="text-[10px] font-semibold tracking-wide text-slate-500">
              تجربة الكشف
            </p>
            <p className="text-[13px] font-bold leading-snug text-white">
              {revealDescription}
            </p>
          </div>
        </div>

        <div className="rounded-[18px] border border-white/[0.06] bg-white/[0.02] px-3.5 py-3">
          <div className="space-y-1 text-right">
            <p className="text-[10px] font-semibold tracking-wide text-slate-500">
              طريقة التنفيذ
            </p>
            <p className="text-[13px] font-bold leading-snug text-white">
              {executionDisplay.title}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
