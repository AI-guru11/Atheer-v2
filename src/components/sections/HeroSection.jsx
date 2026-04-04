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

      <div className="relative mt-10 lg:mt-14">
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
          {hero.giftPaths.map((path) => (
            <div
              key={path.id}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 text-right"
            >
              <div className="mb-3 flex items-center justify-end gap-2">
                <span className="text-xs font-semibold tracking-wide text-[#a78bfa]/70">
                  {path.badge}
                </span>
                <span className="h-2 w-2 rounded-full bg-[#7c5cff]/60" aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">{path.label}</h3>
              <p className="text-sm leading-relaxed text-[#8e94aa]">{path.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
