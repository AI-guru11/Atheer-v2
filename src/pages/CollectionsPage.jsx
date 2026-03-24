import { Link } from "react-router-dom"
import Section from "../components/layout/Section"
import { signatureCollections } from "../data/signatureCollections"

export default function CollectionsPage() {
  return (
    <div className="text-white">
      {/* Page header */}
      <Section>
        <div className="space-y-3 text-right">
          <span className="text-xs font-semibold tracking-[0.14em] text-[#a78bfa]/70">
            مجموعات أثير الموقّعة
          </span>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            الكوليكشنات المختارة
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-[#7c8099]">
            طواقم هدايا مصممة بعناية — كل مجموعة تجربة كاملة من أول لمسة.
          </p>
        </div>
      </Section>

      {/* Collections grid — 2-up */}
      <Section>
        <div className="grid gap-4 sm:grid-cols-2">
          {signatureCollections.map((col) => (
            <div
              key={col.id}
              className="section-card charcoal-card rounded-2xl overflow-hidden flex flex-col"
            >
              {/* Accent top strip */}
              <div
                className="h-[3px] w-full flex-shrink-0"
                style={{ backgroundColor: col.accentColor, opacity: 0.55 }}
              />

              <div className="flex flex-col gap-4 p-5 flex-1">
                {/* Badge */}
                <div className="flex justify-end">
                  <span className="rounded-full border border-white/[0.07] bg-white/[0.04] px-2.5 py-1 text-xs font-semibold text-[#a78bfa]">
                    {col.badge}
                  </span>
                </div>

                {/* Title + subtitle */}
                <div className="space-y-1 text-right">
                  <h2 className="text-xl font-bold leading-snug">{col.title}</h2>
                  <p className="text-sm text-[#7c8099] leading-relaxed line-clamp-2">
                    {col.subtitle}
                  </p>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Price + tag row */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {col.occasionFit.slice(0, 2).map((occ) => (
                      <span
                        key={occ}
                        className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-xs text-[#9ca3af]"
                      >
                        {occ}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-[#67e8f9]/80 flex-shrink-0">
                    {col.priceBand}
                  </span>
                </div>

                {/* Audience row */}
                <div className="flex flex-wrap justify-end gap-1.5">
                  {col.audienceFit.map((aud) => (
                    <span
                      key={aud}
                      className="rounded-full border border-white/[0.05] bg-white/[0.02] px-2 py-0.5 text-xs text-[#6b7280]"
                    >
                      {aud}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="border-t border-white/[0.05] pt-3 text-right">
                  <Link
                    to="/builder"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/70 transition hover:text-white"
                  >
                    <span>ابدأ بهذه المجموعة</span>
                    <span aria-hidden="true">←</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Bottom nudge */}
      <Section>
        <div className="charcoal-card rounded-2xl p-6 text-right space-y-2">
          <p className="text-sm text-[#7c8099] leading-relaxed">
            لا تجد ما يناسبك؟ صمّم تجربة مخصصة بالكامل عبر المساعد الذكي.
          </p>
          <Link
            to="/builder"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#a78bfa] transition hover:text-[#c4b5fd]"
          >
            <span>ابدأ من الصفر</span>
            <span aria-hidden="true">←</span>
          </Link>
        </div>
      </Section>
    </div>
  )
}
