import { Link } from "react-router-dom"
import Section from "../layout/Section"
import Button from "../ui/Button"
import { siteContent } from "../../data/siteContent"

export default function WizardTeaserSection() {
  const { wizardTeaser } = siteContent

  return (
    <Section className="text-white">
      <div className="space-y-10">
        <div className="space-y-3 text-right">
          <span className="text-xs font-semibold tracking-[0.14em] text-[#a78bfa]/70">
            {wizardTeaser.eyebrow}
          </span>

          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
            {wizardTeaser.title}
          </h2>

          <p className="max-w-3xl text-base leading-relaxed text-[#7c8099] sm:text-lg">
            {wizardTeaser.description}
          </p>
        </div>

        {/* Feature demo card — charcoal surface, no neon ring */}
        <div className="charcoal-card rounded-3xl p-7 sm:p-8">
          <div className="space-y-6">
            {/* Step indicator */}
            <div className="flex items-center justify-between gap-4">
              <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm font-semibold text-[#a78bfa]">
                {wizardTeaser.stepLabel}
              </span>

              <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/[0.08]">
                <div className="h-full w-1/3 rounded-full bg-[linear-gradient(90deg,#7c5cff,#8b5cf6)]" />
              </div>
            </div>

            {/* Question */}
            <div className="space-y-2">
              <h3 className="text-2xl font-bold leading-snug sm:text-3xl">
                {wizardTeaser.question}
              </h3>

              <p className="max-w-2xl text-base leading-relaxed text-[#7c8099]">
                {wizardTeaser.helper}
              </p>
            </div>

            {/* Recipients grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {wizardTeaser.recipients.map((recipient) => (
                <button
                  key={recipient}
                  type="button"
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-4 text-center text-base font-semibold text-white transition duration-200 hover:border-[#7c5cff]/30 hover:bg-white/[0.05]"
                >
                  {recipient}
                </button>
              ))}
            </div>

            {/* Output preview */}
            <div className="rounded-2xl border border-white/[0.05] bg-white/[0.015] p-5">
              <div className="space-y-3">
                <h4 className="text-base font-bold sm:text-lg">
                  {wizardTeaser.outputTitle}
                </h4>

                <ul className="space-y-2">
                  {wizardTeaser.outputs.map((output) => (
                    <li
                      key={output}
                      className="flex items-start gap-3 text-[#7c8099]"
                    >
                      <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8b5cf6]" />
                      <span className="text-sm leading-relaxed sm:text-base">
                        {output}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="text-xs leading-relaxed text-[#5a6070] sm:text-sm">
                  {wizardTeaser.controlHint}
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Link to={wizardTeaser.primaryCta.to}>
                <Button className="w-full sm:w-auto">
                  {wizardTeaser.primaryCta.label}
                </Button>
              </Link>

              <Link to={wizardTeaser.secondaryCta.to}>
                <Button variant="secondary" className="w-full sm:w-auto">
                  {wizardTeaser.secondaryCta.label}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
