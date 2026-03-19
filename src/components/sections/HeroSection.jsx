import { Link } from "react-router-dom"
import Section from "../layout/Section"
import Badge from "../ui/Badge"
import Button from "../ui/Button"
import { siteContent } from "../../data/siteContent"

export default function HeroSection() {
  const { hero, brand } = siteContent

  return (
    <Section className="hero-ambient-shell relative overflow-hidden pt-16 sm:pt-24">
      {/* Ambient edge layer — atmosphere only, no central object */}
      <div className="hero-ambient" aria-hidden="true">
        <span className="hero-edge-tl" />
        <span className="hero-edge-tr" />
        <span className="hero-edge-bl" />
        <span className="hero-grid-fade" />
        <span className="hero-vignette" />
      </div>

      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left: Copy + CTAs + Stats */}
        <div className="space-y-8">
          <Badge>{brand.badge}</Badge>

          <div className="space-y-5">
            <h1 className="text-4xl font-bold leading-[1.14] sm:text-5xl lg:text-[3.6rem]">
              <span className="block text-white">{hero.titleTop}</span>
              <span className="glow-text block">{hero.titleHighlight}</span>
            </h1>

            <p className="max-w-md text-base leading-relaxed text-[#7c8099] sm:text-lg">
              {hero.description}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to={hero.primaryCta.to}>
              <Button className="w-full sm:w-auto">{hero.primaryCta.label}</Button>
            </Link>

            <Link to={hero.secondaryCta.to}>
              <Button variant="secondary" className="w-full sm:w-auto">
                {hero.secondaryCta.label}
              </Button>
            </Link>
          </div>

          {/* Stats inline below CTAs */}
          <div className="grid grid-cols-3 gap-3 pt-1">
            {hero.stats.map((item) => (
              <div
                key={item.label}
                className="rounded-xl bg-white/[0.025] border border-white/[0.05] px-4 py-3"
              >
                <p className="text-sm font-semibold text-[#a78bfa]">{item.value}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-[#7c8099]">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Steps preview card — no sculpture, just refined surface */}
        <div className="ambient-card rounded-3xl p-6 sm:p-8">
          <div className="space-y-5">
            <span className="text-xs font-semibold tracking-[0.14em] text-[#c4b5fd]">
              {hero.previewCard.eyebrow}
            </span>

            <h2 className="text-2xl font-bold leading-tight text-white">
              {hero.previewCard.title}
            </h2>

            <ol className="space-y-3">
              {hero.previewCard.points.map((point, index) => (
                <li
                  key={point}
                  className="flex items-start gap-4 rounded-xl border border-white/[0.04] bg-white/[0.015] px-4 py-3"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#7c5cff,#22d3ee)] text-[11px] font-bold text-white">
                    {index + 1}
                  </span>
                  <span className="pt-px text-sm leading-relaxed text-[#7c8099]">{point}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Section>
  )
}
