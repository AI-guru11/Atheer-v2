import Section from "../layout/Section"
import { siteContent } from "../../data/siteContent"

export default function DifferenceSection() {
  const { difference } = siteContent
  const paths = [difference.exactGift, difference.recipientChoice]

  return (
    <Section className="text-white">
      <div className="mx-auto max-w-5xl space-y-10 sm:space-y-12">
        <div className="space-y-4 text-right">
          <span className="text-xs font-semibold tracking-[0.14em] text-[#a78bfa]/70">
            {difference.eyebrow}
          </span>
          <h2 className="max-w-3xl text-3xl font-bold leading-[1.15] sm:text-4xl">
            {difference.title}
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-[#a2a8ba] sm:text-lg">
            {difference.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {paths.map((path) => (
            <div
              key={path.label}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 text-right space-y-4"
            >
              <div className="flex items-center justify-end gap-2">
                <span className="text-xs font-semibold tracking-wide text-[#67e8f9]/70">
                  {path.badge}
                </span>
                <span className="h-2 w-2 rounded-full bg-[#7c5cff]/60" aria-hidden="true" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white sm:text-2xl">{path.label}</h3>
                <p className="mt-2 text-base leading-relaxed text-[#8e94aa]">{path.what}</p>
              </div>

              <div className="space-y-3 border-t border-white/[0.06] pt-4">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-[#a78bfa]/60">المرسل</span>
                  <p className="text-sm leading-relaxed text-[#8e94aa]">{path.senderRole}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-[#a78bfa]/60">المهدى له</span>
                  <p className="text-sm leading-relaxed text-[#8e94aa]">{path.recipientExperience}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-[#67e8f9]/60">الأنسب حين</span>
                  <p className="text-sm leading-relaxed text-[#8e94aa]">{path.bestFor}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
