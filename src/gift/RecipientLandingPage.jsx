import { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Section from '../components/layout/Section'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { getGiftStatusMeta, resolveGiftSession, updateGiftSession } from '../lib/giftSession'

export default function RecipientLandingPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const session = useMemo(() => resolveGiftSession(searchParams), [searchParams])
  const code = session?.code || searchParams.get('code') || ''
  const statusMeta = getGiftStatusMeta(session?.status, session?.giftPath)

  function handleOpenGift() {
    if (!session || !code) return

    updateGiftSession(code, { status: 'opened' })

    if (session.giftPath === 'exactGift') {
      navigate(`/gift/unlock?code=${code}`)
      return
    }

    navigate(`/gift/reveal?code=${code}`)
  }

  if (!session) {
    return (
      <Section className="pt-10 sm:pt-16">
        <div className="mx-auto max-w-lg text-right">
          <div className="charcoal-card rounded-[24px] p-6 space-y-4">
            <Badge>الرابط غير مكتمل</Badge>
            <h1 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
              تعذر تحميل تفاصيل الهدية
            </h1>
            <p className="text-[14px] leading-relaxed text-slate-300">
              يبدو أن الرابط لا يحتوي على بيانات كافية أو أن الجلسة غير متاحة على هذا الجهاز.
            </p>
            <Button
              variant="primary"
              className="w-full justify-center py-3.5 text-[15px]"
              onClick={() => navigate('/')}
            >
              العودة للرئيسية
            </Button>
          </div>
        </div>
      </Section>
    )
  }

  const heading = session.giftPath === 'exactGift'
    ? 'تم اختيار هدية لك بعناية'
    : 'تم اختيار مجموعة هدايا لك بعناية'

  const subheading = session.giftPath === 'exactGift'
    ? 'افتح التجربة وشاهد الهدية التي تم تجهيزها لك'
    : 'افتح التجربة وشاهد الخيارات المتاحة لك ضمن هذه المناسبة'

  const ctaLabel = session.giftPath === 'exactGift' ? 'شاهد هديتك' : 'شاهد خياراتك'

  return (
    <Section className="pt-10 sm:pt-16">
      <div className="mx-auto max-w-lg text-right">
        <div className="space-y-6">
          <Badge>{statusMeta.badge}</Badge>

          <div className="space-y-3">
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
              {heading}
            </h1>
            <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
              {subheading}
            </p>
          </div>

          <div className="charcoal-card rounded-[24px] p-5 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full border border-violet-400/20 bg-violet-400/[0.08] px-2.5 py-1 text-[11px] font-semibold text-violet-300">
                {session.occasionLabel || 'مناسبة خاصة'}
              </span>
              <div className="text-right">
                <p className="text-[11px] text-slate-500">من</p>
                <p className="text-[14px] font-bold text-white">{session.senderName || 'مرسل الهدية'}</p>
              </div>
            </div>

            {session.recipientName ? (
              <div className="flex items-center justify-between gap-3 border-t border-white/[0.06] pt-3">
                <span className="text-[12px] text-slate-400">موجهة إلى</span>
                <p className="text-[14px] font-bold text-white">{session.recipientName}</p>
              </div>
            ) : null}

            {session.message ? (
              <p className="border-t border-white/[0.06] pt-3 text-[13px] leading-relaxed text-slate-300">
                &ldquo;{session.message}&rdquo;
              </p>
            ) : null}

            <p className="border-t border-white/[0.06] pt-3 text-[12px] leading-relaxed text-slate-400">
              {statusMeta.note}
            </p>

            {session.giftPath === 'exactGift' && session.selectedGift ? (
              <div className="border-t border-white/[0.06] pt-3">
                <p className="text-[11px] text-slate-500">الهدية المختارة</p>
                <p className="mt-1 text-[15px] font-bold text-white">{session.selectedGift.title}</p>
              </div>
            ) : null}

            {session.giftPath === 'recipientChoice' ? (
              <div className="border-t border-white/[0.06] pt-3">
                <p className="text-[11px] text-slate-500">عدد الخيارات المتاحة</p>
                <p className="mt-1 text-[15px] font-bold text-white">{session.giftOptions?.length || 0} خيارات</p>
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-3">
            <Button
              variant="primary"
              className="w-full justify-center py-3.5 text-[15px]"
              onClick={handleOpenGift}
            >
              {ctaLabel}
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
