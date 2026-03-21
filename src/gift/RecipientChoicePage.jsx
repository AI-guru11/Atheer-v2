import { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Section from '../components/layout/Section'
import { resolveGiftSession, updateGiftSession } from '../lib/giftSession'

export default function RecipientChoicePage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const session = useMemo(() => resolveGiftSession(searchParams), [searchParams])
  const code = session?.code || searchParams.get('code') || ''

  function handleChoose(gift) {
    if (!code) return

    updateGiftSession(code, {
      selectedGift: gift,
      status: 'gift_selected',
    })

    navigate(`/gift/address?code=${code}`)
  }

  if (!session) {
    return (
      <Section className="pt-10 sm:pt-16">
        <div className="mx-auto max-w-lg text-right">
          <div className="charcoal-card rounded-[24px] p-6 space-y-4">
            <h1 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
              تعذر تحميل الخيارات
            </h1>
            <p className="text-[14px] leading-relaxed text-slate-300">
              افتح رابط الهدية مرة أخرى للتأكد من وصول بيانات الجلسة كاملة.
            </p>
          </div>
        </div>
      </Section>
    )
  }

  const giftOptions = Array.isArray(session.giftOptions) ? session.giftOptions : []

  if (session.giftPath !== 'recipientChoice') {
    navigate(`/gift/address?code=${code}`)
    return null
  }

  return (
    <Section className="pt-10 sm:pt-16">
      <div className="mx-auto max-w-lg space-y-6 text-right">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
            اختر الهدية التي تناسبك
          </h1>
          <p className="text-[14px] leading-relaxed text-slate-400">
            هذه الخيارات اختيرت لك بعناية ضمن {session.occasionLabel || 'المناسبة'} و{session.budgetLabel || 'الميزانية المحددة'}
          </p>
        </div>

        <div className="space-y-3">
          {giftOptions.map((gift) => (
            <div
              key={gift.id}
              className="charcoal-card relative overflow-hidden rounded-[24px] p-5 transition-colors duration-200 hover:border-white/[0.13] hover:bg-white/[0.05]"
            >
              <div className="space-y-3 text-right">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-white/[0.07] px-3 py-0.5 text-[12px] tabular-nums text-white/80">
                    {gift.priceRange}
                  </span>
                  {gift.badge ? (
                    <span className="rounded-full border border-cyan-300/25 bg-cyan-300/[0.10] px-2.5 py-0.5 text-[11px] font-bold text-cyan-300">
                      {gift.badge}
                    </span>
                  ) : null}
                </div>

                <div className="space-y-0.5">
                  <h3 className="text-[1.1rem] font-bold leading-snug text-white">
                    {gift.title}
                  </h3>
                  {gift.subtitle ? (
                    <p className="text-[11px] text-slate-500">{gift.subtitle}</p>
                  ) : null}
                </div>

                <p className="text-[13px] leading-relaxed text-slate-300/80">
                  {gift.description}
                </p>

                <button
                  type="button"
                  onClick={() => handleChoose(gift)}
                  className="w-full rounded-full bg-[linear-gradient(90deg,#7c5cff,#22d3ee)] py-2.5 text-[14px] font-bold text-white shadow-[0_8px_24px_rgba(34,211,238,0.12)] transition-all duration-200 hover:shadow-[0_12px_30px_rgba(34,211,238,0.20)] active:scale-[0.98]"
                >
                  اختر هذه الهدية
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}