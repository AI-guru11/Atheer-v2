import { useState } from "react"
import { cx } from "../../utils/helpers"

const FIELDS = [
  {
    key: "name",
    label: "اسم المستلم",
    type: "text",
    placeholder: "اسم الشخص الذي ستهديه",
    required: true,
    multiline: false,
  },
  {
    key: "phone",
    label: "رقم الجوال",
    type: "tel",
    placeholder: "05XXXXXXXX",
    required: true,
    multiline: false,
  },
  {
    key: "email",
    label: "البريد الإلكتروني",
    type: "email",
    placeholder: "example@email.com",
    required: true,
    multiline: false,
  },
  {
    key: "message",
    label: "رسالة شخصية للمستلم",
    type: "text",
    placeholder: "اكتب رسالة تُرفق مع الهدية",
    required: false,
    multiline: true,
  },
]

const initialValues = { name: "", phone: "", email: "", message: "" }

export default function RecipientContactForm({ onSubmit, onBack, initialData }) {
  const [values, setValues] = useState(initialData ?? initialValues)
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
    onSubmit(values)
  }

  const inputBase =
    "w-full rounded-[14px] border bg-white/[0.03] px-4 py-2.5 text-[14px] text-white placeholder-slate-600 outline-none transition-colors duration-200 focus:bg-white/[0.05]"

  return (
    <div className="text-right">
      <div className="mb-6">
        <h2 className="text-xl font-bold leading-tight text-white sm:text-2xl">
          بيانات المستلم
        </h2>
        <p className="mt-1.5 text-[13px] leading-relaxed text-slate-400">
          أدخل معلومات الشخص الذي ستُرسل له رابط الهدية
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-4">
          {FIELDS.map((field) => {
            const invalid = isInvalid(field)
            const borderClass = invalid
              ? "border-rose-500/40 focus:border-rose-400/60"
              : "border-white/10 focus:border-violet-400/40"

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

                {field.multiline ? (
                  <textarea
                    value={values[field.key]}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    onBlur={() => handleBlur(field.key)}
                    placeholder={field.placeholder}
                    dir="rtl"
                    rows={3}
                    className={cx(inputBase, "resize-none", borderClass)}
                  />
                ) : (
                  <input
                    type={field.type}
                    value={values[field.key]}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    onBlur={() => handleBlur(field.key)}
                    placeholder={field.placeholder}
                    dir="rtl"
                    className={cx(inputBase, borderClass)}
                  />
                )}

                {invalid && (
                  <p className="text-[11px] text-rose-400">هذا الحقل مطلوب</p>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-7 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onBack}
            className="rounded-full border border-white/[0.08] bg-white/[0.02] px-5 py-2.5 text-[13px] font-semibold text-slate-400 transition-colors duration-200 hover:border-white/15 hover:text-slate-200"
          >
            رجوع
          </button>
          <button
            type="submit"
            className="rounded-full bg-[linear-gradient(90deg,#7c5cff,#22d3ee)] px-6 py-3 text-[15px] font-bold text-white shadow-[0_10px_30px_rgba(34,211,238,0.15)] transition-all duration-200 hover:shadow-[0_14px_40px_rgba(34,211,238,0.22)] active:scale-[0.98]"
          >
            متابعة للمراجعة
          </button>
        </div>
      </form>
    </div>
  )
}
