import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Section from '../components/layout/Section'
import { cx } from '../utils/helpers'

const FIELDS = [
  {
    key: 'name',
    label: 'الاسم',
    type: 'text',
    placeholder: 'اسمك الكامل',
    required: true,
  },
  {
    key: 'phone',
    label: 'رقم الجوال',
    type: 'tel',
    placeholder: '05XXXXXXXX',
    required: true,
  },
  {
    key: 'city',
    label: 'المدينة',
    type: 'text',
    placeholder: 'مثال: الرياض',
    required: true,
  },
  {
    key: 'address',
    label: 'العنوان',
    type: 'text',
    placeholder: 'الحي، الشارع، رقم المبنى',
    required: true,
  },
  {
    key: 'notes',
    label: 'ملاحظات إضافية',
    type: 'text',
    placeholder: 'أي تفاصيل تساعد في التوصيل',
    required: false,
  },
]

const initialValues = { name: '', phone: '', city: '', address: '', notes: '' }

const inputBase =
  'w-full rounded-[14px] border bg-white/[0.03] px-4 py-2.5 text-[14px] text-white placeholder-slate-600 outline-none transition-colors duration-200 focus:bg-white/[0.05]'

export default function RecipientAddressPage() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const selectedGift = state?.selectedGift ?? null

  const [values, setValues] = useState(initialValues)
  const [touched, setTouched] = useState({})

  function handleChange(key, value) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  function handleBlur(key) {
    setTouched((prev) => ({ ...prev, [key]: true }))
  }

  function isInvalid(field) {
    return field.required && touched[field.key] && !values[field.key].trim()
  }

  function canSubmit() {
    return FIELDS.every((f) => !f.required || values[f.key].trim())
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!canSubmit()) {
      const all = {}
      FIELDS.forEach((f) => {
        all[f.key] = true
      })
      setTouched(all)
      return
    }
    navigate('/gift/confirmed', {
      state: { selectedGift, addressData: values },
    })
  }

  return (
    <Section className="pt-10 sm:pt-16">
      <div className="mx-auto max-w-lg text-right">

        {/* Selected gift mini-summary */}
        {selectedGift && (
          <div className="mb-5 rounded-[18px] border border-cyan-300/15 bg-cyan-300/[0.04] px-4 py-3">
            <p className="mb-1 text-[10px] font-bold tracking-widest text-cyan-300/60">
              اخترت
            </p>
            <div className="flex items-center justify-between gap-3">
              <span className="text-[12px] tabular-nums text-white/60">
                {selectedGift.priceRange}
              </span>
              <p className="text-[14px] font-bold text-white">{selectedGift.title}</p>
            </div>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-xl font-bold leading-tight text-white sm:text-2xl">
            أين نوصّل هديتك؟
          </h2>
          <p className="mt-1.5 text-[13px] leading-relaxed text-slate-400">
            أدخل بيانات التوصيل لإتمام اختيارك
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">
            {FIELDS.map((field) => {
              const invalid = isInvalid(field)
              const borderClass = invalid
                ? 'border-rose-500/40 focus:border-rose-400/60'
                : 'border-white/10 focus:border-violet-400/40'

              return (
                <div key={field.key} className="space-y-1.5">
                  <label className="block text-[13px] font-semibold text-slate-300">
                    {field.label}
                    {!field.required && (
                      <span className="mr-1.5 text-[11px] font-normal text-slate-500">
                        (اختياري)
                      </span>
                    )}
                  </label>
                  <input
                    type={field.type}
                    value={values[field.key]}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    onBlur={() => handleBlur(field.key)}
                    placeholder={field.placeholder}
                    dir="rtl"
                    className={cx(inputBase, borderClass)}
                  />
                  {invalid && (
                    <p className="text-[11px] text-rose-400">هذا الحقل مطلوب</p>
                  )}
                </div>
              )
            })}
          </div>

          <div className="mt-7 flex flex-col-reverse gap-2.5">
            <button
              type="button"
              onClick={() => navigate('/gift/choose')}
              className="rounded-full border border-white/[0.08] bg-white/[0.02] px-5 py-2.5 text-[13px] font-semibold text-slate-400 transition-colors duration-200 hover:border-white/15 hover:text-slate-200"
            >
              الرجوع لاختيار هدية أخرى
            </button>
            <button
              type="submit"
              className="rounded-full bg-[linear-gradient(90deg,#7c5cff,#22d3ee)] px-6 py-3 text-[15px] font-bold text-white shadow-[0_10px_30px_rgba(34,211,238,0.15)] transition-all duration-200 hover:shadow-[0_14px_40px_rgba(34,211,238,0.22)] active:scale-[0.98]"
            >
              تأكيد الاختيار
            </button>
          </div>
        </form>

      </div>
    </Section>
  )
}
