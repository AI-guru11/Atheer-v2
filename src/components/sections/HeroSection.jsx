import { Link } from "react-router-dom"
import Section from "../layout/Section"
import Badge from "../ui/Badge"
import Button from "../ui/Button"
import Card from "../ui/Card"
import { siteContent } from "../../data/siteContent"

export default function HeroSection() {
  const { hero, brand } = siteContent

  return (
    <Section className="hero-ambient-shell relative overflow-hidden pt-12 sm:pt-20">
      <div className="hero-ambient" aria-hidden="true">
        <span className="hero-orb hero-orb-1" />
        <span className="hero-orb hero-orb-2" />
        <span className="hero-orb hero-orb-3" />
        <span className="hero-orb hero-orb-4" />
        <span className="hero-orb hero-orb-5" />
        <span className="hero-grid-fade" />
        <span className="hero-vignette" />
      </div>

      <div className="grid items-start gap-5 sm:gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
        <div className="space-y-6 text-white">
          <Badge>{brand.badge}</Badge>

          <div className="space-y-4">
            <h1 className="max-w-xl text-3xl font-bold leading-[1.18] text-white sm:text-5xl lg:text-[3.5rem]">
              <span className="block">{hero.titleTop}</span>
              <span className="glow-text block">{hero.titleHighlight}</span>
            </h1>

            <p className="max-w-lg text-base leading-relaxed text-slate-300 sm:text-lg">
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
        </div>

        <div className="space-y-5 sm:space-y-6">
          <div className="hero-showcase relative mx-auto w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[520px]">
            <div className="hero-showcase-glow" aria-hidden="true" />

            <div className="gift-sculpture" aria-hidden="true">
              <div className="gift-sculpture__halo" />
              <div className="gift-sculpture__spark gift-sculpture__spark--left" />
              <div className="gift-sculpture__spark gift-sculpture__spark--right" />

              <div className="gift-sculpture__card gift-sculpture__card--back" />
              <div className="gift-sculpture__card gift-sculpture__card--mid" />

              <div className="gift-sculpture__box">
                <div className="gift-sculpture__lid" />
                <div className="gift-sculpture__face gift-sculpture__face--front">
                  <span className="gift-sculpture__shine" />
                  <span className="gift-sculpture__ribbon gift-sculpture__ribbon--vertical" />
                  <span className="gift-sculpture__ribbon gift-sculpture__ribbon--horizontal" />
                  <span className="gift-sculpture__core" />
                </div>
                <div className="gift-sculpture__face gift-sculpture__face--side" />
                <div className="gift-sculpture__tag">Atheer</div>
              </div>

              <div className="gift-sculpture__base" />
            </div>
          </div>

          <Card className="glass-panel p-5 text-white sm:p-7">
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
                    className="flex items-start gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-3"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#7c5cff,#22d3ee)] text-[11px] font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="pt-px text-sm leading-relaxed text-slate-300">{point}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:mt-10">
        {hero.stats.map((item) => (
          <div
            key={item.label}
            className="glass-panel rounded-[24px] px-5 py-4 text-white"
          >
            <p className="text-sm font-semibold text-cyan-300">{item.value}</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">{item.label}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
