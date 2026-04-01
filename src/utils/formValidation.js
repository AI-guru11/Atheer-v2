const ARABIC_DIGIT_MAP = {
  '٠': '0',
  '١': '1',
  '٢': '2',
  '٣': '3',
  '٤': '4',
  '٥': '5',
  '٦': '6',
  '٧': '7',
  '٨': '8',
  '٩': '9',
  '۰': '0',
  '۱': '1',
  '۲': '2',
  '۳': '3',
  '۴': '4',
  '۵': '5',
  '۶': '6',
  '۷': '7',
  '۸': '8',
  '۹': '9',
}

export function normalizeDigits(value = '') {
  return String(value).replace(/[٠-٩۰-۹]/g, (digit) => ARABIC_DIGIT_MAP[digit] ?? digit)
}

export function sanitizeSaudiMobileInput(value = '') {
  return normalizeDigits(value).replace(/\D/g, '').slice(0, 10)
}

export function isValidSaudiMobile(value = '') {
  return /^05\d{8}$/.test(sanitizeSaudiMobileInput(value))
}

export function getSaudiMobileError(value = '') {
  const normalized = sanitizeSaudiMobileInput(value)

  if (!String(value).trim()) return 'هذا الحقل مطلوب'
  if (normalized.length !== 10) return 'أدخل رقم جوال من 10 أرقام'
  if (!normalized.startsWith('05')) return 'يجب أن يبدأ رقم الجوال بـ 05'
  if (!/^05\d{8}$/.test(normalized)) return 'أدخل رقم جوال سعودي صحيح'

  return ''
}

export function sanitizeEmailInput(value = '') {
  return String(value).trim()
}

export function isValidEmail(value = '') {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizeEmailInput(value))
}

export function getEmailError(value = '') {
  const normalized = sanitizeEmailInput(value)

  if (!normalized) return 'هذا الحقل مطلوب'
  if (!isValidEmail(normalized)) return 'أدخل بريدًا إلكترونيًا صحيحًا'

  return ''
}

export function getRequiredFieldError(value = '') {
  return String(value).trim() ? '' : 'هذا الحقل مطلوب'
}
