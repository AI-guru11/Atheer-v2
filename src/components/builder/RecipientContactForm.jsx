import { useState } from "react"
import { cx } from "../../utils/helpers"
import {
  getEmailError,
  getRequiredFieldError,
  getSaudiMobileError,
  sanitizeEmailInput,
  sanitizeSaudiMobileInput,
} from "../../utils/formValidation"

const FIELDS = [
  {
    key: "senderName",
    label: "اسمك",
    type: "text",
    placeholder: "اسمك الذي سيظهر للمستلم",
    required: true,
    multiline: false,
  },
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
    inputMode: "numeric",
    maxLength: 10,
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

const initialValues = { senderName: "", name: "", phone: "", email: "", message: "" }

function sanitizeValues(values) {
  return {
    ...values,
    senderName: values.senderName.trim(),
    name: values.name.trim(),
    phone: sanitizeSaudiMobileInput(values.phone),
    email: sanitizeEmailInput(values.email),
    message: values.message.trim(),
  }
}

function getFieldError(field, value) {
  if (!field.required && !String(value).trim()) return ""
  if (field.key === "phone") return getSaudiMobileError(value)
  if (field.key === "email") return getEmailError(value)
  if (field.required) return getRequiredFieldError(value)
  return ""
}

export default function RecipientContactForm({ onSubmit, onBack, initialData }) {
  const [values, setValues] = useState(initialData ?? initialValues)
  const [touched, setTouched] = useState({})

  function handleChange(key, value) {
    let nextValue = value
    if (key === "phone") nextValue = sanitizeSaudiMobileInput(value)
    if (key === "email") nextValue = sanitizeEmailInput(value)
    setValues((prev) => ({ ...prev, [key]: nextValue }))
  }

  function handleBlur(key) {
    setTouched((prev) => ({ ...prev, [key]: true }))
  }

  function fieldError(field) {
    if (!touched[field.key]) return ""
    return getFieldError(field, values[field.key])
  }

  function canSubmit() {
    return FIELDS.every((field) => !getFieldError(field, values[field.key]))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!canSubmit()) {
      const all = {}
      FIELDS.forEach((field) => {
        all[field.key] = true
      })
      setTouched(all)
      return
    }
    onSubmit(sanitizeValues(values))
  }

  const inputBase =
    "w-full rounded-[14px] border bg-white/[0.03] px-4 py-2.5 text-[14px] text-white placeholder-slate-600 outline-none transition-colors duration-200 focus:bg-white/[0.05]"

  return (
    <div className="text-right">
      <div className="mb-6">
        <h2 className="text-xl font-bold leading-tight text-white sm:text-2xl">
          بيانات المرسل والمستلم
        </h2>
        <p className="mt-1.5 text-[13px] leading-relaxed text-slate-400">
          أدخل اسمك كما تريد أن يظهر داخل تجربة الهدية، ثم أكمل بيانات المستلم الذي سيصله الرابط.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-4">
          {FIELDS.map((field) => {
            const errorMessage = fieldError(field)
            const invalid = Boolean(errorMessage)
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
                    aria-invalid={invalid}
                    className={cx(inputBase, "resize-none", borderClass)}
                  />
                ) : (
                  <input
                    type={field.type}
                    value={values[field.key]}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    onBlur={() => handleBlur(field.key)}
                    placeholder={field.placeholder}
                    dir={field.key === "phone" || field.key === "email" ? "ltr" : "rtl"}
                    inputMode={field.inputMode}
                    maxLength={field.maxLength}
                    aria-invalid={invalid}
                    className={cx(inputBase, borderClass)}
                  />
                )}

                {field.key === "phone" && (
                  <p className="text-[11px] text-slate-500">أدخل 10 أرقام تبدأ بـ 05</p>
                )}

                {invalid && (
                  <p className="text-[11px] text-rose-400">{errorMessage}</p>
                )}
              </div>
            )}
          )}
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
