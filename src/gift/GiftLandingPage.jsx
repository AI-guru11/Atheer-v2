import { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Section from '../components/layout/Section'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { resolveGiftSession } from '../lib/giftSession'

export default function GiftLandingPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const session = useMemo(() => resolveGiftSession(searchParams), [searchParams])

  if (session?.code) {
    return (
      <Section className="pt-10 sm:pt-16">
        <div className="mx-auto max-w-lg text-right">
          <div className="space-y-6">
            <Badge>تجربة هدية جاهزة</Badge>

            <div className="space-y-3">
              <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
                {session.giftPath === 'exactGift' ? 'هديتك جاهزة للكشف' : 'مجموعة هدايا بانتظارك'}
              </h1>
              <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
                {session.message || 'تم إعداد هذه التجربة لك بعناية. افتحها الآن وأكمل الخطوة التالية.'}
              </p>
            </div>

            <div className="charcoal-card rounded-[24px] p-5 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-2.5 py-1 text-[11px] font-semibold text-cyan-300">
                  {session.occasionLabel || 'مناسبة خاصة'}
                </span>
                <div className="text-right">
                  <p className="text-[11px] text-slate-500">من</p>
                  <p className="text-[14px] font-bold text-white">{session.senderName || 'مرسل الهدية'}</p>
                </div>
              </div>

              <div className="border-t border-white/[0.06] pt-3 text-[13px] leading-relaxed text-slate-300">
                {session.giftPath === 'exactGift'
                  ? 'سيتم عرض الهدية التي اختارها المُهدي لك ثم يمكنك إدخال بيانات الاستلام.'
                  : 'ستشاهد مجموعة هدايا مختارة لك ويمكنك اختيار الأنسب ثم إدخال عنوان التوصيل.'}
              </div>
            </div>

            <Button
              variant="primary"
              className="w-full justify-center py-3.5 text-[15px]"
              onClick={() => navigate(`/gift/open?code=${session.code}`)}
            >
              متابعة تجربة الهدية
            </Button>
          </div>
        </div>
      </Section>
    )
  }

  return (
    <Section className="pt-10 sm:pt-16">
      <div className="mx-auto max-w-3xl text-right">
        <div className="space-y-8">
          <div className="space-y-4">
            <Badge>Gift Experience</Badge>
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              اختر مسار الهدية المناسب وابدأ التجربة من مكان واحد
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              أثير لا يقدم مجرد منتج، بل يبني تجربة هدية كاملة: اختيار، كشف، تأكيد، ثم توصيل.
              يمكنك إما اختيار هدية محددة بنفسك، أو جعل المستلم يختار من مجموعة هدايا منسقة.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="charcoal-card rounded-[24px] p-5 space-y-3">
              <p className="text-[11px] font-bold tracking-widest text-cyan-300/70">المسار الأول</p>
              <h2 className="text-xl font-bold text-white">اختر هدية محددة بنفسك</h2>
              <p className="text-[14px] leading-relaxed text-slate-300">
                مناسب إذا كنت تعرف ما تريد إرساله بالضبط، وتريد أن يرى المستلم هديته داخل تجربة كشف أنيقة قبل تأكيد الاستلام.
              </p>
            </div>

            <div className="charcoal-card rounded-[24px] p-5 space-y-3">
              <p className="text-[11px] font-bold tracking-widest text-violet-300/70">المسار الثاني</p>
              <h2 className="text-xl font-bold text-white">اجعل المستلم يختار من مجموعة هدايا</h2>
              <p className="text-[14px] leading-relaxed text-slate-300">
                مناسب إذا كنت تريد إبقاء الاختيار مرنًا. يفتح المستلم صفحة خاصة يرى منها الخيارات المناسبة لميزانيتك ثم يختار الأنسب.
              </p>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              variant="secondary"
              className="w-full justify-center py-3.5 text-[15px] sm:w-auto"
              onClick={() => navigate('/')}
            >
              العودة للرئيسية
            </Button>
            <Button
              variant="primary"
              className="w-full justify-center py-3.5 text-[15px] sm:w-auto"
              onClick={() => navigate('/builder')}
            >
              ابدأ بناء هديتك
            </Button>
          </div>
        </div>
      </div>
    </Section>
  )
}