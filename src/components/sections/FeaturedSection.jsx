import Section from "../layout/Section"
import { siteContent } from "../../data/siteContent"

export default function FeaturedSection() {
  const { featured } = siteContent
  const [lead, ...secondary] = featured.items

  return (
    <Section className="text-white">
      <div className="scenario-stage space-y-10 sm:space-y-12">
        <div className="space-y-3 text-right">
          <span className="text-xs font-semibold tracking-[0.14em] text-[#a78bfa]/70">
            {featured.eyebrow}
          </span>
          <h2 className="max-w-4xl text-3xl font-bold leading-[1.15] sm:text-4xl lg:text-[3.1rem]">
            لكل مناسبة، <span className="heading-accent">تجربة إهداء</span> تليق بها
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          <article className="scenario-feature charcoal-card card-accent-top rounded-[30px] p-7 text-right lg:col-span-7 lg:p-9">
            <div className="space-y-5">
              <div className="flex justify-end">
                <span className="rounded-full border border-white/[0.07] bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-[#a78bfa]">
                  {lead.tag}
                </span>
              </div>
              <h3 className="text-[2rem] font-bold leading-tight sm:text-[2.4rem]">{lead.title}</h3>
              <p className="max-w-2xl text-lg leading-[1.9] text-[#9ca3af]">{lead.description}</p>
              <div className="flex justify-end">
                <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-xs text-[#67e8f9]">
                  تجربة رئيسية
                </span>
              </div>
            </div>
          </article>

          <div className="grid gap-4 lg:col-span-5">
            {secondary.map((item, index) => (
              <article
                key={item.title}
                className={`scenario-support rounded-[26px] border border-white/[0.07] p-6 text-right ${
                  index === 1 ? "scenario-support--lower lg:mr-[8%]" : "lg:ml-[4%]"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <span className="rounded-full border border-white/[0.07] bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-[#c4b5fd]">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold leading-snug">{item.title}</h3>
                  <p className="text-base leading-[1.9] text-[#8e94aa]">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
