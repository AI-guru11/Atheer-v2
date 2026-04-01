import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Section from '../components/layout/Section'
import Button from '../components/ui/Button'
import { cx } from '../utils/helpers'
import {
  getAllGiftSessions,
  getGiftPathMeta,
  getGiftStatusMeta,
  getGiftNextStepMeta,
  getOrderFilterCategory,
  getStatusSortPriority,
  archiveOrder,
  unarchiveOrder,
} from '../lib/giftSession'

function formatDate(value) {
  if (!value) return '—'
  try {
    return new Intl.DateTimeFormat('ar-SA', { 
      day: 'numeric', 
      month: 'short', 
      hour: '2-digit', 
      minute: '2-digit' 
    }).format(new Date(value))
  } catch {
    return value
  }
}

const FILTERS = [
  { key: 'all',       label: 'الكل' },
  { key: 'awaiting',  label: 'بانتظار إجراء' },
  { key: 'active',    label: 'نشط' },
  { key: 'completed', label: 'مكتمل' },
]

const CAT_STYLES = {
  completed: 'text-emerald-400 border-emerald-400/20 bg-emerald-400/[0.08] shadow-[0_0_12px_rgba(52,211,153,0.15)]',
  awaiting:  'text-amber-400 border-amber-400/20 bg-amber-400/[0.08] shadow-[0_0_12px_rgba(251,191,36,0.15)]',
  active:    'text-brand-2 border-brand-2/20 bg-brand-2/[0.08] shadow-[0_0_12px_rgba(56,225,245,0.15)]',
}

const SHOW_NEXT_STEP_FOR = new Set(['awaiting', 'active'])

export default function OrdersPage() {
  const navigate = useNavigate()

  const [sessions, setSessions] = useState(() => getAllGiftSessions())
  const [filter, setFilter]           = useState('all')
  const [sortBy, setSortBy]           = useState('updated')
  const [archiveMode, setArchiveMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedCode, setCopiedCode]   = useState(null)

  function refresh() { setSessions(getAllGiftSessions()) }

  function handleArchive(code)   { archiveOrder(code);   refresh() }
  function handleUnarchive(code) { unarchiveOrder(code); refresh() }

  function handleCopyCode(code) {
    if (navigator.clipboard) navigator.clipboard.writeText(code).catch(() => {})
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  function handleToggleArchiveMode() {
    setArchiveMode((m) => !m)
    setFilter('all')
    setSearchQuery('')
  }

  function handleOpenRecipientLink(shareLink) {
    if (!shareLink || typeof window === 'undefined') return
    window.open(shareLink, '_blank', 'noopener,noreferrer')
  }

  const activeSessions   = useMemo(() => sessions.filter((s) => s.archived !== true), [sessions])
  const archivedSessions = useMemo(() => sessions.filter((s) => s.archived === true),  [sessions])
  const modeSessions     = archiveMode ? archivedSessions : activeSessions

  const counts = useMemo(() => {
    const c = { awaiting: 0, active: 0, completed: 0 }
    activeSessions.forEach((s) => { c[getOrderFilterCategory(s)]++ })
    return c
  }, [activeSessions])

  const sortedSessions = useMemo(() => {
    if (sortBy === 'priority') {
      return [...modeSessions].sort((a, b) => getStatusSortPriority(a) - getStatusSortPriority(b))
    }
    return modeSessions
  }, [modeSessions, sortBy])

  const categoryFiltered = useMemo(() => {
    if (archiveMode || filter === 'all') return sortedSessions
    return sortedSessions.filter((s) => getOrderFilterCategory(s) === filter)
  }, [sortedSessions, filter, archiveMode])

  const visible = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return categoryFiltered
    return categoryFiltered.filter((s) =>
      s.code?.toLowerCase().includes(q) ||
      s.recipientName?.toLowerCase().includes(q) ||
      s.senderName?.toLowerCase().includes(q) ||
      s.occasionLabel?.toLowerCase().includes(q) ||
      s.selectedGift?.title?.toLowerCase().includes(q)
    )
  }, [categoryFiltered, searchQuery])

  // --- مكون مصغر للعدادات ---
  const StatCard = ({ label, value, highlight = false, colorClass = "text-white" }) => (
    <div className={cx(
      "relative overflow-hidden rounded-[24px] border p-5 text-right transition-all duration-300",
      highlight ? "border-brand/30 bg-gradient-to-br from-brand/[0.08] to-transparent shadow-[0_8px_24px_rgba(129,101,255,0.12)]" : "border-white/[0.05] bg-white/[0.02]"
    )}>
      {highlight && <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-brand/50 to-transparent" />}
      <p className={cx("text-3xl font-black tabular-nums tracking-tight", colorClass)}>{value}</p>
      <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">{label}</p>
    </div>
  )

  return (
    <Section className="min-h-screen pt-10 pb-20">
      <div className="mx-auto max-w-[56rem] space-y-8 text-right">

        {/* ── Header ── */}
        <div className="reveal-block space-y-3">
          <span className="inline-block text-[10px] font-black tracking-[0.2em] uppercase text-brand-2/80">
            Operations
          </span>
          <h1 className="text-4xl font-black leading-tight text-white tracking-tight">
            سجل الطلبات
          </h1>
          <p className="text-sm leading-relaxed text-slate-400 max-w-2xl">
            نظرة عامة على الطلبات النشطة والمحفوظة. مساحة عمل مصممة للمتابعة السريعة وضمان استمرارية تجربة الإهداء.
          </p>
        </div>

        {/* ── Summary Dashboard ── */}
        <div className="reveal-block grid grid-cols-2 gap-4 sm:grid-cols-4" style={{ transitionDelay: '100ms' }}>
          <StatCard label="إجمالي الطلبات" value={activeSessions.length} highlight />
          <StatCard label="بانتظار إجراء" value={counts.awaiting} colorClass="text-amber-400" />
          <StatCard label="نشط" value={counts.active} colorClass="text-brand-2" />
          <StatCard label="مكتمل" value={counts.completed} colorClass="text-emerald-400" />
        </div>

        {/* ── Toolbar & Filters ── */}
        <div className="reveal-block space-y-5" style={{ transitionDelay: '200ms' }}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white/[0.01] border border-white/[0.04] p-2 rounded-[24px]">
            
            {/* Tabs */}
            <div className="flex flex-wrap gap-1 p-1">
              {!archiveMode ? FILTERS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={cx(
                    "rounded-full px-5 py-2 text-[12px] font-bold transition-all duration-300",
                    filter === key
                      ? "bg-white/[0.08] text-white shadow-sm border border-white/10"
                      : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.03] border border-transparent"
                  )}
                >
                  {label}
                  {key !== 'all' && counts[key] > 0 && (
                    <span className="mr-2 inline-flex items-center justify-center rounded-full bg-white/10 px-2 py-0.5 text-[10px]">
                      {counts[key]}
                    </span>
                  )}
                </button>
              )) : (
                <span className="px-5 py-2 text-[12px] font-bold text-slate-400 border border-transparent">
                  وضع الأرشيف مفعل
                </span>
              )}
            </div>

            {/* Controls (Search & Archive Toggle) */}
            <div className="flex items-center gap-2 px-2 pb-2 sm:pb-0">
               <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="بحث بالكود أو الاسم..."
                  dir="rtl"
                  className="w-full rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2 text-[12px] text-white placeholder-slate-500 outline-none transition-all focus:border-brand/40 focus:bg-white/[0.04]"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">×</button>
                )}
              </div>
              
              <button
                onClick={handleToggleArchiveMode}
                className={cx(
                  "shrink-0 rounded-full border px-4 py-2 text-[12px] font-bold transition-all",
                  archiveMode
                    ? "border-brand/40 bg-brand/10 text-brand shadow-[0_0_15px_rgba(129,101,255,0.2)]"
                    : "border-white/[0.06] bg-white/[0.02] text-slate-400 hover:border-white/20 hover:text-white"
                )}
              >
                {archiveMode ? 'العودة للنشطة' : 'الأرشيف'}
              </button>
            </div>
          </div>
        </div>

        {/* ── Order List ── */}
        {visible.length === 0 ? (
          <div className="reveal-block charcoal-card rounded-[32px] p-12 text-center border-white/[0.03]" style={{ transitionDelay: '300ms' }}>
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-white/[0.02] flex items-center justify-center border border-white/[0.05]">
              <span className="text-xl">📭</span>
            </div>
            <p className="text-[15px] font-bold text-slate-300">
              {archiveMode ? 'لا توجد طلبات مؤرشفة' : searchQuery ? 'لا توجد نتائج مطابقة لبحثك' : 'لا توجد طلبات حالية'}
            </p>
            {!archiveMode && !searchQuery && filter === 'all' && (
              <Button variant="primary" className="mt-6 mx-auto" onClick={() => navigate('/builder')}>
                إنشاء طلب جديد
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {visible.map((session, index) => {
              const pathMeta    = getGiftPathMeta(session.giftPath)
              const statusMeta  = getGiftStatusMeta(session.status, session.giftPath)
              const nextStep    = getGiftNextStepMeta(session)
              const cat         = getOrderFilterCategory(session)
              const showNextStep = !session.archived && SHOW_NEXT_STEP_FOR.has(cat)

              return (
                <div 
                  key={session.code} 
                  className="reveal-block relative overflow-hidden rounded-[32px] border border-white/[0.04] bg-white/[0.015] p-5 sm:p-6 transition-all hover:bg-white/[0.025] hover:border-white/10 group"
                  style={{ transitionDelay: `${Math.min((index + 3) * 100, 800)}ms` }}
                >
                  {/* Status Indicator Bar */}
                  <div className={cx("absolute inset-y-0 right-0 w-1", 
                    cat === 'completed' ? 'bg-emerald-400' : 
                    cat === 'awaiting' ? 'bg-amber-400' : 'bg-brand-2'
                  )} />

                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5 pl-2">
                    
                    {/* Header: Code & Status */}
                    <div className="flex-1 space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                         <span className={cx("rounded-full border px-3 py-1 text-[11px] font-black tracking-widest uppercase", CAT_STYLES[cat])}>
                          {statusMeta.badge}
                        </span>
                        <div className="flex items-center gap-1.5" dir="ltr">
                          <span className="font-mono text-[13px] font-bold text-white tracking-widest">
                            {session.code}
                          </span>
                          <button
                            onClick={() => handleCopyCode(session.code)}
                            className="text-[10px] font-bold text-slate-500 hover:text-white bg-white/[0.04] px-2 py-1 rounded-md transition-colors"
                          >
                            {copiedCode === session.code ? '✓' : 'نسخ'}
                          </button>
                        </div>
                        <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[10px] font-bold text-slate-300">
                          {pathMeta.label}
                        </span>
                        {session.followUpNeeded && (
                          <span className="rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-[10px] font-black tracking-widest uppercase text-brand animate-pulse">
                            متابعة مطلوبة
                          </span>
                        )}
                      </div>

                      {/* Info Grid */}
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <div className="space-y-1">
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">المستلم</p>
                          <p className="text-[13px] font-bold text-white truncate">{session.recipientName || '—'}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">المرسل</p>
                          <p className="text-[13px] font-bold text-white truncate">{session.senderName || '—'}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">المناسبة</p>
                          <p className="text-[13px] font-bold text-slate-300 truncate">{session.occasionLabel || '—'}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">التحديث</p>
                          <p className="text-[11px] font-medium text-slate-400 tabular-nums">{formatDate(session.updatedAt || session.createdAt)}</p>
                        </div>
                      </div>

                      {/* Next Step Banner */}
                      {showNextStep && (
                        <div className="inline-flex items-center gap-2.5 rounded-xl border border-white/[0.04] bg-white/[0.02] px-4 py-2 mt-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-2/70" />
                          <p className="text-[12px] font-semibold text-slate-300">{nextStep.title}</p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap sm:flex-col gap-2 shrink-0 border-t border-white/[0.05] pt-4 sm:border-t-0 sm:pt-0 sm:border-r sm:pr-4">
                      {!session.archived ? (
                        <>
                          <Button variant="primary" className="py-2 text-[12px] px-6" onClick={() => navigate(`/checkout?code=${session.code}`)}>
                            إدارة الطلب
                          </Button>
                          <Button variant="secondary" className="py-2 text-[12px] px-6 bg-white/[0.02]" onClick={() => navigate(`/checkout?code=${session.code}&ops=1`)}>
                            التشغيل
                          </Button>
                          {session.shareLink && (
                            <button onClick={() => handleOpenRecipientLink(session.shareLink)} className="text-[11px] font-bold text-brand-2 hover:text-white transition-colors text-right py-1">
                              فتح رابط المستلم ↗
                            </button>
                          )}
                          <button onClick={() => handleArchive(session.code)} className="text-[11px] font-bold text-slate-500 hover:text-danger transition-colors text-right py-1">
                            أرشفة الطلب
                          </button>
                        </>
                      ) : (
                        <Button variant="secondary" className="py-2 text-[12px] px-6" onClick={() => handleUnarchive(session.code)}>
                          استعادة الطلب
                        </Button>
                      )}
                    </div>

                  </div>
                </div>
              )
            })}
          </div>
        )}

      </div>
    </Section>
  )
}
