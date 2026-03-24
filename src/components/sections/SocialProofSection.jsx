import Section from "../layout/Section"
import { siteContent } from "../../data/siteContent"

export default function SocialProofSection() {
  const { socialProof } = siteContent

  return (
    <Section className="text-white">
      <div className="space-y-14">
        {/* Header */}
        <div className="space-y-3 text-right">
          <span className="text-xs font-semibold tracking-[0.14em] text-[#a78bfa]/70">
            {socialProof.eyebrow}
          </span>
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
            {socialProof.title}
          </h2>
        </div>

        {/* Editorial pull-quotes — large, breathing, magazine-style */}
        <div className="space-y-10 sm:space-y-12">
          {socialProof.items.map((item, index) => (
            <div
              key={item.quote}
              className={`relative text-right ${
                index % 2 === 0
                  ? "sm:pr-0 sm:pl-[20%]"
                  : "sm:pl-0 sm:pr-[20%]"
              }`}
            >
              {/* Large quotation mark */}
              <span
                className="pointer-events-none absolute -top-4 right-0 text-6xl font-bold leading-none text-white/[0.04] sm:text-8xl"
                aria-hidden="true"
              >
                "
              </span>

              <blockquote className="relative">
                <p className="text-xl font-medium leading-[1.7] text-white/90 sm:text-2xl lg:text-[1.65rem]">
                  {item.quote}
                </p>

                <footer className="mt-5 flex items-center justify-end gap-3">
                  <div className="h-px w-8 bg-gradient-to-l from-[#7c5cff]/30 to-transparent" />
                  <span className="text-sm font-medium text-[#a78bfa]/60">
                    {item.role}
                  </span>
                </footer>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
