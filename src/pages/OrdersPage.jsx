import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Section from '../components/layout/Section'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import {
  getAllGiftSessions,
  getGiftPathMeta,
  getGiftStatusMeta,
  getOrderFilterCategory,
  archiveOrder,
  unarchiveOrder,
} from '../lib/giftSession'

function formatDate(value) {
  if (!value) return '—'
  try {
    return new Intl.DateTimeFormat('ar-SA', { dateStyle: 'medium' }).format(new Date(value))
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

const CAT_CLASSES = {
  completed: 'text-emerald-300 border-emerald-300/20 bg-emerald-300/[0.08]',
  awaiting:  'text-amber-300  border-amber-300/20  bg-amber-300/[0.08]',
  active:    'text-cyan-300   border-cyan-300/20   bg-cyan-300/[0.08]',
}

export default function OrdersPage() {
  const navigate = useNavigate()

  // Mutable session list so archive actions trigger re-render
  const [sessions, setSessions] = useState(() => getAllGiftSessions())
  const [filter, setFilter] = useState('all')
  const [archiveMode, setArchiveMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedCode, setCopiedCode] = useState(null)

  function refresh() {
    setSessions(getAllGiftSessions())
  }

  function handleArchive(code) {
    archiveOrder(code)
    refresh()
  }

  function handleUnarchive(code) {
    unarchiveOrder(code)
    refresh()
  }

  function handleCopyCode(code) {
    if (navigator.clipboard) navigator.clipboard.writeText(code).catch(() => {})
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2200)
  }

  function handleToggleArchiveMode() {
    setArchiveMode((m) => !m)
    setFilter('all')
    setSearchQuery('')
  }

  // Split by archived flag
  const activeSessions   = useMemo(() => sessions.filter((s) => s.archived !== true), [sessions])
  const archivedSessions = useMemo(() => sessions.filter((s) => s.archived === true),  [sessions])
  const modeSessions     = archiveMode ? archivedSessions : activeSessions

  // Counts always from non-archived sessions
  const counts = useMemo(() => {
    const c = { awaiting: 0, active: 0, completed: 0 }
    activeSessions.forEach((s) => { c[getOrderFilterCategory(s)]++ })
    return c
  }, [activeSessions])

  // Category filter (suppressed in archive mode)
  const categoryFiltered = useMemo(() => {
    if (archiveMode || filter === 'all') return modeSessions
    return modeSessions.filter((s) => getOrderFilterCategory(s) === filter)
  }, [modeSessions, filter, archiveMode])

  // Search filter
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

  return (
    <Section>
      <div className="mx-auto max-w-4xl space-y-6 text-right">

        <div className="section-heading mb-0">
          <p className="eyebrow">Orders</p>
          <h1>الطلبات المحلية</h1>
          <p className="section-copy mt-3 max-w-2xl">
            عرض موحد لجميع الطلبات المحفوظة على هذا الجهاز. يمكنك متابعة أي طلب أو فتح عرضه الداخلي مباشرة من هنا.
          </p>
        </div>

        {/* ── Summary counters (always non-archived) ── */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'إجمالي الطلبات', value: activeSessions.length, color: 'text-white' },
            { label: 'بانتظار إجراء',  value: counts.awaiting,        color: 'text-amber-300' },
            { label: 'نشط',             value: counts.active,           color: 'text-cyan-300' },
            { label: 'مكتمل',           value: counts.completed,        color: 'text-emerald-300' },
          ].map(({ label, value, color }) => (
            <div key={label} className="surface-panel rounded-2xl px-4 py-4 text-right">
              <p className={`text-2xl font-bold tabular-nums ${color}`}>{value}</p>
              <p className="mt-1 text-[12px] text-slate-400">{label}</p>
            </div>
          ))}
        </div>

        {/* ── Toolbar: search + archive mode toggle ── */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث بالكود أو الاسم أو المناسبة..."
              dir="rtl"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-lg leading-none text-slate-400 transition-colors hover:text-white"
                aria-label="مسح البحث"
              >
                ×
              </button>
            )}
          </div>
          <button
            onClick={handleToggleArchiveMode}
            className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
              archiveMode
                ? 'border-violet-500/50 bg-violet-500/15 text-violet-200'
                : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-white'
            }`}
          >
            {archiveMode ? 'الرجوع للنشطة' : 'المؤرشفة'}
            {!archiveMode && archivedSessions.length > 0 && (
              <span className="mr-2 text-[11px] opacity-70">{archivedSessions.length}</span>
            )}
          </button>
        </div>

        {/* ── Category filter tabs (hidden in archive mode) ── */}
        {!archiveMode && (
          <div className="flex flex-wrap gap-2">
            {FILTERS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
                  filter === key
                    ? 'border-violet-500/50 bg-violet-500/15 text-violet-200'
                    : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-white'
                }`}
              >
                {label}
                {key !== 'all' && counts[key] > 0 && (
                  <span className="mr-2 text-[11px] opacity-70">{counts[key]}</span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* ── Empty state ── */}
        {visible.length === 0 && (
          <Card className="placeholder-card space-y-4 py-10 text-center">
            <p className="text-slate-400">
              {archiveMode
                ? 'لا توجد طلبات مؤرشفة.'
                : searchQuery
                  ? 'لا توجد نتائج تطابق بحثك.'
                  : filter === 'all'
                    ? 'لا توجد طلبات محفوظة على هذا الجهاز بعد.'
                    : 'لا توجد طلبات ضمن هذا التصنيف.'}
            </p>
            {!archiveMode && !searchQuery && filter === 'all' && (
              <div className="flex justify-center">
                <Button variant="primary" onClick={() => navigate('/builder')}>
                  ابدأ طلبًا جديدًا
                </Button>
              </div>
            )}
          </Card>
        )}

        {/* ── Order rows ── */}
        {visible.length > 0 && (
          <div className="space-y-3">
            {visible.map((session) => {
              const pathMeta   = getGiftPathMeta(session.giftPath)
              const statusMeta = getGiftStatusMeta(session.status, session.giftPath)
              const cat        = getOrderFilterCategory(session)

              return (
                <Card key={session.code} className="section-card p-5">

                  {/* Top row: code + copy + status badge / path type */}
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2" dir="ltr">
                      <span className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-sm font-semibold text-white">
                        {session.code}
                      </span>
                      <button
                        onClick={() => handleCopyCode(session.code)}
                        className="rounded-lg border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] font-semibold text-slate-400 transition-colors hover:border-white/20 hover:text-white"
                      >
                        {copiedCode === session.code ? 'تم النسخ ✓' : 'نسخ'}
                      </button>
                      <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${CAT_CLASSES[cat]}`}>
                        {statusMeta.badge}
                      </span>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-0.5 text-[12px] font-semibold text-white/80">
                      {pathMeta.label}
                    </span>
                  </div>

                  {/* Meta row */}
                  <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-4">
                    <div>
                      <p className="text-[10px] font-bold tracking-widest text-slate-500">المستلم</p>
                      <p className="mt-0.5 text-white">{session.recipientName || '—'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold tracking-widest text-slate-500">المرسل</p>
                      <p className="mt-0.5 text-white">{session.senderName || '—'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold tracking-widest text-slate-500">المناسبة</p>
                      <p className="mt-0.5 text-white">{session.occasionLabel || '—'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold tracking-widest text-slate-500">آخر تحديث</p>
                      <p className="mt-0.5 text-white">{formatDate(session.updatedAt || session.createdAt)}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-4">
                    {!session.archived ? (
                      <>
                        <Button
                          variant="primary"
                          onClick={() => navigate(`/checkout?code=${session.code}`)}
                        >
                          متابعة الطلب
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => navigate(`/checkout?code=${session.code}&ops=1`)}
                        >
                          عرض داخلي
                        </Button>
                        {session.shareLink ? (
                          <Button
                            variant="ghost"
                            onClick={() => navigate(`/gift/open?code=${session.code}`)}
                          >
                            فتح رابط المستلم
                          </Button>
                        ) : null}
                        <button
                          onClick={() => handleArchive(session.code)}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[12px] font-semibold text-slate-400 transition-colors hover:border-white/20 hover:text-white"
                        >
                          أرشفة
                        </button>
                      </>
                    ) : (
                      <Button
                        variant="secondary"
                        onClick={() => handleUnarchive(session.code)}
                      >
                        إلغاء الأرشفة
                      </Button>
                    )}
                  </div>

                </Card>
              )
            })}
          </div>
        )}

        {/* ── Bottom nav ── */}
        <div className="flex flex-wrap gap-2.5">
          <Button variant="primary" onClick={() => navigate('/builder')}>
            ابدأ طلبًا جديدًا
          </Button>
          <Button variant="secondary" onClick={() => navigate('/')}>
            العودة للرئيسية
          </Button>
        </div>

      </div>
    </Section>
  )
}
