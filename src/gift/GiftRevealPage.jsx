import { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Section from '../components/layout/Section'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { getGiftPathMeta, getGiftStatusMeta, resolveGiftSession, updateGiftSession } from '../lib/giftSession'

export default function GiftRevealPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const session = useMemo(() => resolveGiftSession(searchParams), [searchParams])
  const code = session?.code || searchParams.get('code') || ''
  const statusMeta = getGiftStatusMeta(session?.status, session?.giftPath)
  const pathMeta = getGiftPathMeta(session?.giftPath)

  function handleContinue() {
    if (!code || !session) return

    if (session.giftPath === 'exactGift') {
      updateGiftSession(code, { status: 'revealed' })
      navigate(`/gift/address?code=${code}`)
      return
    }

    updateGiftSession(code, { status: 'choice_pending' })
    navigate(`/gift/choose?code=${code}`)
  }

  if (!session) {
    return (
      <Section className="pt-10 sm:pt-16">
        <div className="mx-auto max-w-lg text-right">
          <div className="charcoal-card rounded-[24px] p-6 space-y-4">
            <Badge>Reveal</Badge>
            <h1 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
              تعذر عرض تفاصيل الهدية
            </h1>
            <p className="text-[14px] leading-relaxed text-slate-300">
              بيانات الجلسة غير متاحة حاليًا. افتح رابط الهدية من جديد ثم أعد المحاولة.
            </p>
          </div>
        </div>
      </Section>
    )
  }

  const isExactGift = session.giftPath === 'exactGift'
  const primaryTitle = isExactGift ? session.selectedGift?.title : session.recommendationTitle || 'مجموعة هدايا مختارة لك'
  const primaryDescription = isExactGift
    ? (session.selectedGift?.description || 'تم تجهيز هذه الهدية لك بعناية بناءً على المناسبة والذوق الأقرب.')
    : 'هذه هي مقدمة التجربة فقط. بعد المتابعة ستدخل إلى قائمة الهدايا المتاحة لك لاختيار واحدة منها.'
  const primaryPrice = isExactGift ? session.selectedGift?.priceRange : session.budgetLabel

  return (
    <Section className="pt-10 sm:pt-16">
      <div className="mx-auto max-w-lg text-right">
        <div className="space-y-6">
          <Badge>{statusMeta.badge}</Badge>

          <div className="space-y-3">
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
              {pathMeta.revealHeading}
            </h1>
            <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
              {session.message || pathMeta.revealDescription}
            </p>
          </div>

          <div className="charcoal-card rounded-[24px] p-5 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-2.5 py-1 text-[11px] font-semibold text-cyan-300">
                {session.occasionLabel || 'مناسبة خاصة'}
              </span>
              <div className="text-right">
                <p className="text-[11px] text-slate-500">المسار</p>
                <p className="text-[14px] font-bold text-white">{pathMeta.label}</p>
              </div>
            </div>

            <div className="rounded-[18px] border border-white/[0.08] bg-white/[0.02] p-4">
              <p className="text-[10px] font-bold tracking-widest text-slate-500/70">ما الذي سيحدث بعد هذه الصفحة؟</p>
              <div className="mt-3 flex flex-wrap justify-end gap-2">
                {pathMeta.steps.map((step, index) => (
                  <span
                    key={step}
                    className={`rounded-full border px-3 py-1 text-[11px] ${
                      (isExactGift && index === 2) || (!isExactGift && index === 1)
                        ? 'border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-300'
                        : 'border-white/[0.08] bg-white/[0.03] text-white/80'
                    }`}
                  >
                    {index + 1}. {step}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-[12px] leading-relaxed text-slate-400">
              {statusMeta.note}
            </p>

            <div className="rounded-[20px] border border-white/[0.08] bg-white/[0.02] p-4 space-y-2">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[12px] text-white/65">{primaryPrice || 'ضمن ميزانية محددة'}</span>
                {isExactGift && session.selectedGift?.badge ? (
                  <span className="rounded-full border border-violet-400/20 bg-violet-400/[0.08] px-2.5 py-0.5 text-[11px] font-semibold text-violet-300">
                    {session.selectedGift.badge}
                  </span>
                ) : null}
              </div>
              <h2 className="text-[1.4rem] font-bold leading-tight text-white">{primaryTitle}</h2>
              {isExactGift && session.selectedGift?.subtitle ? (
                <p className="text-[12px] text-slate-500">{session.selectedGift.subtitle}</p>
              ) : null}
              <p className="text-[13px] leading-relaxed text-slate-300">{primaryDescription}</p>
            </div>

            {!isExactGift && Array.isArray(session.giftOptions) && session.giftOptions.length > 0 ? (
              <div className="space-y-2 border-t border-white/[0.06] pt-4">
                <p className="text-[11px] font-bold tracking-widest text-slate-500">من بين الخيارات المتاحة لك</p>
                <div className="flex flex-wrap gap-2 justify-end">
                  {session.giftOptions.slice(0, 3).map((gift) => (
                    <span
                      key={gift.id}
                      className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[12px] text-white/80"
                    >
                      {gift.title}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              variant="secondary"
              className="w-full justify-center py-3.5 text-[15px] sm:w-auto"
              onClick={() => navigate(isExactGift ? `/gift/unlock?code=${code}` : `/gift/open?code=${code}`)}
            >
              رجوع
            </Button>
            <Button
              variant="primary"
              className="w-full justify-center py-3.5 text-[15px] sm:w-auto"
              onClick={handleContinue}
            >
              {pathMeta.revealCta}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  )
}
