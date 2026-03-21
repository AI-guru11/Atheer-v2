import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Section from '../components/layout/Section'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import {
  getGiftNextStepMeta,
  getGiftPathMeta,
  getGiftReadinessChecklist,
  getGiftStatusMeta,
  getGiftTimelineEntries,
  resolveGiftSession,
} from '../lib/giftSession'

function formatDateTime(value) {
  if (!value) return '—'

  try {
    return new Intl.DateTimeFormat('ar-SA', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(value))
  } catch {
    return value
  }
}

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
          <p className="eyebrow">Order Status</p>
          <h1>لا توجد جلسة طلب جاهزة للعرض.</h1>
        </div>
        <Card className="placeholder-card space-y-4">
          <p>افتح هذه الصفحة من داخل مسار بناء الهدية بعد تثبيت الطلب أو توليد الرابط، وليس كأنها صفحة مستقلة بلا سياق.</p>
          <Button variant="primary" onClick={() => navigate('/builder')}>العودة إلى Builder</Button>
        </Card>
      </Section>
    )
  }

  const pathMeta = getGiftPathMeta(session.giftPath)
  const statusMeta = getGiftStatusMeta(session.status, session.giftPath)
  const nextStepMeta = getGiftNextStepMeta(session)
  const timelineEntries = getGiftTimelineEntries(session).slice().reverse()
  const readinessChecklist = getGiftReadinessChecklist(session)
  const isDirectDelivery = session.deliveryMode === 'directDelivery'
  const hasExactGift = Boolean(session.selectedGift)
  const optionCount = Array.isArray(session.giftOptions) ? session.giftOptions.length : 0

  return (
    <Section>
      <div className="mx-auto max-w-4xl space-y-6 text-right">
        <div className="section-heading mb-0">
          <p className="eyebrow">Order Status</p>
          <h1>ملخص الطلب وحالة المتابعة</h1>
          <p className="section-copy mt-3 max-w-2xl">
            هذه الصفحة هي المرجع الحالي للطلب: تعرض الحالة العامة، الخطوة التالية، وكل التفاصيل المحفوظة حتى هذه اللحظة بدون الحاجة لإعادة بناء الهدية من البداية.
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
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-3 py-1 text-[12px] font-semibold text-emerald-300">
                  الخطوة التالية
                </span>
                <h3 className="text-lg font-bold text-white">ماذا يحدث الآن؟</h3>
              </div>

              <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.04] p-4">
                <p className="text-[10px] font-bold tracking-widest text-emerald-300/60">الإجراء الحالي</p>
                <p className="mt-2 text-lg font-bold text-white">{nextStepMeta.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{nextStepMeta.note}</p>
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
                      تم حفظ مجموعة الهدايا داخل الطلب ويمكن الرجوع لها من نفس المرجع بدون إعادة بناء التوصية من الصفر.
                    </p>
                  </div>
                </div>
              )}
            </Card>

            <Card className="section-card p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-4">
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[12px] font-semibold text-white/80">
                  {isDirectDelivery ? 'توصيل مباشر' : 'رابط تجربة'}
                </span>
                <h3 className="text-lg font-bold text-white">أطراف الطلب ومعلومات التسليم</h3>
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
              ) : (
                <div className="mt-3 rounded-2xl border border-amber-400/15 bg-amber-400/[0.04] p-4">
                  <p className="text-[10px] font-bold tracking-widest text-amber-300/70">بيانات التوصيل</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    لم تُحفظ بيانات التوصيل بعد. ستظهر هنا تلقائيًا بعد استكمال هذه الخطوة من المسار المناسب.
                  </p>
                </div>
              )}
            </Card>

            <Card className="section-card p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-4">
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[12px] font-semibold text-white/80">
                  جاهزية الطلب
                </span>
                <h3 className="text-lg font-bold text-white">عناصر مكتملة داخل الطلب</h3>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {readinessChecklist.map((item) => (
                  <div
                    key={item.key}
                    className={`rounded-2xl border px-4 py-3 ${
                      item.done
                        ? 'border-emerald-400/15 bg-emerald-400/[0.04]'
                        : 'border-white/10 bg-white/[0.03]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className={`text-[12px] font-semibold ${item.done ? 'text-emerald-300' : 'text-slate-400'}`}>
                        {item.done ? 'مكتمل' : 'بانتظار'}
                      </span>
                      <p className="text-[13px] font-semibold text-white">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {timelineEntries.length > 0 ? (
              <Card className="section-card p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[12px] font-semibold text-white/80">
                    سجل الحالة
                  </span>
                  <h3 className="text-lg font-bold text-white">آخر التحديثات المسجلة</h3>
                </div>

                <div className="space-y-3">
                  {timelineEntries.map((entry) => (
                    <div
                      key={`${entry.status}-${entry.at}`}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[11px] text-slate-500">{formatDateTime(entry.at)}</span>
                        <p className="text-[13px] font-bold text-white">{entry.label}</p>
                      </div>
                      <p className="mt-2 text-[12px] leading-relaxed text-slate-400">{entry.note}</p>
                    </div>
                  ))}
                </div>
              </Card>
            ) : null}

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
              <h3 className="text-lg font-bold text-white">نقطة المتابعة الحالية</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                احتفظ بمرجع الطلب الحالي، وارجع إلى هذه الصفحة في أي وقت لمراجعة الحالة العامة والتفاصيل المثبتة داخل الطلب.
              </p>
            </Card>

            <Card className="p-5">
              <h3 className="text-lg font-bold text-white">ملخص الجلسة</h3>
              <div className="mt-3 space-y-2 text-sm text-slate-300">
                <div className="flex items-center justify-between gap-3">
                  <span>{session.occasionLabel || 'مناسبة خاصة'}</span>
                  <span className="text-slate-500">المناسبة</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>{session.budgetLabel || 'ميزانية محددة'}</span>
                  <span className="text-slate-500">الميزانية</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>{session.revealStyleLabel || 'تجربة خاصة'}</span>
                  <span className="text-slate-500">أسلوب التجربة</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>{formatDateTime(session.updatedAt)}</span>
                  <span className="text-slate-500">آخر تحديث</span>
                </div>
              </div>
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
