import Section from "../layout/Section"
import { siteContent } from "../../data/siteContent"

export default function SocialProofSection() {
  const { socialProof } = siteContent

  return (
    <Section className="text-white">
      <div className="space-y-10">
        <div className="space-y-3 text-right">
          <span className="text-xs font-semibold tracking-[0.14em] text-[#a78bfa]/70">
            {socialProof.eyebrow}
          </span>

          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
            {socialProof.title}
          </h2>
        </div>

        <div className="grid gap-3">
          {socialProof.items.map((item) => (
            <div
              key={item.quote}
              className="charcoal-card rounded-2xl p-6 sm:p-7"
            >
              <div className="space-y-4">
                <p className="text-base font-normal leading-relaxed text-white/90 sm:text-lg">
                  "{item.quote}"
                </p>

                <span className="inline-flex rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-xs text-[#7c8099]">
                  {item.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
