import Section from "../layout/Section"
import { siteContent } from "../../data/siteContent"

export default function ServicesSection() {
  const { services } = siteContent

  const stepLayout = [
    "sm:mr-auto sm:max-w-[40rem]",
    "sm:mx-auto sm:max-w-[36rem]",
    "sm:ml-auto sm:max-w-[40rem]",
  ]

  return (
    <Section className="text-white">
      <div className="service-flow space-y-12 sm:space-y-14">
        <div className="space-y-4 text-right">
          <span className="text-xs font-semibold tracking-[0.14em] text-[#a78bfa]/70">
            {services.eyebrow}
          </span>
          <h2 className="max-w-3xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            ثلاث خطوات فقط لتبدأ <span className="heading-accent">التجربة</span>
          </h2>
        </div>

        <div className="service-flow__stage relative">
          <div className="service-flow__spine" aria-hidden="true" />

          {services.items.map((item, index) => (
            <article
              key={item.title}
              className={`service-step relative ${stepLayout[index] || ""} ${
                index === 1 ? "service-step--center" : index === 2 ? "service-step--end" : "service-step--start"
              }`}
            >
              <span className="service-step__number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="service-step__rail" aria-hidden="true">
                <span className="service-step__dot" />
                {index !== services.items.length - 1 && <span className="service-step__trail" />}
              </div>

              <div className="relative space-y-4 text-right">
                <div className="flex items-center justify-end gap-3">
                  <span className="text-sm font-semibold tracking-[0.12em] text-[#67e8f9]/80">
                    {item.subtitle}
                  </span>
                  <span className="h-2.5 w-2.5 rounded-full bg-[#7c5cff] shadow-[0_0_14px_rgba(124,92,255,0.45)]" />
                </div>

                <h3 className="text-2xl font-bold leading-snug sm:text-3xl lg:text-[2.35rem]">
                  {item.title}
                </h3>

                <p className="text-base leading-[1.9] text-[#8e94aa] sm:text-lg">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}
