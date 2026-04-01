import { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Section from '../components/layout/Section'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { getGiftPathMeta, getGiftStatusMeta, resolveGiftSession, updateGiftSession } from '../lib/giftSession'

export default function GiftRevealPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const session = useMemo(() => resolveGiftSession(searchParams), [searchParams])
  const code = session?.code || searchParams.get('code') || ''
  const statusMeta = getGiftStatusMeta(session?.status, session?.giftPath)
  const pathMeta = getGiftPathMeta(session?.giftPath)

  function handleContinue() {
    if (!code || !session) return

    if (session.giftPath === 'exactGift') {
      updateGiftSession(code, { status: 'revealed' })
      navigate(`/gift/address?code=${code}`)
      return
    }

    updateGiftSession(code, { status: 'choice_pending' })
    navigate(`/gift/choose?code=${code}`)
  }

  // حالة الخطأ (جلسة غير صالحة)
  if (!session) {
    return (
      <Section className="pt-12 sm:pt-20 min-h-screen">
        <div className="mx-auto max-w-lg text-right reveal-block">
          <div className="charcoal-card rounded-[32px] p-8 space-y-5 border-danger/20 shadow-[0_0_40px_rgba(239,68,68,0.05)]">
            <span className="inline-flex items-center gap-2 rounded-full border border-danger/30 bg-danger/10 px-3 py-1.5 text-xs font-bold text-danger">
              <span className="h-1.5 w-1.5 rounded-full bg-danger animate-pulse" />
              تنبيه
            </span>
            <h1 className="text-3xl font-black leading-tight text-white tracking-tight">
              تعذر الوصول للهدية
            </h1>
            <p className="text-sm leading-relaxed text-slate-400">
              يبدو أن الرابط غير مكتمل أو انتهت صلاحية الجلسة. يرجى فتح الرابط الأصلي من جديد.
            </p>
          </div>
        </div>
      </Section>
    )
  }

  const isExactGift = session.giftPath === 'exactGift'
  const primaryTitle = isExactGift ? session.selectedGift?.title : session.recommendationTitle || 'مجموعة هدايا مختارة لك'
  const primaryDescription = isExactGift
    ? (session.selectedGift?.description || 'تم تجهيز هذه الهدية لك بعناية فائقة بناءً على شخصيتك والمناسبة.')
    : 'هذه هي مقدمة التجربة. بعد المتابعة، ستدخل إلى قائمة حصرية من الهدايا المنسقة لتختار ما يناسبك منها.'
  const primaryPrice = isExactGift ? session.selectedGift?.priceRange : session.budgetLabel

  return (
    <Section className="pt-8 pb-20 sm:pt-16 min-h-screen">
      <div className="mx-auto max-w-[34rem] text-right">
        
        {/* 1. رأس الصفحة (Header) */}
        <div className="reveal-block space-y-5" style={{ transitionDelay: '0ms' }}>
          <div className="flex items-center justify-end gap-2">
             <span className="rounded-full bg-brand-2/10 border border-brand-2/20 px-3 py-1 text-[11px] font-black tracking-widest text-brand-2 uppercase">
              {statusMeta.badge}
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl tracking-tight">
              {pathMeta.revealHeading}
            </h1>
            {/* رسالة المرسل - تظهر كاقتباس فاخر */}
            {session.message ? (
              <div className="relative mt-6 border-r-2 border-brand-2/50 pr-5 py-2">
                <div className="absolute inset-0 bg-gradient-to-l from-brand-2/[0.03] to-transparent pointer-events-none" />
                <p className="text-lg font-medium italic leading-relaxed text-slate-300">
                  "{session.message}"
                </p>
              </div>
            ) : (
              <p className="text-lg leading-relaxed text-slate-400">
                {pathMeta.revealDescription}
              </p>
            )}
          </div>
        </div>

        {/* 2. جوهرة الهدية (The Gift Card) */}
        <div className="reveal-block mt-8" style={{ transitionDelay: '150ms' }}>
          <div className="relative overflow-hidden rounded-[36px] border border-brand-2/30 bg-gradient-to-br from-brand-2/[0.1] via-white/[0.03] to-brand/[0.05] p-6 sm:p-8 shadow-2xl group">
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-brand-2/50 to-transparent" />
            
            <div className="relative z-10 space-y-6">
              
              {/* شريط المعلومات العلوي */}
              <div className="flex items-center justify-between gap-3 border-b border-white/[0.05] pb-5">
                <span className="rounded-full bg-white/[0.05] px-4 py-1.5 text-[12px] font-bold text-white/80 tabular-nums">
                  {session.occasionLabel || 'مناسبة خاصة'}
                </span>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">نوع الإهداء</p>
                  <p className="text-[13px] font-bold text-brand-2">{pathMeta.label}</p>
                </div>
              </div>

              {/* تفاصيل الهدية */}
              <div className="space-y-3 text-right">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold text-slate-400">
                    {primaryPrice || 'هدية فاخرة'}
                  </span>
                  {isExactGift && session.selectedGift?.badge && (
                    <span className="rounded-md border border-brand/30 bg-brand/10 px-2 py-0.5 text-[10px] font-black tracking-wider text-brand uppercase">
                      {session.selectedGift.badge}
                    </span>
                  )}
                </div>
                
                <h2 className="text-2xl font-black leading-tight text-white sm:text-3xl">
                  {primaryTitle}
                </h2>
                
                {isExactGift && session.selectedGift?.subtitle && (
                  <p className="text-sm font-bold text-brand-2/70 tracking-wide">
                    {session.selectedGift.subtitle}
                  </p>
                )}
                
                <p className="text-sm leading-relaxed text-slate-300">
                  {primaryDescription}
                </p>
              </div>

              {/* تشويقة خيارات المستلم (Recipient Choice Only) */}
              {!isExactGift && Array.isArray(session.giftOptions) && session.giftOptions.length > 0 && (
                <div className="pt-4 border-t border-white/[0.05]">
                  <p className="mb-3 text-[10px] font-black tracking-[0.15em] text-slate-500 uppercase">
                    لمحة من الخيارات المتاحة
                  </p>
                  <div className="flex flex-wrap gap-2 justify-end">
                    {session.giftOptions.slice(0, 3).map((gift) => (
                      <span
                        key={gift.id}
                        className="rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-[11px] font-semibold text-slate-300"
                      >
                        {gift.title}
                      </span>
                    ))}
                    {session.giftOptions.length > 3 && (
                      <span className="rounded-full border border-brand-2/20 bg-brand-2/5 px-3 py-1.5 text-[11px] font-bold text-brand-2">
                        + خيارات أخرى
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3. ما التالي؟ (Next Steps) */}
        <div className="reveal-block mt-6" style={{ transitionDelay: '300ms' }}>
          <div className="rounded-[24px] border border-white/[0.05] bg-white/[0.01] p-5">
            <p className="text-[11px] font-black tracking-widest text-slate-500 mb-4">
              الخطوات القادمة
            </p>
            <div className="space-y-3">
              {pathMeta.steps.map((step, index) => {
                const isActive = (isExactGift && index === 2) || (!isExactGift && index === 1)
                return (
                  <div key={step} className={`flex items-center justify-end gap-3 p-3 rounded-xl transition-colors ${isActive ? 'bg-brand-2/10 border border-brand-2/20' : 'bg-transparent'}`}>
                    <span className={`text-[13px] font-bold ${isActive ? 'text-brand-2' : 'text-slate-400'}`}>
                      {step}
                    </span>
                    <span className={`flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-black ${isActive ? 'bg-brand-2 text-[#0d0d12]' : 'bg-white/10 text-slate-500'}`}>
                      {index + 1}
                    </span>
                  </div>
                )
              })}
            </div>
            <p className="mt-4 text-[12px] leading-relaxed text-slate-500 text-center border-t border-white/[0.04] pt-4">
              {statusMeta.note}
            </p>
          </div>
        </div>

        {/* 4. الإجراءات (Actions) */}
        <div className="reveal-block mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end" style={{ transitionDelay: '450ms' }}>
          <Button
            variant="secondary"
            className="w-full justify-center py-4 text-[14px] font-bold sm:w-auto bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:text-white text-slate-300 rounded-full transition-all"
            onClick={() => navigate(isExactGift ? `/gift/unlock?code=${code}` : `/gift/open?code=${code}`)}
          >
            رجوع
          </Button>
          <Button
            variant="primary"
            className="w-full justify-center py-4 px-8 text-[14px] font-black sm:w-auto bg-gradient-to-r from-brand to-brand-2 text-white rounded-full shadow-[0_10px_30px_rgba(56,225,245,0.15)] hover:shadow-[0_15px_40px_rgba(56,225,245,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all"
            onClick={handleContinue}
          >
            {pathMeta.revealCta}
          </Button>
        </div>

      </div>
    </Section>
  )
}
