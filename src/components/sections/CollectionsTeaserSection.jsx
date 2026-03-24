import { Link } from "react-router-dom"
import Section from "../layout/Section"
import { signatureCollections } from "../../data/signatureCollections"

export default function CollectionsTeaserSection() {
  const preview = signatureCollections.slice(0, 3)

  return (
    <Section className="text-white">
      <div className="space-y-10">
        {/* Header */}
        <div className="space-y-3 text-right">
          <span className="text-xs font-semibold tracking-[0.14em] text-[#a78bfa]/70">
            مجموعات أثير المختارة
          </span>
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
            كوليكشن موثوق، وكل هدية مصممة بعناية
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
              className="section-card charcoal-card rounded-2xl p-6 flex flex-col gap-4"
            >
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
