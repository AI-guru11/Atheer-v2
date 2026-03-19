import HeroSection from "../components/sections/HeroSection"
import ServicesSection from "../components/sections/ServicesSection"
import DifferenceSection from "../components/sections/DifferenceSection"
import WizardTeaserSection from "../components/sections/WizardTeaserSection"
import FeaturedSection from "../components/sections/FeaturedSection"
import SocialProofSection from "../components/sections/SocialProofSection"
import FeatureStripSection from "../components/sections/FeatureStripSection"
import CTASection from "../components/sections/CTASection"

export default function HomePage() {
  return (
    <main className="home-ambient-flow">
      <div className="home-ambient-backdrop" aria-hidden="true">
        <span className="home-ambient-orb home-ambient-orb--hero-left" />
        <span className="home-ambient-orb home-ambient-orb--hero-right" />
        <span className="home-ambient-orb home-ambient-orb--mid" />
        <span className="home-ambient-orb home-ambient-orb--cta" />
        <span className="home-ambient-aurora home-ambient-aurora--top" />
        <span className="home-ambient-aurora home-ambient-aurora--low" />
        <span className="home-ambient-mesh" />
      </div>

      <HeroSection />
      <ServicesSection />
      <DifferenceSection />
      <WizardTeaserSection />
      <FeaturedSection />
      <SocialProofSection />
      <FeatureStripSection />
      <CTASection />
    </main>
  )
}
