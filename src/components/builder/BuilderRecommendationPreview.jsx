import { cx } from "../../utils/helpers"
import {
  formatConfidence,
  formatConfidencePercent,
  formatSourceLabel,
  getRevealStyleDescription,
  getExecutionModeDisplay,
} from "../../utils/recommendationDisplay"

function ConfidenceBadge({ score }) {
  const confidence = formatConfidence(score)

  const ring = {
    high: "border-emerald-400/30 bg-emerald-400/10",
    good: "border-cyan-400/30 bg-cyan-400/10",
    fair: "border-amber-400/30 bg-amber-400/10",
    low: "border-slate-400/20 bg-slate-400/10",
  }

  const dot = {
    high: "bg-emerald-400",
    good: "bg-cyan-400",
    fair: "bg-amber-400",
    low: "bg-slate-400",
  }

  const textColor = {
    high: "text-emerald-300",
    good: "text-cyan-300",
    fair: "text-amber-300",
    low: "text-slate-400",
  }

  return (
    <div className={cx(
      "inline-flex items-center gap-2 rounded-full border px-3 py-1.5",
      ring[confidence.level] || ring.fair,
    )}>
      <span className={cx("inline-block h-1.5 w-1.5 rounded-full", dot[confidence.level] || dot.fair)} />
      <span className={cx("text-[11px] font-semibold", textColor[confidence.level] || textColor.fair)}>
        {confidence.text}
      </span>
      <span className="text-[10px] tabular-nums text-slate-500">
        {formatConfidencePercent(score)}
      </span>
    </div>
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

  const executionDisplay = getExecutionModeDisplay(executionMode.controlMode)
  const revealDescription = getRevealStyleDescription(revealRecommendation.tone)
  const visibleAlternatives = alternatives?.slice(0, 2) || []

  return (
    <div className="space-y-3">

      {/* ── A. Recommendation Hero ── */}
      <div className="relative overflow-hidden rounded-[28px] border border-cyan-300/15 bg-gradient-to-bl from-cyan-300/[0.06] via-white/[0.02] to-violet-500/[0.04] p-5 sm:p-6">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-cyan-300/30 to-transparent" />

        <div className="space-y-3 text-right">
          <div className="flex items-center justify-between gap-3">
            <ConfidenceBadge score={confidenceScore} />

            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-cyan-300">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-300 animate-pulse" />
              توصية أثير
            </span>
          </div>

          <h3 className="text-xl font-bold leading-snug text-white sm:text-2xl">
            {summaryAngle}
          </h3>

          <p className="text-[13px] leading-relaxed text-slate-400">
            بناءً على تفضيلاتك، اخترنا لك ما يناسب المناسبة والشخص
          </p>
        </div>
      </div>

      {/* ── B. Top Recommendation Card (Primary) ── */}
      <div className="relative overflow-hidden rounded-[28px] border border-cyan-300/20 bg-gradient-to-bl from-cyan-300/[0.05] via-white/[0.03] to-white/[0.01] p-5 sm:p-7">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-l from-transparent via-cyan-300/40 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-cyan-300/20 via-cyan-300/10 to-transparent" />

        <div className="space-y-4 text-right">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full bg-white/[0.08] px-3.5 py-1.5 text-[13px] font-semibold tabular-nums text-white/90">
              {topPick.priceRange}
            </span>

            <span className="shrink-0 rounded-full border border-cyan-300/30 bg-cyan-300/[0.12] px-3.5 py-1.5 text-[11px] font-bold tracking-wide text-cyan-300">
              {topPick.label}
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
            <>
              <div className="h-px bg-gradient-to-l from-transparent via-white/[0.06] to-transparent" />
              <p className="text-[13px] leading-relaxed text-slate-400/80">
                {topPick.shortDescription}
              </p>
            </>
          )}

          <div className="flex items-center justify-end gap-1.5 pt-0.5">
            <span className="text-[11px] text-slate-500">
              {formatSourceLabel(topPick.sourceName)}
            </span>
            <span className="inline-block h-1 w-1 rounded-full bg-slate-600" />
            <span className="text-[11px] text-slate-500">مختار لك</span>
          </div>
        </div>
      </div>

      {/* ── C. Alternatives (Secondary) ── */}
      {visibleAlternatives.length > 0 && (
        <div className="space-y-2">
          <p className="px-1 text-[11px] font-semibold tracking-wide text-slate-500 text-right">
            خيارات أخرى
          </p>
          <div className="grid gap-2">
            {visibleAlternatives.map((item) => (
              <div
                key={item.id}
                className="group rounded-[20px] border border-white/[0.06] bg-white/[0.02] px-4 py-3.5 transition-colors duration-200 hover:border-white/[0.10] hover:bg-white/[0.04]"
              >
                <div className="flex items-start justify-between gap-3 text-right">
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <div className="flex items-center justify-end gap-2">
                      <h5 className="text-[14px] font-bold leading-snug text-white/90 group-hover:text-white transition-colors">
                        {item.title}
                      </h5>
                      <span className="shrink-0 rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-semibold text-slate-400">
                        {item.label}
                      </span>
                    </div>
                    <p className="text-[12px] leading-relaxed text-slate-400/80 line-clamp-2">
                      {item.whyFit}
                    </p>
                  </div>
                  <span className="shrink-0 pt-0.5 text-[11px] tabular-nums text-slate-500">
                    {item.priceRange}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── D + E. Experience Direction & Execution Mode ── */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div className="rounded-[20px] border border-white/[0.06] bg-white/[0.02] px-4 py-3.5">
          <div className="space-y-1.5 text-right">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              تجربة الكشف
            </p>
            <p className="text-[13px] font-bold leading-snug text-white">
              {revealDescription}
            </p>
          </div>
        </div>

        <div className="rounded-[20px] border border-white/[0.06] bg-white/[0.02] px-4 py-3.5">
          <div className="space-y-1.5 text-right">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              طريقة التنفيذ
            </p>
            <p className="text-[13px] font-bold leading-snug text-white">
              {executionDisplay.title}
            </p>
            <p className="text-[11px] leading-relaxed text-slate-500">
              {executionDisplay.benefit}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
