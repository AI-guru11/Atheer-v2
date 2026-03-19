import { Link } from "react-router-dom"
import Section from "../layout/Section"
import Badge from "../ui/Badge"
import Button from "../ui/Button"
import { siteContent } from "../../data/siteContent"

export default function HeroSection() {
  const { hero, brand } = siteContent

  return (
    <Section className="hero-ambient-shell relative overflow-hidden pt-12 sm:pt-20">
      <div className="hero-ambient-backdrop" aria-hidden="true">
        <span className="hero-grid-fade" />
        <span className="hero-vignette" />
        <span className="hero-mesh-sheen" />
        <span className="hero-blob hero-blob--left" />
        <span className="hero-blob hero-blob--right" />
        <span className="hero-blob hero-blob--center" />
      </div>

      <div className="mx-auto max-w-4xl text-center text-white">
        <div className="space-y-6">
          <Badge className="mx-auto">{brand.badge}</Badge>

          <div className="space-y-4">
            <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-[4.5rem]">
              <span className="block">{hero.titleTop}</span>
              <span className="glow-text block">{hero.titleHighlight}</span>
            </h1>

            <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg lg:text-[1.15rem]">
              {hero.description}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to={hero.primaryCta.to}>
              <Button className="min-w-[12rem] w-full sm:w-auto">{hero.primaryCta.label}</Button>
            </Link>

            <Link to={hero.secondaryCta.to}>
              <Button variant="secondary" className="min-w-[12rem] w-full sm:w-auto">
                {hero.secondaryCta.label}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:mt-14">
        {hero.stats.map((item) => (
          <div
            key={item.label}
            className="ambient-stat-card glass-panel rounded-[24px] px-5 py-5 text-white"
          >
            <div className="relative z-10 space-y-2 text-right">
              <p className="text-lg font-semibold text-[#d8cbff]">{item.value}</p>
              <p className="text-sm leading-relaxed text-slate-400">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
