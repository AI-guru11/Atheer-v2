import { Link } from "react-router-dom"
import Section from "../layout/Section"
import Card from "../ui/Card"
import Button from "../ui/Button"
import { siteContent } from "../../data/siteContent"

export default function WizardTeaserSection() {
  const { wizardTeaser } = siteContent

  return (
    <Section className="text-white">
      <div className="space-y-8">
        <div className="space-y-4 text-right">
          <span className="text-xs font-semibold tracking-[0.14em] text-cyan-300/70">
            {wizardTeaser.eyebrow}
          </span>

          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
            {wizardTeaser.title}
          </h2>

          <p className="max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {wizardTeaser.description}
          </p>
        </div>

        <Card className="neon-ring glass-panel-strong p-7 sm:p-8 text-white">
          <div className="space-y-7">
            <div className="flex items-center justify-between gap-4">
              <span className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-cyan-300">
                {wizardTeaser.stepLabel}
              </span>

              <div className="h-2 w-24 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-1/3 rounded-full bg-[linear-gradient(90deg,#7c5cff,#22d3ee)]" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold leading-snug text-white sm:text-3xl">
                {wizardTeaser.question}
              </h3>

              <p className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                {wizardTeaser.helper}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {wizardTeaser.recipients.map((recipient) => (
                <button
                  key={recipient}
                  type="button"
                  className="glass-panel rounded-3xl border border-white/10 px-4 py-5 text-center text-lg font-semibold text-white transition duration-200 hover:border-cyan-300/40 hover:text-cyan-200"
                >
                  {recipient}
                </button>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-3">
                <span className="text-sm font-semibold text-cyan-300">
                  {wizardTeaser.occasionLabel}
                </span>

                <div className="flex flex-wrap gap-2">
                  {wizardTeaser.occasions.map((occasion) => (
                    <span
                      key={occasion}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300"
                    >
                      {occasion}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-sm font-semibold text-cyan-300">
                  {wizardTeaser.budgetLabel}
                </span>

                <div className="flex flex-wrap gap-2">
                  {wizardTeaser.budgets.map((budget) => (
                    <span
                      key={budget}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300"
                    >
                      {budget}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white sm:text-xl">
                  {wizardTeaser.outputTitle}
                </h4>

                <ul className="space-y-3">
                  {wizardTeaser.outputs.map((output) => (
                    <li
                      key={output}
                      className="flex items-start gap-3 text-slate-300"
                    >
                      <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-cyan-300" />
                      <span className="text-base leading-relaxed sm:text-lg">
                        {output}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="text-sm leading-relaxed text-slate-400 sm:text-base">
                  {wizardTeaser.controlHint}
                </p>
              </div>
            </div>

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
        </Card>
      </div>
    </Section>
  )
}