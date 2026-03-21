import { useNavigate } from "react-router-dom"

export default function DirectDeliveryConfirmation({ sessionCode, onReset }) {
  const navigate = useNavigate()

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
        تم تثبيت الطلب المباشر
      </span>

      <h2 className="text-xl font-bold leading-tight text-white sm:text-2xl">
        تم حفظ الطلب داخل جلسة موحدة
      </h2>
      <p className="mt-2 max-w-xs text-[13px] leading-relaxed text-slate-400">
        لم تعد الهدية مجرد توصية عائمة. تم حفظها مع بيانات المرسل والمستلم داخل طلب واحد جاهز للانتقال التجاري لاحقًا.
      </p>

      {sessionCode ? (
        <div className="mt-5 w-full rounded-[18px] border border-cyan-300/15 bg-cyan-300/[0.04] px-4 py-3.5 text-right">
          <p className="text-[10px] font-bold tracking-widest text-cyan-300/60">مرجع الطلب</p>
          <p className="mt-1.5 font-mono text-[13px] font-semibold text-white/85" dir="ltr">
            {sessionCode}
          </p>
        </div>
      ) : null}

      <div className="mt-5 w-full rounded-[18px] border border-white/[0.07] bg-white/[0.025] px-4 py-3.5 text-right">
        <p className="text-[12px] leading-relaxed text-slate-400">
          الخطوة التالية ليست إعادة اختيار الهدية، بل مراجعة ملخص الطلب والانتقال لاحقًا إلى طبقة الدفع أو الاعتماد النهائي.
        </p>
      </div>

      <div className="mt-6 flex w-full flex-col gap-2.5 sm:flex-row">
        {sessionCode ? (
          <button
            type="button"
            onClick={() => navigate(`/checkout?code=${sessionCode}`)}
            className="flex-1 rounded-full bg-[linear-gradient(90deg,#7c5cff,#22d3ee)] px-6 py-3 text-[15px] font-bold text-white shadow-[0_10px_30px_rgba(34,211,238,0.15)] transition-all duration-200 hover:shadow-[0_14px_40px_rgba(34,211,238,0.22)] active:scale-[0.98]"
          >
            افتح ملخص الطلب
          </button>
        ) : null}
        <button
          type="button"
          onClick={onReset}
          className="flex-1 rounded-full border border-white/[0.08] bg-white/[0.02] px-6 py-3 text-[15px] font-semibold text-slate-300 transition-colors duration-200 hover:border-white/15 hover:text-white"
        >
          بناء هدية جديدة
        </button>
      </div>
    </div>
  )
}
