import Section from "../layout/Section"
import Card from "../ui/Card"
import { siteContent } from "../../data/siteContent"

export default function FeaturedSection() {
  const { featured } = siteContent

  return (
    <Section className="text-white">
      <div className="space-y-8">
        <div className="space-y-4 text-right">
          <span className="text-xs font-semibold tracking-[0.14em] text-cyan-300/70">
            {featured.eyebrow}
          </span>

          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
            {featured.title}
          </h2>
        </div>

        <div className="grid gap-5">
          {featured.items.map((item) => (
            <Card key={item.title} className="p-7 sm:p-8 text-white">
              <div className="space-y-5">
                <div className="flex justify-end">
                  <span className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-cyan-300">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-bold leading-snug text-white sm:text-3xl">
                  {item.title}
                </h3>

                <p className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
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