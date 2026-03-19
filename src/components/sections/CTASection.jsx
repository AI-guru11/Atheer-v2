import { Link } from "react-router-dom"
import Section from "../layout/Section"
import Button from "../ui/Button"
import Card from "../ui/Card"
import { siteContent } from "../../data/siteContent"

export default function CTASection() {
  const { cta } = siteContent

  return (
    <Section className="text-white">
      <Card className="glass-panel-strong p-8 sm:p-12">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
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
      </Card>
    </Section>
  )
}
