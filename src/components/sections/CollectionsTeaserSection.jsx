import { Link } from "react-router-dom"
import Section from "../layout/Section"
import { signatureCollections } from "../../data/signatureCollections"

export default function CollectionsTeaserSection() {
  const preview = signatureCollections.slice(0, 3)

  return (
    <Section className="text-white">
      <div className="space-y-10">
        {/* Header with accent */}
        <div className="space-y-3 text-right">
          <span className="text-xs font-semibold tracking-[0.14em] text-[#a78bfa]/70">
            مجموعات أثير المختارة
          </span>
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
            كوليكشن موثوق، وكل{" "}
            <span className="heading-accent">هدية</span> مصممة بعناية
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-[#7c8099] sm:text-lg">
            طواقم مختارة بدقة لكل مناسبة وكل شخصية — تجربة كاملة من أول لمسة.
          </p>
        </div>

        {/* Collection cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((col) => (
            <div
              key={col.id}
              className="section-card charcoal-card rounded-2xl overflow-hidden flex flex-col"
            >
              {/* Collection image — 4:3 aspect for teaser layout */}
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <img
                  src={`${import.meta.env.BASE_URL}${col.image}`}
                  alt={col.title}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to bottom, transparent, rgba(18,18,24,0.65))',
                  }}
                />
              </div>

              {/* Accent strip */}
              <div
                className="h-[2px] w-full flex-shrink-0"
                style={{ backgroundColor: col.accentColor, opacity: 0.5 }}
              />

              <div className="flex flex-col gap-4 p-6">
                {/* Badge + accent dot */}
                <div className="flex items-center justify-between">
                  <span
                    className="h-2 w-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: col.accentColor }}
                  />
                  <span className="rounded-full border border-white/[0.07] bg-white/[0.04] px-3 py-1 text-xs font-semibold text-[#a78bfa]">
                    {col.badge}
                  </span>
                </div>

                {/* Title + subtitle */}
                <div className="space-y-1 text-right">
                  <h3 className="text-xl font-bold leading-snug">{col.title}</h3>
                  <p className="text-sm text-[#7c8099]">{col.subtitle}</p>
                </div>

                {/* Price band */}
                <div className="text-right">
                  <span className="text-sm font-semibold text-[#67e8f9]/80">
                    {col.priceBand}
                  </span>
                </div>

                {/* Audience tags */}
                <div className="flex flex-wrap justify-end gap-2">
                  {col.audienceFit.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-0.5 text-xs text-[#9ca3af]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Browse link */}
        <div className="text-right">
          <Link
            to="/collections"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#a78bfa] transition hover:text-[#c4b5fd]"
          >
            <span>استعرض جميع المجموعات</span>
            <span aria-hidden="true">←</span>
          </Link>
        </div>
      </div>
    </Section>
  )
}
