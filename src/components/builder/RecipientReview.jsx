import {
  getRevealStyleDescription,
  getExecutionModeDisplay,
} from "../../utils/recommendationDisplay"
import { getGiftPathMeta } from "../../lib/giftSession"

export default function RecipientReview({
  recommendation,
  recipientData,
  giftPath,
  onGenerateLink,
  onBack,
}) {
  const topPick = recommendation?.topPick
  const executionDisplay = getExecutionModeDisplay(
    recommendation?.executionMode?.controlMode,
  )
  const revealDescription = getRevealStyleDescription(
    recommendation?.revealRecommendation?.tone,
  )
  const pathMeta = getGiftPathMeta(giftPath)

  const senderRows = [
    { label: "اسم المرسل", value: recipientData.senderName },
    recipientData.message ? { label: "الرسالة", value: recipientData.message } : null,
  ].filter(Boolean)

  const recipientRows = [
    { label: "اسم المستلم", value: recipientData.name },
    { label: "الجوال", value: recipientData.phone },
    { label: "البريد", value: recipientData.email },
  ].filter(Boolean)

  const reviewDescription = giftPath === "exactGift"
    ? "تحقق من اسمك وبيانات المستلم والهدية المحددة قبل توليد رابط الكشف. هذا الرابط سيأخذ المستلم إلى لحظة كشف ثم إلى صفحة الاستلام."
    : "تحقق من اسمك وبيانات المستلم والخيارات المقترحة قبل توليد رابط الاختيار. هذا الرابط سيأخذ المستلم إلى تجربة ثم إلى قائمة الخيارات."

  const linkActionLabel = giftPath === "exactGift" ? "توليد رابط كشف الهدية" : "توليد رابط اختيار الهدية"

  return (
    <div className="text-right">
      <div className="mb-6">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/20 bg-violet-400/[0.08] px-3 py-1.5 text-[12px] font-semibold text-violet-300">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-400" />
          {pathMeta.badge}
        </span>

        <h2 className="mt-3 text-xl font-bold leading-tight text-white sm:text-2xl">
          راجع تفاصيل الهدية قبل توليد الرابط
        </h2>
        <p className="mt-1.5 text-[13px] leading-relaxed text-slate-400">
          {reviewDescription}
        </p>
      </div>

      <div className="space-y-3">
        {topPick && (
          <div className="relative overflow-hidden rounded-[18px] border border-cyan-300/20 bg-cyan-300/[0.04] p-4">
            <p className="mb-2.5 text-[10px] font-bold tracking-widest text-cyan-300/60">
              {giftPath === "exactGift" ? "الهدية التي ستظهر للمستلم" : "الخيار الأبرز داخل المجموعة"}
            </p>
            <div className="flex items-start justify-between gap-3">
              <span className="shrink-0 rounded-full bg-white/[0.07] px-2.5 py-0.5 text-[12px] tabular-nums text-white/80">
                {topPick.priceRange}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-bold leading-snug text-white">{topPick.title}</p>
                {topPick.whyFit && (
                  <p className="mt-0.5 text-[12px] leading-relaxed text-slate-400">
                    {topPick.whyFit}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="rounded-[18px] border border-white/[0.08] bg-white/[0.025] p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-[11px] font-semibold text-white/75">
              {pathMeta.label}
            </span>
            <p className="text-[10px] font-bold tracking-widest text-slate-500/70">
              كيف ستسير التجربة؟
            </p>
          </div>

          <p className="mt-3 text-[13px] leading-relaxed text-slate-300">
            {pathMeta.senderNote}
          </p>

          <div className="mt-3 flex flex-wrap justify-end gap-2">
            {pathMeta.steps.map((step, index) => (
              <span
                key={step}
                className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] text-white/80"
              >
                {index + 1}. {step}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-[18px] border border-violet-400/15 bg-violet-400/[0.03] p-4">
          <p className="mb-2.5 text-[10px] font-bold tracking-widest text-violet-300/60">
            بيانات المرسل
          </p>
          <div className="space-y-1.5">
            {senderRows.map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-3"
              >
                <span className="min-w-0 flex-1 break-words text-[13px] text-white/80">
                  {row.value}
                </span>
                <span className="shrink-0 text-[11px] text-slate-500">
                  {row.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[18px] border border-white/[0.08] bg-white/[0.025] p-4">
          <p className="mb-2.5 text-[10px] font-bold tracking-widest text-slate-500/70">
            بيانات المستلم
          </p>
          <div className="space-y-1.5">
            {recipientRows.map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-3"
              >
                <span className="min-w-0 flex-1 break-words text-[13px] text-white/80">
                  {row.value}
                </span>
                <span className="shrink-0 text-[11px] text-slate-500">
                  {row.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          <div className="rounded-[12px] bg-white/[0.025] px-3 py-3">
            <p className="text-[10px] font-semibold tracking-widest text-slate-500/70">
              أسلوب الكشف
            </p>
            <p className="mt-1 text-[13px] font-bold leading-snug text-white/80">
              {revealDescription}
            </p>
          </div>
          <div className="rounded-[12px] bg-white/[0.025] px-3 py-3">
            <p className="text-[10px] font-semibold tracking-widest text-slate-500/70">
              طريقة التنفيذ
            </p>
            <p className="mt-1 text-[13px] font-bold leading-snug text-white/80">
              {executionDisplay.title}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-7 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-white/[0.08] bg-white/[0.02] px-5 py-2.5 text-[13px] font-semibold text-slate-400 transition-colors duration-200 hover:border-white/15 hover:text-slate-200"
        >
          تعديل
        </button>
        <button
          type="button"
          onClick={onGenerateLink}
          className="rounded-full bg-[linear-gradient(90deg,#7c5cff,#22d3ee)] px-6 py-3 text-[15px] font-bold text-white shadow-[0_10px_30px_rgba(34,211,238,0.15)] transition-all duration-200 hover:shadow-[0_14px_40px_rgba(34,211,238,0.22)] active:scale-[0.98]"
        >
          {linkActionLabel}
        </button>
      </div>
    </div>
  )
}
