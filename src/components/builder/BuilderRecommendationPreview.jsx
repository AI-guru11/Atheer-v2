import { cx } from "../../utils/helpers"
import {
  formatConfidence,
  formatSourceLabel,
  getRevealStyleDescription,
  getExecutionModeDisplay,
} from "../../utils/recommendationDisplay"

export default function BuilderRecommendationPreview({
  recommendation,
  locked = false,
  budgetLabel = "",
  interestLabel = "",
  giftPathLabel = "",
}) {
  if (!recommendation || !recommendation.topPick) {
    return (
      <div className="reveal-block charcoal-card rounded-[32px] p-8 text-center border-white/[0.03]">
        <div className="space-y-3">
          <div className="mx-auto h-12 w-12 rounded-full bg-white/[0.02] flex items-center justify-center border border-white/[0.05]">
             <span className="h-2 w-2 rounded-full bg-slate-600 animate-pulse" />
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            بانتظار بناء التوصية
          </h3>
          <p className="text-sm leading-relaxed text-slate-500 max-w-[240px] mx-auto">
            أكمل خطوات التصميم ليقوم محرك أثير بتحليل الخيارات المناسبة.
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
    high: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]",
    good: "bg-brand-2 shadow-[0_0_8px_rgba(56,225,245,0.5)]",
    fair: "bg-amber-400 shadow-[0_0_8px_rgba(fb,bf,24,0.5)]",
    low: "bg-slate-500",
  }

  const labelColor = {
    high: "text-emerald-400",
    good: "text-brand-2",
    fair: "text-amber-400",
    low: "text-slate-500",
  }

  // --- الهيكل المشترك للعناصر المعلوماتية الصغيرة ---
  const InfoBadge = ({ label, value }) => (
    <div className="rounded-2xl bg-white/[0.02] border border-white/[0.04] px-4 py-3 text-right transition-all hover:bg-white/[0.04]">
      <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 mb-1">
        {label}
      </p>
      <p className="text-[13px] font-bold text-white/90 leading-tight">
        {value}
      </p>
    </div>
  )

  const commonHeader = (
    <div className="mb-6 text-right space-y-2">
      <div className="flex items-center justify-end gap-2">
        <span className={cx("text-[11px] font-bold tracking-wide", labelColor[confidence.level] || labelColor.fair)}>
          {confidence.text}
        </span>
        <span className={cx("inline-block h-1.5 w-1.5 rounded-full animate-pulse", dotColor[confidence.level] || dotColor.fair)} />
      </div>
      <h3 className="text-2xl font-black leading-tight text-white tracking-tight sm:text-3xl">
        {summaryAngle}
      </h3>
    </div>
  )

  if (locked) {
    return (
      <div className="reveal-block">
        {commonHeader}

        <div className="relative overflow-hidden rounded-[36px] border border-brand-2/20 bg-gradient-to-br from-brand-2/[0.08] via-white/[0.02] to-brand/[0.05] p-6 sm:p-8 shadow-2xl">
          {/* تأثير النيون العلوي */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-brand-2/40 to-transparent" />
          
          <div className="relative z-10 space-y-5 text-right">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-white/[0.05] px-4 py-1 text-[13px] font-bold tabular-nums text-white/90">
                {budgetLabel || topPick.priceRange}
              </span>
               <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-bold text-white/60">
                {giftPathLabel || "مسار خاص"}
              </span>
            </div>

            <div className="py-4 space-y-3">
              <div className="flex items-center justify-end gap-2 text-brand-2">
                 <h4 className="text-xl font-black tracking-tight text-white">
                  تم تأمين تفاصيل الهدية
                </h4>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">
                أثير صمم هذه التجربة بناءً على ذوق <span className="text-white font-bold">{interestLabel || "المستهدف"}</span>. تفاصيل المنتجات المحددة تظهر فقط في مرحلة التنفيذ لضمان حصرية التجربة.
              </p>
            </div>

            <div className="flex flex-wrap justify-end gap-2 pt-2">
              <span className="rounded-lg bg-white/[0.04] px-3 py-1.5 text-[11px] font-bold text-slate-300 border border-white/[0.05]">
                {topPick.label}
              </span>
              <span className="rounded-lg bg-brand/[0.08] px-3 py-1.5 text-[11px] font-bold text-brand border border-brand/10">
                تنسيق حصري داخل الطلب
              </span>
            </div>
          </div>
          
          {/* خلفية غامضة للتشويق */}
          <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-brand/10 blur-[60px]" />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <InfoBadge label="أسلوب الكشف" value={revealDescription} />
          <InfoBadge label="طريقة التنفيذ" value={executionDisplay.title} />
        </div>
      </div>
    )
  }

  return (
    <div className="reveal-block">
      {commonHeader}

      <div className="relative overflow-hidden rounded-[36px] border border-brand-2/30 bg-gradient-to-br from-brand-2/[0.1] via-white/[0.03] to-brand/[0.05] p-6 sm:p-8 shadow-2xl transition-all hover:border-brand-2/50 group">
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-brand-2/50 to-transparent" />
        
        <div className="relative z-10 space-y-5 text-right">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-white/[0.08] px-4 py-1 text-[13px] font-bold tabular-nums text-white">
              {topPick.priceRange}
            </span>
            <span className="rounded-lg bg-brand-2/10 px-3 py-1 text-[11px] font-black tracking-widest text-brand-2 uppercase">
              {topPick.label}
            </span>
          </div>

          <div className="space-y-1">
            <h4 className="text-2xl font-black leading-tight text-white group-hover:text-brand-2 transition-colors">
              {topPick.title}
            </h4>
            {topPick.subtitle && (
              <p className="text-xs font-bold text-brand-2/60 tracking-wide uppercase">
                {topPick.subtitle}
              </p>
            )}
          </div>

          <p className="text-[15px] leading-relaxed text-slate-300">
            {topPick.whyFit}
          </p>

          {topPick.sourceName && (
            <div className="pt-2 flex items-center justify-end gap-2">
              <span className="text-[11px] font-bold text-slate-500">
                {formatSourceLabel(topPick.sourceName)}
              </span>
              <div className="h-1 w-1 rounded-full bg-slate-700" />
            </div>
          )}
        </div>
      </div>

      {visibleAlternatives.length > 0 && (
        <div className="mt-8 text-right">
          <h5 className="mb-3 px-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            خيارات بديلة منسقة
          </h5>
          <div className="space-y-2">
            {visibleAlternatives.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/[0.05] bg-white/[0.01] px-5 py-4 transition-all hover:bg-white/[0.03] hover:border-white/10"
              >
                <span className="text-xs font-bold tabular-nums text-slate-500">
                  {item.priceRange}
                </span>
                <div className="flex flex-1 items-center justify-end gap-3 min-w-0">
                  <span className="truncate text-sm font-bold text-white/90">
                    {item.title}
                  </span>
                  <span className="shrink-0 rounded-md bg-white/[0.05] px-2 py-0.5 text-[9px] font-black text-slate-400 uppercase tracking-tighter">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 grid grid-cols-2 gap-3">
        <InfoBadge label="أسلوب الكشف" value={revealDescription} />
        <InfoBadge label="طريقة التنفيذ" value={executionDisplay.title} />
      </div>
    </div>
  )
}
