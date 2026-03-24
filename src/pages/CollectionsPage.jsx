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
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
            الكوليكشنات المختارة
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-[#7c8099] sm:text-base">
            طواقم هدايا مصممة بعناية — كل مجموعة تجربة كاملة من أول لمسة.
          </p>
        </div>
      </Section>

      {/* Compact 2-up grid — 2 columns on all screen sizes */}
      <Section>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {signatureCollections.map((col) => (
            <div
              key={col.id}
              className="section-card charcoal-card rounded-xl overflow-hidden flex flex-col"
            >
              {/* Collection image — square aspect ratio */}
              <div className="relative w-full aspect-square overflow-hidden">
                <img
                  src={`${import.meta.env.BASE_URL}${col.image}`}
                  alt={col.title}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                {/* Subtle bottom fade into card surface */}
                <div
                  className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to bottom, transparent, rgba(18,18,24,0.7))',
                  }}
                />
              </div>

              {/* Accent top strip — sits between image and content */}
              <div
                className="h-[2px] w-full flex-shrink-0"
                style={{ backgroundColor: col.accentColor, opacity: 0.5 }}
              />

              <div className="flex flex-col gap-3 p-4 flex-1">
                {/* Badge */}
                <div className="flex justify-end">
                  <span className="rounded-full border border-white/[0.07] bg-white/[0.04] px-2 py-0.5 text-[10px] font-semibold text-[#a78bfa] leading-tight">
                    {col.badge}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-base font-bold leading-snug text-right sm:text-lg">
                  {col.title}
                </h2>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Price */}
                <p className="text-xs font-semibold text-[#67e8f9]/80 text-right">
                  {col.priceBand}
                </p>

                {/* CTA */}
                <div className="border-t border-white/[0.05] pt-2.5 text-right">
                  <Link
                    to="/builder"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-white/60 transition hover:text-white"
                  >
                    <span>استكشف</span>
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
        <div className="charcoal-card rounded-xl p-5 text-right space-y-2">
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
