import { useNavigate } from 'react-router-dom'
import Section from '../components/layout/Section'
import { mockGiftOptions } from '../data/recipientMockData'

export default function RecipientChoicePage() {
  const navigate = useNavigate()

  function handleChoose(gift) {
    navigate('/gift/address', { state: { selectedGift: gift } })
  }

  return (
    <Section className="pt-10 sm:pt-16">
      <div className="mx-auto max-w-lg space-y-6 text-right">

        {/* Heading */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
            اختر الهدية التي تناسبك
          </h1>
          <p className="text-[14px] leading-relaxed text-slate-400">
            هذه الخيارات اختيرت لك بعناية ضمن المناسبة والميزانية المحددة
          </p>
        </div>

        {/* Gift option cards */}
        <div className="space-y-3">
          {mockGiftOptions.map((gift) => (
            <div
              key={gift.id}
              className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.03] p-5 transition-colors duration-200 hover:border-white/[0.13] hover:bg-white/[0.05]"
            >
              <div className="space-y-3 text-right">

                {/* Badge + price row */}
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-white/[0.07] px-3 py-0.5 text-[12px] tabular-nums text-white/80">
                    {gift.priceRange}
                  </span>
                  {gift.badge && (
                    <span className="rounded-full border border-cyan-300/25 bg-cyan-300/[0.10] px-2.5 py-0.5 text-[11px] font-bold text-cyan-300">
                      {gift.badge}
                    </span>
                  )}
                </div>

                {/* Title + subtitle */}
                <div className="space-y-0.5">
                  <h3 className="text-[1.1rem] font-bold leading-snug text-white">
                    {gift.title}
                  </h3>
                  {gift.subtitle && (
                    <p className="text-[11px] text-slate-500">{gift.subtitle}</p>
                  )}
                </div>

                {/* Description */}
                <p className="text-[13px] leading-relaxed text-slate-300/80">
                  {gift.description}
                </p>

                {/* Choose CTA */}
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
