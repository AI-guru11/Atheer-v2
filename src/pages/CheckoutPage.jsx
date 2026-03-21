import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Section from '../components/layout/Section'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { getGiftPathMeta, getGiftStatusMeta, resolveGiftSession } from '../lib/giftSession'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [copied, setCopied] = useState(false)

  const session = useMemo(() => resolveGiftSession(searchParams), [searchParams])

  function handleCopyShareLink() {
    if (!session?.shareLink) return
    if (navigator.clipboard) {
      navigator.clipboard.writeText(session.shareLink).catch(() => {})
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  if (!session) {
    return (
      <Section>
        <div className="section-heading">
          <p className="eyebrow">Checkout Readiness</p>
          <h1>لا توجد جلسة طلب جاهزة للعرض.</h1>
        </div>
        <Card className="placeholder-card space-y-4">
          <p>افتح هذه الصفحة من داخل مسار بناء الهدية بعد تثبيت الطلب أو توليد الرابط، وليس كأنها صفحة孤لة بلا سياق.</p>
          <Button variant="primary" onClick={() => navigate('/builder')}>العودة إلى Builder</Button>
        </Card>
      </Section>
    )
  }

  const pathMeta = getGiftPathMeta(session.giftPath)
  const statusMeta = getGiftStatusMeta(session.status, session.giftPath)
  const isDirectDelivery = session.deliveryMode === 'directDelivery'
  const hasExactGift = Boolean(session.selectedGift)
  const optionCount = Array.isArray(session.giftOptions) ? session.giftOptions.length : 0

  return (
    <Section>
      <div className="mx-auto max-w-4xl space-y-6 text-right">
        <div className="section-heading mb-0">
          <p className="eyebrow">Checkout Readiness</p>
          <h1>ملخص الطلب الجاهز للانتقال التجاري</h1>
          <p className="section-copy mt-3 max-w-2xl">
            هذه الصفحة لا تمثل دفعًا نهائيًا بعد، لكنها تمثل النقطة التي يتحول فيها Builder من أداة ترشيح إلى طلب محفوظ يمكن نقله لاحقًا إلى طبقة الدفع والتنفيذ.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div className="space-y-4">
            <Card className="section-card p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 text-right">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-3 py-1.5 text-[12px] font-semibold text-cyan-300">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-300" />
                    {statusMeta.badge}
                  </span>
                  <h2 className="text-2xl font-bold text-white">{pathMeta.senderTitle}</h2>
                  <p className="card-copy text-sm leading-relaxed">{statusMeta.note}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left" dir="ltr">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Order Ref</p>
                  <p className="mt-1 font-mono text-sm font-semibold text-white">{session.code}</p>
                </div>
              </div>
            </Card>

            <Card className="section-card p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-4">
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[12px] font-semibold text-white/80">
                  {pathMeta.label}
                </span>
                <h3 className="text-lg font-bold text-white">ما الذي تم تثبيته داخل الطلب؟</h3>
              </div>

              {hasExactGift ? (
                <div className="space-y-3 rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.04] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[12px] tabular-nums text-white/65">{session.selectedGift?.priceRange}</span>
                    {session.selectedGift?.badge ? (
                      <span className="rounded-full border border-violet-400/20 bg-violet-400/[0.08] px-2.5 py-0.5 text-[11px] font-semibold text-violet-300">
                        {session.selectedGift.badge}
                      </span>
                    ) : null}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-cyan-300/60">الهدية المثبتة</p>
                    <p className="mt-1.5 text-lg font-bold text-white">{session.selectedGift?.title}</p>
                    {session.selectedGift?.description ? (
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{session.selectedGift.description}</p>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div className="space-y-3 rounded-2xl border border-violet-400/15 bg-violet-400/[0.04] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[12px] text-white/65">{session.budgetLabel || 'ضمن ميزانية محددة'}</span>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-semibold text-white/80">
                      {optionCount} خيارات
                    </span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-violet-300/60">تجربة الاختيار المثبتة</p>
                    <p className="mt-1.5 text-lg font-bold text-white">{session.recommendationTitle || 'مجموعة هدايا منسقة'}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                      تم حفظ مجموعة الهدايا داخل الطلب، ولن يحتاج المرسل لإعادة توليد التوصية من الصفر إذا أراد المتابعة لاحقًا.
                    </p>
                  </div>
                </div>
              )}
            </Card>

            <Card className="section-card p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-4">
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[12px] font-semibold text-white/80">
                  {isDirectDelivery ? 'Direct Delivery' : 'Gift Link'}
                </span>
                <h3 className="text-lg font-bold text-white">أطراف الطلب ومعلومات التنفيذ</h3>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 space-y-2">
                  <p className="text-[10px] font-bold tracking-widest text-slate-500">المرسل</p>
                  <p className="text-sm font-semibold text-white">{session.senderName || 'مرسل الهدية'}</p>
                  {session.message ? <p className="text-sm leading-relaxed text-slate-300">{session.message}</p> : null}
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 space-y-2">
                  <p className="text-[10px] font-bold tracking-widest text-slate-500">المستلم</p>
                  <p className="text-sm font-semibold text-white">{session.recipientName || 'غير محدد'}</p>
                  {session.recipientPhone ? <p className="text-sm text-slate-300">{session.recipientPhone}</p> : null}
                  {session.recipientEmail ? <p className="text-sm text-slate-300">{session.recipientEmail}</p> : null}
                </div>
              </div>

              {session.addressData ? (
                <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-[10px] font-bold tracking-widest text-slate-500">العنوان المحفوظ</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    {session.addressData.city} — {session.addressData.address}
                  </p>
                </div>
              ) : null}
            </Card>

            {session.shareLink ? (
              <Card className="section-card p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <span className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-3 py-1 text-[12px] font-semibold text-cyan-300">
                    رابط المستلم محفوظ
                  </span>
                  <h3 className="text-lg font-bold text-white">رابط التجربة المرتبط بهذا الطلب</h3>
                </div>
                <p dir="ltr" className="break-all rounded-2xl border border-violet-400/20 bg-violet-400/[0.05] px-4 py-3 text-sm font-mono text-violet-300">
                  {session.shareLink}
                </p>
                <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:justify-end">
                  <Button variant="secondary" onClick={handleCopyShareLink}>
                    {copied ? 'تم النسخ ✓' : 'نسخ الرابط'}
                  </Button>
                  <Button variant="primary" onClick={() => navigate(`/gift/open?code=${session.code}`)}>
                    فتح تجربة المستلم
                  </Button>
                </div>
              </Card>
            ) : null}
          </div>

          <div className="space-y-4">
            <Card className="p-5">
              <h3 className="text-lg font-bold text-white">الخطوة التجارية التالية</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                هذه المرحلة مجهزة لتكون نقطة ربط طبقة الدفع لاحقًا. الآن الطلب محفوظ، ويمكن لاحقًا إضافة payment intent أو approval gate بدل ترك كل شيء داخل الواجهة فقط.
              </p>
            </Card>

            <Card className="p-5">
              <h3 className="text-lg font-bold text-white">نموذج التشغيل الحالي</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                أثير يعمل حاليًا بمنطق <span dir="ltr">Paid-first / Procure-after-payment</span>. لذلك هذه الصفحة تجهز الطلب تجاريًا، لكن التنفيذ الفعلي للشراء والتوصيل يأتي بعد الاعتماد أو الدفع في المرحلة اللاحقة.
              </p>
            </Card>

            <div className="flex flex-col gap-2.5">
              <Button variant="primary" onClick={() => navigate('/builder')}>
                ابدأ طلبًا جديدًا
              </Button>
              <Button variant="secondary" onClick={() => navigate('/')}>
                العودة للرئيسية
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
