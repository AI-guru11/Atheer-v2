import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Section from '../components/layout/Section'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { buildGiftFlowUrl, getGiftPathMeta, getGiftStatusMeta, resolveGiftSession, updateGiftSession } from '../lib/giftSession'

export default function GiftUnlockPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const session = useMemo(() => resolveGiftSession(searchParams), [searchParams])
  const code = session?.code || searchParams.get('code') || ''
  const [acknowledged, setAcknowledged] = useState(false)
  const statusMeta = getGiftStatusMeta(session?.status, session?.giftPath)
  const pathMeta = getGiftPathMeta(session?.giftPath)

  function handleContinue() {
    if (!code || !acknowledged) return

    updateGiftSession(code, {
      status: 'unlocked',
    })

    navigate(buildGiftFlowUrl('/gift/reveal', session, searchParams))
  }

  if (!session) {
    return (
      <Section className="pt-10 sm:pt-16">
        <div className="mx-auto max-w-lg text-right">
          <div className="charcoal-card rounded-[24px] p-6 space-y-4">
            <Badge>Unlock</Badge>
            <h1 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
              تعذر فتح التجربة
            </h1>
            <p className="text-[14px] leading-relaxed text-slate-300">
              الرابط لا يحتوي على جلسة هدية صالحة. افتح الرابط الأصلي من جديد ثم جرّب مرة أخرى.
            </p>
            <Button
              variant="primary"
              className="w-full justify-center py-3.5 text-[15px]"
              onClick={() => navigate('/')}
            >
              العودة للرئيسية
            </Button>
          </div>
        </div>
      </Section>
    )
  }

  return (
    <Section className="pt-10 sm:pt-16">
      <div className="mx-auto max-w-lg text-right">
        <div className="space-y-6">
          <Badge>{statusMeta.badge}</Badge>

          <div className="space-y-3">
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
              قبل أن ترى هديتك
            </h1>
            <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
              هذه هي لحظة التهيئة قبل عرض الهدية المحددة. بعد المتابعة ستشاهد الهدية نفسها ثم تنتقل مباشرة إلى بيانات الاستلام.
            </p>
          </div>

          <div className="charcoal-card rounded-[24px] p-5 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full border border-violet-400/20 bg-violet-400/[0.08] px-2.5 py-1 text-[11px] font-semibold text-violet-300">
                {session.revealStyleLabel || 'تجربة خاصة'}
              </span>
              <div className="text-right">
                <p className="text-[11px] text-slate-500">المسار</p>
                <p className="text-[14px] font-bold text-white">{pathMeta.label}</p>
              </div>
            </div>

            <div className="rounded-[18px] border border-white/[0.08] bg-white/[0.02] p-4">
              <p className="text-[10px] font-bold tracking-widest text-slate-500/70">مراحل هذا المسار</p>
              <div className="mt-3 flex flex-wrap justify-end gap-2">
                {pathMeta.steps.map((step, index) => (
                  <span
                    key={step}
                    className={`rounded-full border px-3 py-1 text-[11px] ${
                      index === 1
                        ? 'border-violet-400/20 bg-violet-400/[0.08] text-violet-300'
                        : 'border-white/[0.08] bg-white/[0.03] text-white/80'
                    }`}
                  >
                    {index + 1}. {step}
                  </span>
                ))}
              </div>
            </div>

            <p className="border-t border-white/[0.06] pt-4 text-[13px] leading-relaxed text-slate-300">
              {statusMeta.note}
            </p>

            {session.message ? (
              <p className="text-[13px] leading-relaxed text-slate-300">
                الرسالة المرفقة ستظهر لك بعد الكشف. هذه الخطوة فقط للتأكد أنك جاهز لهذه اللحظة.
              </p>
            ) : (
              <p className="text-[13px] leading-relaxed text-slate-300">
                تم إعداد هذه الصفحة لتجعل انتقالك إلى الهدية نفسها أكثر وضوحًا وأناقة بدل الانتقال المباشر بشكل بارد.
              </p>
            )}

            <label className="flex cursor-pointer items-start gap-3 rounded-[18px] border border-white/[0.08] bg-white/[0.02] p-4 text-right">
              <input
                type="checkbox"
                checked={acknowledged}
                onChange={(e) => setAcknowledged(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent accent-violet-400"
              />
              <span className="text-[13px] leading-relaxed text-slate-300">
                أنا جاهز الآن لعرض الهدية المحددة ومتابعة تجربة الاستلام.
              </span>
            </label>
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              variant="secondary"
              className="w-full justify-center py-3.5 text-[15px] sm:w-auto"
              onClick={() => navigate(buildGiftFlowUrl('/gift/open', session, searchParams))}
            >
              رجوع
            </Button>
            <Button
              variant="primary"
              className="w-full justify-center py-3.5 text-[15px] sm:w-auto disabled:cursor-not-allowed disabled:opacity-50"
              onClick={handleContinue}
              disabled={!acknowledged}
            >
              اكشف الهدية الآن
            </Button>
          </div>
        </div>
      </div>
    </Section>
  )
}
