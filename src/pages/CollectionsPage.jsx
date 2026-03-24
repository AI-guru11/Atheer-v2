import { Link } from "react-router-dom"
import Section from "../components/layout/Section"
import { signatureCollections } from "../data/signatureCollections"

export default function CollectionsPage() {
  return (
    <div className="text-white">
      {/* Page header */}
      <Section>
        <div className="space-y-4 text-right">
          <span className="text-xs font-semibold tracking-[0.14em] text-[#a78bfa]/70">
            مجموعات أثير الموقّعة
          </span>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            الكوليكشنات المختارة
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-[#7c8099] sm:text-lg">
            طواقم هدايا مصممة بعناية — كل مجموعة تجمع بين الجودة والذوق لتصنع
            تجربة إهداء استثنائية.
          </p>
        </div>
      </Section>

      {/* Collections grid */}
      <Section>
        <div className="grid gap-6 sm:grid-cols-2">
          {signatureCollections.map((col) => (
            <div
              key={col.id}
              className="section-card charcoal-card rounded-2xl p-7 flex flex-col gap-5"
            >
              {/* Top row: badge */}
              <div className="flex items-center justify-between">
                <span
                  className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: col.accentColor }}
                />
                <span className="rounded-full border border-white/[0.07] bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-[#a78bfa]">
                  {col.badge}
                </span>
              </div>

              {/* Title + subtitle */}
              <div className="space-y-1.5 text-right">
                <h2 className="text-2xl font-bold leading-snug">{col.title}</h2>
                <p className="text-sm font-medium text-[#9ca3af]">{col.subtitle}</p>
              </div>

              {/* Description */}
              <p className="text-base leading-relaxed text-[#7c8099] text-right">
                {col.description}
              </p>

              {/* Meta row */}
              <div className="flex flex-col gap-3">
                {/* Price */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#5a6070]">نطاق السعر</span>
                  <span className="text-sm font-semibold text-[#67e8f9]/80">
                    {col.priceBand}
                  </span>
                </div>

                {/* Occasion fit */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {col.occasionFit.map((occ) => (
                      <span
                        key={occ}
                        className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-0.5 text-xs text-[#9ca3af]"
                      >
                        {occ}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-[#5a6070] flex-shrink-0">المناسبة</span>
                </div>

                {/* Audience fit */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {col.audienceFit.map((aud) => (
                      <span
                        key={aud}
                        className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-0.5 text-xs text-[#9ca3af]"
                      >
                        {aud}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-[#5a6070] flex-shrink-0">مناسب لـ</span>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-1 text-right">
                <Link
                  to="/builder"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#7c5cff]/40 hover:bg-white/[0.06]"
                >
                  <span>ابدأ بهذه المجموعة</span>
                  <span aria-hidden="true">←</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Bottom nudge */}
      <Section>
        <div className="charcoal-card rounded-2xl p-7 text-right space-y-3">
          <p className="text-base text-[#7c8099] leading-relaxed">
            لا تجد ما يناسبك؟ يمكنك تصميم تجربة مخصصة بالكامل عبر المساعد الذكي.
          </p>
          <Link
            to="/builder"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#a78bfa] transition hover:text-[#c4b5fd]"
          >
            <span>ابدأ من الصفر</span>
            <span aria-hidden="true">←</span>
          </Link>
        </div>
      </Section>
    </div>
  )
}
