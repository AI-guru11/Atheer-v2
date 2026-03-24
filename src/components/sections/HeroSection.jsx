import { Link } from "react-router-dom"
import Section from "../layout/Section"
import Badge from "../ui/Badge"
import Button from "../ui/Button"
import { siteContent } from "../../data/siteContent"

function RouteVisual({ index }) {
  const common = {
    className: "h-full w-full",
    viewBox: "0 0 120 120",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
  }

  if (index === 0) {
    return (
      <svg {...common}>
        <defs>
          <linearGradient id="routeGradientOne" x1="18" y1="18" x2="102" y2="102" gradientUnits="userSpaceOnUse">
            <stop stopColor="#a78bfa" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <rect x="16" y="22" width="88" height="76" rx="22" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
        <circle cx="35" cy="44" r="8" stroke="url(#routeGradientOne)" strokeWidth="4" />
        <path d="M43 44H61C69 44 75 50 75 58V60" stroke="url(#routeGradientOne)" strokeWidth="4" strokeLinecap="round" />
        <circle cx="75" cy="60" r="6" fill="url(#routeGradientOne)" />
        <path d="M35 72H86" stroke="url(#routeGradientOne)" strokeWidth="4" strokeLinecap="round" opacity="0.95" />
        <path d="M35 84H67" stroke="url(#routeGradientOne)" strokeWidth="4" strokeLinecap="round" opacity="0.62" />
        <circle cx="88" cy="44" r="9" stroke="url(#routeGradientOne)" strokeWidth="4" opacity="0.75" />
      </svg>
    )
  }

  if (index === 1) {
    return (
      <svg {...common}>
        <defs>
          <linearGradient id="routeGradientTwo" x1="20" y1="18" x2="104" y2="102" gradientUnits="userSpaceOnUse">
            <stop stopColor="#c084fc" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <rect x="22" y="28" width="54" height="44" rx="14" stroke="url(#routeGradientTwo)" strokeWidth="4" />
        <path d="M22 44H76" stroke="url(#routeGradientTwo)" strokeWidth="4" />
        <path d="M49 28V20" stroke="url(#routeGradientTwo)" strokeWidth="4" strokeLinecap="round" />
        <path d="M40 20H58" stroke="url(#routeGradientTwo)" strokeWidth="4" strokeLinecap="round" />
        <path d="M33 56L49 68L65 56" stroke="url(#routeGradientTwo)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M84 34L102 52" stroke="url(#routeGradientTwo)" strokeWidth="4" strokeLinecap="round" opacity="0.72" />
        <path d="M98 34L102 52L84 48" stroke="url(#routeGradientTwo)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.92" />
        <circle cx="88" cy="82" r="10" stroke="url(#routeGradientTwo)" strokeWidth="4" opacity="0.82" />
        <path d="M88 76V88" stroke="url(#routeGradientTwo)" strokeWidth="4" strokeLinecap="round" />
        <path d="M82 82H94" stroke="url(#routeGradientTwo)" strokeWidth="4" strokeLinecap="round" />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <defs>
        <linearGradient id="routeGradientThree" x1="18" y1="20" x2="104" y2="102" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a78bfa" />
          <stop offset="1" stopColor="#38bdf8" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="60" r="24" stroke="url(#routeGradientThree)" strokeWidth="5" opacity="0.95" />
      <path d="M50 36V60L67 69" stroke="url(#routeGradientThree)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M68 42C72 46 74 52 74 58C74 72 63 84 50 84" stroke="url(#routeGradientThree)" strokeWidth="5" strokeLinecap="round" />
      <path d="M68 42H82V56" stroke="url(#routeGradientThree)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 84C30 76 38 76 47 84" stroke="url(#routeGradientThree)" strokeWidth="4" strokeLinecap="round" opacity="0.75" />
      <circle cx="88" cy="38" r="9" stroke="url(#routeGradientThree)" strokeWidth="4" opacity="0.82" />
      <path d="M88 34V42" stroke="url(#routeGradientThree)" strokeWidth="4" strokeLinecap="round" />
      <path d="M84 38H92" stroke="url(#routeGradientThree)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

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

      <div className="hero-route-stack relative mt-10 lg:mt-14">
        <div className="hero-route-flow" aria-hidden="true">
          <span className="hero-route-flow__orb hero-route-flow__orb--one" />
          <span className="hero-route-flow__orb hero-route-flow__orb--two" />
          <span className="hero-route-flow__trail" />
        </div>

        <div className="relative z-10 space-y-4">
          {hero.stats.map((item, index) => (
            <div
              key={item.value}
              className={`hero-route-card hero-route-card--${index + 1} ${
                index === 0 ? "hero-route-card--featured" : ""
              }`}
            >
              <span className="hero-route-card__dot" aria-hidden="true" />
              <span className="hero-route-card__number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="hero-route-card__visual" aria-hidden="true">
                <div className="hero-route-card__visual-shell">
                  <RouteVisual index={index} />
                </div>
              </div>

              <div className="hero-route-card__body">
                <h3 className="hero-route-card__title">{item.value}</h3>
                <p className="hero-route-card__copy">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
