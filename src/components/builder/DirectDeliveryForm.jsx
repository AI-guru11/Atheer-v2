import { useState } from "react"
import { cx } from "../../utils/helpers"

const FIELDS = [
  {
    key: "senderName",
    label: "اسمك",
    type: "text",
    placeholder: "اسمك الذي سيظهر في الطلب",
    required: true,
  },
  {
    key: "senderMessage",
    label: "رسالة داخلية للطلب",
    type: "text",
    placeholder: "اختياري: ملاحظة سريعة مرتبطة بالمناسبة أو أسلوب التقديم",
    required: false,
  },
  {
    key: "recipientName",
    label: "اسم المستلم",
    type: "text",
    placeholder: "أدخل اسم المستلم",
    required: true,
  },
  {
    key: "phone",
    label: "رقم الجوال",
    type: "tel",
    placeholder: "05XXXXXXXX",
    required: true,
  },
  {
    key: "city",
    label: "المدينة",
    type: "text",
    placeholder: "مثال: الرياض",
    required: true,
  },
  {
    key: "address",
    label: "العنوان",
    type: "text",
    placeholder: "الحي، الشارع، رقم المبنى",
    required: true,
  },
  {
    key: "notes",
    label: "ملاحظات إضافية",
    type: "text",
    placeholder: "أي تفاصيل إضافية للتوصيل",
    required: false,
  },
]

const initialValues = {
  senderName: "",
  senderMessage: "",
  recipientName: "",
  phone: "",
  city: "",
  address: "",
  notes: "",
}

export default function DirectDeliveryForm({ onSubmit, onBack, initialData }) {
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
      const allTouched = {}
      FIELDS.forEach((f) => {
        allTouched[f.key] = true
      })
      setTouched(allTouched)
      return
    }
    onSubmit(values)
  }

  return (
    <div className="text-right">
      <div className="mb-6">
        <h2 className="text-xl font-bold leading-tight text-white sm:text-2xl">
          بيانات التوصيل
        </h2>
        <p className="mt-1.5 text-[13px] leading-relaxed text-slate-400">
          أدخل معلومات المستلم لنبدأ تجهيز الهدية بشكل صحيح
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-4">
          {FIELDS.map((field) => {
            const invalid = isInvalid(field)
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
                  className={cx(
                    "w-full rounded-[14px] border bg-white/[0.03] px-4 py-2.5 text-[14px] text-white placeholder-slate-600 outline-none transition-colors duration-200",
                    "focus:bg-white/[0.05]",
                    invalid
                      ? "border-rose-500/40 focus:border-rose-400/60"
                      : "border-white/10 focus:border-violet-400/40",
                  )}
                />
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
