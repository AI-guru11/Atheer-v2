import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getGiftPathMeta } from "../../lib/giftSession"

export default function RecipientLinkReady({
  giftLink,
  recipientData,
  giftPath,
  sessionCode,
  onReset,
}) {
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)

  const pathMeta = getGiftPathMeta(giftPath)
  const isExactGift = giftPath === "exactGift"
  const badgeLabel = isExactGift ? "رابط الكشف جاهز" : "رابط الاختيار جاهز"
  const heading = isExactGift ? "تم توليد رابط كشف الهدية" : "تم توليد رابط اختيار الهدية"
  const description = isExactGift
    ? "الرابط صار جاهزًا للمشاركة، والهدية نفسها أصبحت مثبتة داخل جلسة الطلب بدل أن تبقى مجرد توصية مفتوحة."
    : "الرابط صار جاهزًا للمشاركة، وتجربة الاختيار أصبحت جزءًا من الطلب نفسه وليست مجرد معاينة عامة."
  const shareText = isExactGift
    ? "اضغط على الرابط لمشاهدة هديتك"
    : "اضغط على الرابط لتختار هديتك"

  function handleCopy() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(giftLink).catch(() => {})
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  function handleShare() {
    if (navigator.share) {
      navigator
        .share({
          title: isExactGift ? "هديتك جاهزة للكشف" : "هديتك جاهزة للاختيار",
          text: shareText,
          url: giftLink,
        })
        .catch(() => {})
    } else {
      handleCopy()
    }
  }

  return (
    <div className="flex flex-col items-center py-4 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-violet-400/25 bg-violet-400/[0.08]">
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-violet-400"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      </div>

      <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-violet-400/20 bg-violet-400/[0.08] px-3 py-1.5 text-[12px] font-semibold text-violet-300">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-400" />
        {badgeLabel}
      </span>

      <h2 className="text-xl font-bold leading-tight text-white sm:text-2xl">
        {heading}
      </h2>
      <p className="mt-2 max-w-xs text-[13px] leading-relaxed text-slate-400">
        {description}
      </p>

      {sessionCode ? (
        <div className="mt-4 w-full rounded-[18px] border border-cyan-300/15 bg-cyan-300/[0.04] px-4 py-3 text-right">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[12px] font-semibold text-white/80" dir="ltr">
              {sessionCode}
            </span>
            <span className="text-[10px] font-bold tracking-widest text-cyan-300/60">
              مرجع الطلب
            </span>
          </div>
          <p className="mt-2 text-[12px] leading-relaxed text-slate-300">
            هذا المرجع يمثل الطلب نفسه، ويمكنك فتح صفحة الملخص التجاري لمراجعته بدل ترك الرابط وحده دون سياق.
          </p>
        </div>
      ) : null}

      <div className="mt-4 w-full rounded-[18px] border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-right">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-[11px] font-semibold text-white/75">
            {pathMeta.label}
          </span>
          <span className="text-[10px] font-bold tracking-widest text-slate-500/70">
            ما الذي سيحدث بعد فتح الرابط؟
          </span>
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

      {(recipientData?.senderName || recipientData?.name) ? (
        <div className="mt-4 w-full rounded-[18px] border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-right">
          <div className="flex items-center justify-between gap-3 text-[12px]">
            <span className="text-white/80">{recipientData?.name || "—"}</span>
            <span className="text-slate-500">إلى</span>
          </div>
          <div className="mt-2 flex items-center justify-between gap-3 text-[12px]">
            <span className="text-white/80">{recipientData?.senderName || "—"}</span>
            <span className="text-slate-500">من</span>
          </div>
        </div>
      ) : null}

      <div className="mt-5 w-full rounded-[18px] border border-violet-400/20 bg-violet-400/[0.05] px-4 py-3.5">
        <p
          className="break-all font-mono text-[13px] font-semibold leading-relaxed text-violet-300"
          dir="ltr"
        >
          {giftLink}
        </p>
      </div>

      <div className="mt-4 flex w-full flex-col gap-2.5 sm:flex-row">
        <button
          type="button"
          onClick={handleShare}
          className="flex-1 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-[13px] font-semibold text-slate-300 transition-colors duration-200 hover:border-white/20 hover:text-white"
        >
          مشاركة الرابط
        </button>
        <button
          type="button"
          onClick={handleCopy}
          className="flex-1 rounded-full bg-[linear-gradient(90deg,#7c5cff,#22d3ee)] px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_8px_24px_rgba(124,92,255,0.2)] transition-all duration-200 hover:shadow-[0_12px_32px_rgba(124,92,255,0.28)] active:scale-[0.98]"
        >
          {copied ? "تم النسخ ✓" : "نسخ الرابط"}
        </button>
      </div>

      {sessionCode ? (
        <button
          type="button"
          onClick={() => navigate(`/checkout?code=${sessionCode}`)}
          className="mt-4 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-5 py-2.5 text-[13px] font-semibold text-cyan-300 transition-colors duration-200 hover:bg-cyan-300/[0.10]"
        >
          فتح ملخص الطلب
        </button>
      ) : null}

      <button
        type="button"
        onClick={onReset}
        className="mt-4 rounded-full border border-white/[0.06] px-5 py-2 text-[12px] font-semibold text-slate-500 transition-colors duration-200 hover:text-slate-300"
      >
        بناء هدية جديدة
      </button>
    </div>
  )
}
