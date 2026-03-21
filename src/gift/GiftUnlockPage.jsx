import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Section from '../components/layout/Section'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { getGiftStatusMeta, resolveGiftSession, updateGiftSession } from '../lib/giftSession'

export default function GiftUnlockPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const session = useMemo(() => resolveGiftSession(searchParams), [searchParams])
  const code = session?.code || searchParams.get('code') || ''
  const [acknowledged, setAcknowledged] = useState(false)
  const statusMeta = getGiftStatusMeta(session?.status, session?.giftPath)

  function handleContinue() {
    if (!code || !acknowledged) return

    updateGiftSession(code, {
      status: 'unlocked',
    })

    navigate(`/gift/reveal?code=${code}`)
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
              هذه لحظة الكشف الخاصة بك. عندما تكون مستعدًا، أكّد رغبتك بمتابعة التجربة لعرض تفاصيل الهدية التي أُعدّت لك.
            </p>
          </div>

          <div className="charcoal-card rounded-[24px] p-5 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full border border-violet-400/20 bg-violet-400/[0.08] px-2.5 py-1 text-[11px] font-semibold text-violet-300">
                {session.revealStyleLabel || 'تجربة خاصة'}
              </span>
              <div className="text-right">
                <p className="text-[11px] text-slate-500">المناسبة</p>
                <p className="text-[14px] font-bold text-white">{session.occasionLabel || 'مناسبة خاصة'}</p>
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
                تم إعداد هذه الصفحة لك كي تمر تجربة الهدية بلحظة افتتاح واضحة بدل الانتقال المباشر بشكل جاف.
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
                أنا جاهز الآن لمشاهدة تفاصيل الهدية ومتابعة التجربة.
              </span>
            </label>
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              variant="secondary"
              className="w-full justify-center py-3.5 text-[15px] sm:w-auto"
              onClick={() => navigate(`/gift/open?code=${code}`)}
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
