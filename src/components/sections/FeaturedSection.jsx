import Section from "../layout/Section"
import Card from "../ui/Card"
import { siteContent } from "../../data/siteContent"

export default function FeaturedSection() {
  const { featured } = siteContent

  return (
    <Section className="text-white">
      <div className="space-y-10">
        <div className="space-y-3 text-right">
          <span className="text-xs font-semibold tracking-[0.14em] text-[#67e8f9]/60">
            {featured.eyebrow}
          </span>

          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
            {featured.title}
          </h2>
        </div>

        <div className="grid gap-4">
          {featured.items.map((item) => (
            <Card key={item.title} className="section-card p-7 sm:p-8">
              <div className="space-y-5">
                <div className="flex justify-end">
                  <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-[#c4b5fd]">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-bold leading-snug sm:text-3xl">
                  {item.title}
                </h3>

                <p className="max-w-2xl text-base leading-relaxed text-[#7c8099] sm:text-lg">
                  {item.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  )
}
