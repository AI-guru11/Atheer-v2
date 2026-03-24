import Section from "../layout/Section"
import { siteContent } from "../../data/siteContent"

export default function SocialProofSection() {
  const { socialProof } = siteContent

  return (
    <Section className="text-white">
      <div className="space-y-14">
        {/* Header with accent */}
        <div className="space-y-3 text-right">
          <span className="text-xs font-semibold tracking-[0.14em] text-[#a78bfa]/70">
            {socialProof.eyebrow}
          </span>
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
            كيف تبدو <span className="heading-accent">التجربة</span> عندما
            تُنفَّذ بالشكل الصحيح؟
          </h2>
        </div>

        {/* Editorial pull-quotes with accent bar */}
        <div className="space-y-10 sm:space-y-14">
          {socialProof.items.map((item, index) => (
            <div
              key={item.quote}
              className={`relative text-right ${
                index % 2 === 0
                  ? "sm:pr-0 sm:pl-[20%]"
                  : "sm:pl-0 sm:pr-[20%]"
              }`}
            >
              {/* Pull-quote accent bar on right (start) side */}
              <div className="relative pr-5 sm:pr-7">
                <div
                  className="absolute top-0 bottom-0 right-0 w-[2px] rounded-full"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(124, 92, 255, 0.35), rgba(124, 92, 255, 0.06))",
                  }}
                  aria-hidden="true"
                />

                {/* Large decorative quotation mark */}
                <span
                  className="pointer-events-none absolute -top-5 right-4 text-7xl font-bold leading-none text-white/[0.04] sm:text-8xl lg:text-9xl"
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
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
