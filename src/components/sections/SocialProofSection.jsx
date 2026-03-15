import Section from "../layout/Section"
import Card from "../ui/Card"
import { siteContent } from "../../data/siteContent"

export default function SocialProofSection() {
  const { socialProof } = siteContent

  return (
    <Section className="text-white">
      <div className="space-y-8">
        <div className="space-y-4 text-right">
          <span className="text-xs font-semibold tracking-[0.14em] text-cyan-300/70">
            {socialProof.eyebrow}
          </span>

          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
            {socialProof.title}
          </h2>

          <p className="max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {socialProof.description}
          </p>
        </div>

        <div className="grid gap-5">
          {socialProof.items.map((item) => (
            <Card
              key={item.quote}
              className="glass-panel p-6 sm:p-7 text-white"
            >
              <div className="space-y-4">
                <p className="text-xl font-semibold leading-relaxed text-white sm:text-2xl">
                  “{item.quote}”
                </p>

                <span className="inline-flex rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300">
                  {item.role}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  )
}