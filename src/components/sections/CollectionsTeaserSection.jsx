import { Link } from "react-router-dom"
import Section from "../layout/Section"
import { signatureCollections } from "../../data/signatureCollections"

export default function CollectionsTeaserSection() {
  const [lead, ...secondary] = signatureCollections.slice(0, 3)

  return (
    <Section className="text-white">
      <div className="space-y-8 sm:space-y-10">
        <div className="space-y-4 text-right">
          <span className="text-xs font-semibold tracking-[0.14em] text-[#a78bfa]/70">
            مجموعات أثير المختارة
          </span>
          <h2 className="max-w-4xl text-3xl font-bold leading-[1.12] sm:text-4xl lg:text-[3.1rem]">
            كوليكشن موثوق، وكل <span className="heading-accent">هدية</span> مصممة بعناية
          </h2>
          <p className="max-w-3xl text-base leading-[1.9] text-[#9ca3af] sm:text-lg">
            طواقم مختارة بدقة لكل مناسبة وكل شخصية — تجربة كاملة من أول لمسة.
          </p>
        </div>

        <div className="space-y-4">
          <article className="section-card charcoal-card overflow-hidden rounded-[30px]">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              <div className="relative overflow-hidden" style={{ aspectRatio: '4 / 3' }}>
                <img
                  src={`${import.meta.env.BASE_URL}${lead.image}`}
                  alt={lead.title}
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-[rgba(16,16,20,0.72)]" />
              </div>

              <div className="relative flex flex-col justify-between gap-5 p-6 sm:p-7">
                <span className="absolute left-6 top-6 h-3 w-3 rounded-full" style={{ backgroundColor: lead.accentColor }} />
                <div className="space-y-4 text-right">
                  <span className="inline-flex rounded-full border border-white/[0.07] bg-white/[0.04] px-3 py-1 text-xs font-semibold text-[#c4b5fd]">
                    {lead.badge}
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold leading-tight sm:text-[2rem]">{lead.title}</h3>
                    <p className="text-base leading-[1.85] text-[#8e94aa]">{lead.description}</p>
                  </div>
                  <div className="flex flex-wrap justify-end gap-2">
                    {lead.audienceFit.slice(0, 3).map((tag) => (
                      <span key={tag} className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-xs text-[#9ca3af]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <Link
                    to="/collections"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#a78bfa] transition hover:text-[#c4b5fd]"
                  >
                    <span>استعرض المزيد</span>
                    <span aria-hidden="true">←</span>
                  </Link>
                  <span className="text-sm font-semibold text-[#67e8f9]">{lead.priceBand}</span>
                </div>
              </div>
            </div>
          </article>

          <div className="grid gap-4 sm:grid-cols-2">
            {secondary.map((col) => (
              <article key={col.id} className="charcoal-card overflow-hidden rounded-[24px]">
                <div className="relative overflow-hidden" style={{ aspectRatio: '16 / 10' }}>
                  <img
                    src={`${import.meta.env.BASE_URL}${col.image}`}
                    alt={col.title}
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-[rgba(16,16,20,0.8)]" />
                </div>
                <div className="border-t border-white/[0.07] p-5 text-right">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: col.accentColor }} />
                    <span className="rounded-full border border-white/[0.07] bg-white/[0.04] px-3 py-1 text-xs font-semibold text-[#c4b5fd]">
                      {col.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold">{col.title}</h3>
                  <p className="mt-2 text-sm leading-[1.8] text-[#8e94aa]">{col.subtitle}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
