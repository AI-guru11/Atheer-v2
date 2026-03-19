import { Link } from "react-router-dom"
import Section from "../layout/Section"
import Badge from "../ui/Badge"
import Button from "../ui/Button"
import { siteContent } from "../../data/siteContent"

export default function HeroSection() {
  const { hero, brand } = siteContent

  return (
    <Section className="hero-ambient-shell relative overflow-hidden pt-16 text-center sm:pt-24">
      {/* Ambient edge layer — atmosphere only */}
      <div className="hero-ambient" aria-hidden="true">
        <span className="hero-edge-tl" />
        <span className="hero-edge-tr" />
        <span className="hero-edge-bl" />
        <span className="hero-grid-fade" />
        <span className="hero-vignette" />
      </div>

      <div className="mx-auto max-w-3xl space-y-8">
        <div className="flex justify-center">
          <Badge>{brand.badge}</Badge>
        </div>

        <div className="space-y-5">
          <h1 className="text-4xl font-bold leading-[1.14] sm:text-5xl lg:text-[3.6rem]">
            <span className="block text-white">{hero.titleTop}</span>
            <span className="glow-text block">{hero.titleHighlight}</span>
          </h1>

          <p className="mx-auto max-w-xl text-base leading-relaxed text-[#7c8099] sm:text-lg">
            {hero.description}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to={hero.primaryCta.to}>
            <Button className="w-full sm:w-auto">{hero.primaryCta.label}</Button>
          </Link>

          <Link to={hero.secondaryCta.to}>
            <Button variant="secondary" className="w-full sm:w-auto">
              {hero.secondaryCta.label}
            </Button>
          </Link>
        </div>

        {/* Stats — three quick signals below CTAs */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          {hero.stats.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-white/[0.05] bg-white/[0.025] px-4 py-3"
            >
              <p className="text-sm font-semibold text-[#a78bfa]">{item.value}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-[#7c8099]">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
