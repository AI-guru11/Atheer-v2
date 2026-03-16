import {
  getRevealStyleDescription,
  getExecutionModeDisplay,
} from "../../utils/recommendationDisplay"

export default function DirectDeliveryReview({
  recommendation,
  shippingData,
  onApprove,
  onBack,
}) {
  const topPick = recommendation?.topPick
  const executionDisplay = getExecutionModeDisplay(
    recommendation?.executionMode?.controlMode,
  )
  const revealDescription = getRevealStyleDescription(
    recommendation?.revealRecommendation?.tone,
  )

  const deliveryRows = [
    { label: "المستلم", value: shippingData.recipientName },
    { label: "الجوال", value: shippingData.phone },
    { label: "المدينة", value: shippingData.city },
    { label: "العنوان", value: shippingData.address },
    shippingData.notes ? { label: "ملاحظات", value: shippingData.notes } : null,
  ].filter(Boolean)

  return (
    <div className="text-right">
      <div className="mb-6">
        <h2 className="text-xl font-bold leading-tight text-white sm:text-2xl">
          راجع تفاصيل الطلب
        </h2>
        <p className="mt-1.5 text-[13px] leading-relaxed text-slate-400">
          تأكد من بيانات الهدية والتوصيل قبل اعتماد الطلب
        </p>
      </div>

      <div className="space-y-3">
        {/* Gift summary */}
        {topPick && (
          <div className="relative overflow-hidden rounded-[18px] border border-cyan-300/20 bg-cyan-300/[0.04] p-4">
            <p className="mb-2.5 text-[10px] font-bold tracking-widest text-cyan-300/60">
              الهدية المقترحة
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

        {/* Delivery summary */}
        <div className="rounded-[18px] border border-violet-400/15 bg-violet-400/[0.03] p-4">
          <p className="mb-2.5 text-[10px] font-bold tracking-widest text-violet-300/60">
            بيانات التوصيل
          </p>
          <div className="space-y-1.5">
            {deliveryRows.map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-3"
              >
                <span className="text-[13px] text-white/80">{row.value}</span>
                <span className="shrink-0 text-[11px] text-slate-500">
                  {row.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Experience strip */}
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
          الرجوع للتعديل
        </button>
        <button
          type="button"
          onClick={onApprove}
          className="rounded-full bg-[linear-gradient(90deg,#7c5cff,#22d3ee)] px-6 py-3 text-[15px] font-bold text-white shadow-[0_10px_30px_rgba(34,211,238,0.15)] transition-all duration-200 hover:shadow-[0_14px_40px_rgba(34,211,238,0.22)] active:scale-[0.98]"
        >
          اعتمد الطلب
        </button>
      </div>
    </div>
  )
}
