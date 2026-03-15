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
    <>
      <HeroSection />
      <ServicesSection />
      <DifferenceSection />
      <WizardTeaserSection />
      <FeaturedSection />
      <SocialProofSection />
      <FeatureStripSection />
      <CTASection />
    </>
  )
}