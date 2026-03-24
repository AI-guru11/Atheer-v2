import Section from "../layout/Section"
import { siteContent } from "../../data/siteContent"

export default function SocialProofSection() {
  const { socialProof } = siteContent

  return (
    <Section className="text-white">
      <div className="space-y-12 sm:space-y-14">
        <div className="space-y-3 text-right">
          <span className="text-xs font-semibold tracking-[0.14em] text-[#a78bfa]/70">
            {socialProof.eyebrow}
          </span>
          <h2 className="max-w-4xl text-3xl font-bold leading-[1.15] sm:text-4xl lg:text-[3rem]">
            كيف تبدو <span className="heading-accent">التجربة</span> عندما تُنفَّذ بالشكل الصحيح؟
          </h2>
        </div>

        <div className="space-y-8 sm:space-y-10">
          {socialProof.items.map((item, index) => (
            <article
              key={item.quote}
              className={`testimonial-quote ${index === 1 ? "sm:mr-[10%]" : index === 2 ? "sm:ml-[12%]" : "sm:max-w-[88%]"}`}
            >
              <span className="testimonial-quote__mark" aria-hidden="true">״</span>
              <div className="testimonial-quote__body">
                <p className="text-xl font-medium leading-[1.75] text-white sm:text-[1.8rem]">
                  {item.quote}
                </p>
                <footer className="mt-4 flex items-center justify-end gap-3">
                  <div className="h-px w-10 bg-gradient-to-l from-[#7c5cff]/35 to-transparent" />
                  <span className="text-sm font-semibold text-[#a78bfa]/80">{item.role}</span>
                </footer>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}
