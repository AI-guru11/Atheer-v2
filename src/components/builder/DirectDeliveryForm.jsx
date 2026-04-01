import { useState } from "react"
import { cx } from "../../utils/helpers"
import {
  getRequiredFieldError,
  getSaudiMobileError,
  sanitizeSaudiMobileInput,
} from "../../utils/formValidation"

const FIELDS = [
  {
    key: "senderName",
    label: "اسمك",
    type: "text",
    placeholder: "الاسم الذي سيظهر داخل الطلب",
    required: true,
    multiline: false,
  },
  {
    key: "recipientName",
    label: "اسم المستلم",
    type: "text",
    placeholder: "أدخل اسم المستلم",
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
    key: "city",
    label: "المدينة",
    type: "text",
    placeholder: "مثال: الرياض",
    required: true,
    multiline: false,
  },
  {
    key: "address",
    label: "العنوان",
    type: "text",
    placeholder: "الحي، الشارع، رقم المبنى",
    required: true,
    multiline: false,
  },
  {
    key: "senderMessage",
    label: "ملاحظة للمستلم",
    type: "text",
    placeholder: "رسالة قصيرة ترفق مع الطلب",
    required: false,
    multiline: true,
  },
  {
    key: "notes",
    label: "ملاحظات إضافية",
    type: "text",
    placeholder: "أي تفاصيل إضافية للتوصيل",
    required: false,
    multiline: true,
  },
]

const initialValues = {
  senderName: "",
  recipientName: "",
  phone: "",
  city: "",
  address: "",
  senderMessage: "",
  notes: "",
}

const inputBase =
  "w-full rounded-[14px] border bg-white/[0.03] px-4 py-2.5 text-[14px] text-white placeholder-slate-600 outline-none transition-colors duration-200"

function sanitizeValues(values) {
  return {
    ...values,
    senderName: values.senderName.trim(),
    recipientName: values.recipientName.trim(),
    phone: sanitizeSaudiMobileInput(values.phone),
    city: values.city.trim(),
    address: values.address.trim(),
    senderMessage: values.senderMessage.trim(),
    notes: values.notes.trim(),
  }
}

function getFieldError(field, value) {
  if (!field.required && !String(value).trim()) return ""
  if (field.key === "phone") return getSaudiMobileError(value)
  if (field.required) return getRequiredFieldError(value)
  return ""
}

export default function DirectDeliveryForm({ onSubmit, onBack, initialData }) {
  const [values, setValues] = useState(initialData ?? initialValues)
  const [touched, setTouched] = useState({})

  function handleChange(key, value) {
    const nextValue = key === "phone" ? sanitizeSaudiMobileInput(value) : value
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
      const allTouched = {}
      FIELDS.forEach((field) => {
        allTouched[field.key] = true
      })
      setTouched(allTouched)
      return
    }
    onSubmit(sanitizeValues(values))
  }

  return (
    <div className="text-right">
      <div className="mb-6">
        <h2 className="text-xl font-bold leading-tight text-white sm:text-2xl">
          بيانات الطلب المباشر
        </h2>
        <p className="mt-1.5 text-[13px] leading-relaxed text-slate-400">
          هذا المسار يجهز طلبًا مباشرًا باسمك وبيانات المستلم، ويثبت الهدية داخل الطلب بدل تركها كتوصية عامة سهلة التسريب.
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
                    rows={field.key === "notes" ? 3 : 2}
                    aria-invalid={invalid}
                    className={cx(
                      inputBase,
                      "resize-none focus:bg-white/[0.05]",
                      borderClass,
                    )}
                  />
                ) : (
                  <input
                    type={field.type}
                    value={values[field.key]}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    onBlur={() => handleBlur(field.key)}
                    placeholder={field.placeholder}
                    dir={field.key === "phone" ? "ltr" : "rtl"}
                    inputMode={field.inputMode}
                    maxLength={field.maxLength}
                    aria-invalid={invalid}
                    className={cx(inputBase, "focus:bg-white/[0.05]", borderClass)}
                  />
                )}

                {field.key === "phone" && (
                  <p className="text-[11px] text-slate-500">أدخل 10 أرقام تبدأ بـ 05</p>
                )}

                {invalid && (
                  <p className="text-[11px] text-rose-400">{errorMessage}</p>
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
            متابعة لمراجعة الطلب
          </button>
        </div>
      </form>
    </div>
  )
}
