import HeroSection from "../components/sections/HeroSection"
import WizardTeaserSection from "../components/sections/WizardTeaserSection"
import DifferenceSection from "../components/sections/DifferenceSection"
import SocialProofSection from "../components/sections/SocialProofSection"
import CTASection from "../components/sections/CTASection"

export default function HomePage() {
  return (
    <div className="homepage-shell relative">
      <div className="homepage-content relative z-[1]">
        <HeroSection />
        <WizardTeaserSection />
        <DifferenceSection />
        <SocialProofSection />
        <CTASection />
      </div>
    </div>
  )
}
