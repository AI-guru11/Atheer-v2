import { Link } from "react-router-dom"
import Section from "../layout/Section"
import Button from "../ui/Button"
import { siteContent } from "../../data/siteContent"

export default function CTASection() {
  const { cta } = siteContent

  return (
    <Section className="text-white">
      {/* CTA surface — accent edge + top-center glow signal a premium conversion moment */}
      <div className="card-accent-top-center relative overflow-hidden rounded-3xl border border-white/[0.07] bg-[#161618] p-8 sm:p-12">
        {/* Ambient glow — purple body, faint cyan breath at midpoint */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-full"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(124, 92, 255, 0.16) 0%, rgba(34, 211, 238, 0.05) 52%, transparent 68%)",
          }}
        />

        <div className="relative mx-auto max-w-2xl space-y-6 text-center">
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
            {cta.title}
          </h2>

          <p className="text-base leading-relaxed text-[#7c8099] sm:text-lg">
            {cta.description}
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to={cta.primaryCta.to}>
              <Button className="w-full sm:w-auto">{cta.primaryCta.label}</Button>
            </Link>

            <Link to={cta.secondaryCta.to}>
              <Button variant="secondary" className="w-full sm:w-auto">
                {cta.secondaryCta.label}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  )
}
