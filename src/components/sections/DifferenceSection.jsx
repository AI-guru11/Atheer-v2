import Section from "../layout/Section"
import { siteContent } from "../../data/siteContent"

export default function DifferenceSection() {
  const { difference } = siteContent

  return (
    <Section className="text-white">
      <div className="manifesto-stage mx-auto max-w-5xl space-y-10 sm:space-y-12">
        <div className="space-y-4 text-right">
          <span className="text-xs font-semibold tracking-[0.14em] text-[#a78bfa]/70">
            {difference.eyebrow}
          </span>
          <h2 className="max-w-4xl text-3xl font-bold leading-[1.15] sm:text-4xl lg:text-[3.45rem]">
            <span className="heading-accent">الهدية</span> في أثير تبدأ قبل أن تُفتح
          </h2>
          <p className="max-w-3xl text-base leading-[1.95] text-[#a2a8ba] sm:text-lg">
            {difference.description}
          </p>
        </div>

        <div className="space-y-7 sm:space-y-8">
          {difference.points.map((point, index) => (
            <article
              key={point.title}
              className={`manifesto-point ${
                index === 1 ? "sm:mr-[8%]" : index === 2 ? "sm:ml-[10%]" : "sm:max-w-[84%]"
              }`}
            >
              <div className="manifesto-point__accent" aria-hidden="true" />
              <div className="space-y-3 text-right">
                <h3 className="text-2xl font-bold leading-snug sm:text-[2rem]">{point.title}</h3>
                <p className="max-w-2xl text-base leading-[1.95] text-[#8e94aa] sm:text-lg">
                  {point.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}
