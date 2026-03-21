import { getGiftPathMeta, getGiftStatusMeta } from "../../lib/giftSession"

export default function DirectDeliveryConfirmation({ session, onReset }) {
  const pathMeta = getGiftPathMeta(session?.giftPath || "exactGift")
  const statusMeta = getGiftStatusMeta(session?.status, session?.giftPath || "exactGift")

  return (
    <div className="flex flex-col items-center py-4 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/[0.08]">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-emerald-400"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-3 py-1.5 text-[12px] font-semibold text-emerald-300">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
        {statusMeta.badge}
      </span>

      <h2 className="text-xl font-bold leading-tight text-white sm:text-2xl">
        تم اعتماد طلب التوصيل المباشر
      </h2>
      <p className="mt-2 max-w-xs text-[13px] leading-relaxed text-slate-400">
        {statusMeta.note}
      </p>

      {session?.code ? (
        <div className="mt-5 w-full rounded-[18px] border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 text-right">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[12px] text-white/80">{session.code}</span>
            <span className="text-[11px] text-slate-500">رقم مرجع الطلب</span>
          </div>
        </div>
      ) : null}

      {session?.selectedGift ? (
        <div className="mt-4 w-full rounded-[18px] border border-cyan-300/15 bg-cyan-300/[0.04] px-4 py-3.5 text-right">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[12px] text-white/60">{session.selectedGift.priceRange}</span>
            <span className="text-[11px] text-slate-500">الهدية المحددة</span>
          </div>
          <p className="mt-1.5 text-[14px] font-bold text-white">{session.selectedGift.title}</p>
        </div>
      ) : null}

      <div className="mt-4 w-full rounded-[18px] border border-white/[0.07] bg-white/[0.025] px-4 py-3.5 text-right">
        <div className="flex items-center justify-between gap-3 text-[12px]">
          <span className="text-white/80">{session?.recipientName || '—'}</span>
          <span className="text-slate-500">المستلم</span>
        </div>
        <div className="mt-2 flex items-center justify-between gap-3 text-[12px]">
          <span className="text-white/80">{session?.senderName || '—'}</span>
          <span className="text-slate-500">المرسل</span>
        </div>
        <div className="mt-2 flex items-start justify-between gap-3 text-[12px]">
          <span className="min-w-0 flex-1 break-words text-white/80">
            {session?.addressData?.city || ''} {session?.addressData?.address || ''}
          </span>
          <span className="text-slate-500">عنوان التوصيل</span>
        </div>
      </div>

      <div className="mt-4 w-full rounded-[18px] border border-violet-400/15 bg-violet-400/[0.03] px-4 py-3.5 text-right">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-[11px] font-semibold text-white/75">
            {pathMeta.label}
          </span>
          <span className="text-[11px] text-slate-500">خطوات التنفيذ</span>
        </div>
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

      <button
        type="button"
        onClick={onReset}
        className="mt-6 rounded-full bg-[linear-gradient(90deg,#7c5cff,#22d3ee)] px-6 py-3 text-[15px] font-bold text-white shadow-[0_10px_30px_rgba(34,211,238,0.15)] transition-all duration-200 hover:shadow-[0_14px_40px_rgba(34,211,238,0.22)] active:scale-[0.98]"
      >
        بناء هدية جديدة
      </button>
    </div>
  )
}
