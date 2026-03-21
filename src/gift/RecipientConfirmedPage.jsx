import { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Section from '../components/layout/Section'
import { getGiftPathMeta, getGiftStatusMeta, resolveGiftSession } from '../lib/giftSession'

export default function RecipientConfirmedPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const session = useMemo(() => resolveGiftSession(searchParams), [searchParams])
  const statusMeta = getGiftStatusMeta(session?.status, session?.giftPath)
  const pathMeta = getGiftPathMeta(session?.giftPath)

  return (
    <Section className="pt-10 sm:pt-16">
      <div className="mx-auto max-w-sm text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/[0.08]">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-emerald-400"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-3 py-1.5 text-[12px] font-semibold text-emerald-300">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
          {statusMeta.badge}
        </span>

        <h1 className="mt-4 text-2xl font-bold leading-tight text-white sm:text-3xl">
          {pathMeta.confirmedHeading}
        </h1>

        <p className="mt-2 text-[14px] leading-relaxed text-slate-400">
          {pathMeta.confirmedDescription}
        </p>

        <div className="mt-5 rounded-[18px] border border-white/[0.07] bg-white/[0.025] px-4 py-3.5 text-right">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-[11px] font-semibold text-white/75">
              {pathMeta.label}
            </span>
            <p className="text-[10px] font-bold tracking-widest text-slate-500/70">آخر خطوة مكتملة</p>
          </div>
          <p className="mt-3 text-[12px] leading-relaxed text-slate-400">{statusMeta.note}</p>
        </div>

        {session?.selectedGift ? (
          <div className="mt-5 rounded-[18px] border border-cyan-300/15 bg-cyan-300/[0.04] px-4 py-3.5 text-right">
            <p className="text-[10px] font-bold tracking-widest text-cyan-300/60">الهدية المعتمدة</p>
            <p className="mt-1.5 text-[14px] font-bold text-white">{session.selectedGift.title}</p>
          </div>
        ) : null}

        {session?.addressData?.name ? (
          <div className="mt-5 rounded-[18px] border border-white/[0.07] bg-white/[0.025] px-4 py-3.5 text-right">
            <p className="text-[10px] font-bold tracking-widest text-slate-500/70">سيتم التوصيل إلى</p>
            <p className="mt-1.5 text-[14px] font-bold text-white">{session.addressData.name}</p>
            <p className="mt-1 text-[12px] leading-relaxed text-slate-400">
              {session.addressData.city} — {session.addressData.address}
            </p>
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => navigate('/')}
          className="mt-6 rounded-full bg-[linear-gradient(90deg,#7c5cff,#22d3ee)] px-8 py-3 text-[15px] font-bold text-white shadow-[0_10px_30px_rgba(34,211,238,0.15)] transition-all duration-200 hover:shadow-[0_14px_40px_rgba(34,211,238,0.22)] active:scale-[0.98]"
        >
          تم
        </button>
      </div>
    </Section>
  )
}
