import HeroSection from "../components/sections/HeroSection"
import ServicesSection from "../components/sections/ServicesSection"
import DifferenceSection from "../components/sections/DifferenceSection"
import WizardTeaserSection from "../components/sections/WizardTeaserSection"
import CollectionsTeaserSection from "../components/sections/CollectionsTeaserSection"
import FeaturedSection from "../components/sections/FeaturedSection"
import SocialProofSection from "../components/sections/SocialProofSection"
import FeatureStripSection from "../components/sections/FeatureStripSection"
import CTASection from "../components/sections/CTASection"

export default function HomePage() {
  return (
    <div className="homepage-shell relative">
      <div className="homepage-content relative z-[1]">
        <HeroSection />
        <ServicesSection />
        <WizardTeaserSection />
        <DifferenceSection />
        <CollectionsTeaserSection />
        <FeaturedSection />
        <SocialProofSection />
        <FeatureStripSection />
        <CTASection />
      </div>
    </div>
  )
}
