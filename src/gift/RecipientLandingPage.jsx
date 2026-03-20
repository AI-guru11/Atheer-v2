import { useNavigate, useSearchParams } from 'react-router-dom'
import Section from '../components/layout/Section'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { mockRecipientSession } from '../data/recipientMockData'

export default function RecipientLandingPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const code = searchParams.get('code')

  // Resolve session from code — all codes use mock session for now
  const { senderName, occasion, message } = mockRecipientSession

  return (
    <Section className="pt-10 sm:pt-16">
      <div className="mx-auto max-w-lg text-right">
        <div className="space-y-6">

          {/* Badge */}
          <Badge>لديك هدية</Badge>

          {/* Heading */}
          <div className="space-y-3">
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
              تم اختيار هدية لك بعناية
            </h1>
            <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
              افتح التجربة وشاهد الخيارات المتاحة لك
            </p>
          </div>

          {/* Sender card */}
          <div className="charcoal-card rounded-[24px] p-5 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full border border-violet-400/20 bg-violet-400/[0.08] px-2.5 py-1 text-[11px] font-semibold text-violet-300">
                {occasion}
              </span>
              <div className="text-right">
                <p className="text-[11px] text-slate-500">من</p>
                <p className="text-[14px] font-bold text-white">{senderName}</p>
              </div>
            </div>

            {message && (
              <p className="border-t border-white/[0.06] pt-3 text-[13px] leading-relaxed text-slate-300">
                &ldquo;{message}&rdquo;
              </p>
            )}
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3">
            <Button
              variant="primary"
              className="w-full justify-center py-3.5 text-[15px]"
              onClick={() => navigate('/gift/choose')}
            >
              شاهد هديتك
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-center text-[13px] text-slate-500 hover:text-slate-400"
            >
              العودة لاحقًا
            </Button>
          </div>

        </div>
      </div>
    </Section>
  )
}
