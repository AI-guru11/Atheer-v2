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
    <div className="homepage-shell relative">
      <div className="page-ambient-system" aria-hidden="true">
        <div className="ambient-body ambient-body--one">
          <span className="ambient-body__core" />
          <span className="ambient-body__mesh" />
        </div>

        <div className="ambient-body ambient-body--two">
          <span className="ambient-body__core" />
          <span className="ambient-body__mesh" />
        </div>
      </div>

      <div className="homepage-content relative z-[1]">
        <HeroSection />
        <ServicesSection />
        <DifferenceSection />
        <WizardTeaserSection />
        <FeaturedSection />
        <SocialProofSection />
        <FeatureStripSection />
        <CTASection />
      </div>
    </div>
  )
}