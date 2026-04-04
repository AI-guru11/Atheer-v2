import Section from "../layout/Section"
import { siteContent } from "../../data/siteContent"

export default function WizardTeaserSection() {
  const { wizardTeaser } = siteContent

  return (
    <Section className="text-white">
      <div className="mx-auto max-w-4xl space-y-10">
        <div className="space-y-3 text-right">
          <span className="text-xs font-semibold tracking-[0.14em] text-[#a78bfa]/70">
            {wizardTeaser.eyebrow}
          </span>
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
            {wizardTeaser.title}
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-[#7c8099] sm:text-lg">
            {wizardTeaser.intro}
          </p>
        </div>

        <div className="space-y-6">
          {wizardTeaser.steps.map((step) => (
            <div key={step.number} className="flex items-start gap-5">
              <div className="mt-1 flex-shrink-0">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#7c5cff]/30 bg-[#7c5cff]/10 text-sm font-bold text-[#a78bfa]">
                  {step.number}
                </span>
              </div>
              <div className="flex-1 space-y-1 text-right">
                <h3 className="text-lg font-bold text-white sm:text-xl">{step.title}</h3>
                <p className="text-base leading-relaxed text-[#7c8099]">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
