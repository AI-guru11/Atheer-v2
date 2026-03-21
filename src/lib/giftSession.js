const STORAGE_PREFIX = "atheer_gift_session:"

function isBrowser() {
  return typeof window !== "undefined"
}

function getStorageKey(code) {
  return `${STORAGE_PREFIX}${code}`
}

function encodeUtf8ToBase64Url(value) {
  if (!isBrowser()) return ""

  const normalized = JSON.stringify(value)
  const bytes = new TextEncoder().encode(normalized)
  let binary = ""
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })

  return window.btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "")
}

function decodeBase64UrlToUtf8(value) {
  if (!isBrowser() || !value) return null

  const padded = value.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((value.length + 3) % 4)
  const binary = window.atob(padded)
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
  const decoded = new TextDecoder().decode(bytes)
  return JSON.parse(decoded)
}

function sanitizeOption(option) {
  if (!option) return null

  return {
    id: option.id,
    title: option.title,
    subtitle: option.subtitle || "",
    description: option.shortDescription || option.whyFit || option.description || "",
    priceRange: option.priceRange || "",
    badge: option.label || option.badge || "",
    label: option.label || "",
  }
}

function createStatusEntry(status) {
  return {
    status,
    at: new Date().toISOString(),
  }
}

export function getGiftStatusMeta(status, giftPath) {
  const isExactGift = giftPath === "exactGift"

  const fallback = isExactGift
    ? {
        badge: "رحلة الهدية",
        note: "هناك هدية بانتظار الكشف ثم تأكيد الاستلام.",
      }
    : {
        badge: "رحلة الاختيار",
        note: "هناك تجربة اختيار هدية بانتظارك.",
      }

  const statusMap = {
    link_ready: isExactGift
      ? {
          badge: "رابط الكشف جاهز",
          note: "تم تجهيز رابط خاص ليشاهد المستلم الهدية ثم يكمل بيانات الاستلام.",
        }
      : {
          badge: "رابط الاختيار جاهز",
          note: "تم تجهيز رابط خاص ليطّلع المستلم على الخيارات ويختار هديته بنفسه.",
        },
    opened: isExactGift
      ? {
          badge: "تم فتح الرابط",
          note: "بدأ المستلم تجربة الهدية ووصل إلى بداية مسار الكشف.",
        }
      : {
          badge: "تم فتح الرابط",
          note: "بدأ المستلم تجربة الاختيار ووصل إلى صفحة البداية.",
        },
    unlocked: {
      badge: "تم فتح لحظة الكشف",
      note: "تم تجاوز خطوة التهيئة وأصبحت تفاصيل الهدية جاهزة للعرض.",
    },
    revealed: {
      badge: "تم كشف الهدية",
      note: "شاهد المستلم تفاصيل الهدية وأصبح بإمكانه إدخال بيانات الاستلام.",
    },
    choice_pending: {
      badge: "الخيارات جاهزة",
      note: "أصبحت مجموعة الهدايا جاهزة للمراجعة والاختيار.",
    },
    gift_selected: {
      badge: "تم اختيار الهدية",
      note: "اختار المستلم الهدية المناسبة له وتبقى إدخال عنوان التوصيل أو مراجعته.",
    },
    address_submitted: {
      badge: "تم حفظ بيانات الاستلام",
      note: "حُفظ اختيار الهدية والعنوان على الجلسة نفسها وجاهز للمتابعة.",
    },
  }

  return statusMap[status] || fallback
}

export function createGiftSession({ code, selections, recipientData, recommendation }) {
  const topPick = recommendation?.topPick ? sanitizeOption(recommendation.topPick) : null
  const alternatives = Array.isArray(recommendation?.alternatives)
    ? recommendation.alternatives.map(sanitizeOption).filter(Boolean)
    : []

  const giftOptions = [topPick, ...alternatives].filter(Boolean)
  const initialStatus = "link_ready"
  const createdAt = new Date().toISOString()

  return {
    code,
    createdAt,
    updatedAt: createdAt,
    status: initialStatus,
    statusTimeline: [
      {
        status: initialStatus,
        at: createdAt,
      },
    ],
    giftPath: selections.giftPath,
    deliveryMode: selections.deliveryMode,
    revealStyle: selections.revealStyle,
    recipient: selections.recipient,
    recipientLabel: selections.recipientLabel,
    occasion: selections.occasion,
    occasionLabel: selections.occasionLabel,
    budget: selections.budget,
    budgetLabel: selections.budgetLabel,
    interest: selections.interest,
    interestLabel: selections.interestLabel,
    revealStyleLabel: selections.revealStyleLabel,
    message: recipientData?.message || "",
    senderName: recipientData?.senderName?.trim() || "مرسل الهدية",
    recipientName: recipientData?.name || "",
    recipientPhone: recipientData?.phone || "",
    recipientEmail: recipientData?.email || "",
    recommendationTitle: recommendation?.summaryAngle || "",
    selectedGift: selections.giftPath === "exactGift" ? topPick : null,
    giftOptions: selections.giftPath === "recipientChoice" ? giftOptions : [],
    addressData: null,
  }
}

export function persistGiftSession(session) {
  if (!isBrowser() || !session?.code) return
  window.localStorage.setItem(getStorageKey(session.code), JSON.stringify(session))
}

export function getGiftSessionByCode(code) {
  if (!isBrowser() || !code) return null

  const raw = window.localStorage.getItem(getStorageKey(code))
  if (!raw) return null

  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function updateGiftSession(code, patch) {
  if (!code) return null

  const existing = getGiftSessionByCode(code)
  if (!existing) return null

  const nextStatus = patch?.status
  const shouldAppendStatus = nextStatus && nextStatus !== existing.status

  const nextSession = {
    ...existing,
    ...patch,
    updatedAt: new Date().toISOString(),
    statusTimeline: shouldAppendStatus
      ? [...(existing.statusTimeline || []), createStatusEntry(nextStatus)]
      : (existing.statusTimeline || []),
  }

  persistGiftSession(nextSession)
  return nextSession
}

export function buildGiftLink(baseUrl, session) {
  const payload = encodeUtf8ToBase64Url(session)
  return `${baseUrl}#/gift/open?code=${session.code}&gift=${payload}`
}

export function resolveGiftSession(searchParams) {
  const code = searchParams.get("code")
  const payload = searchParams.get("gift")

  if (payload) {
    try {
      const payloadSession = decodeBase64UrlToUtf8(payload)
      if (payloadSession?.code) {
        const cachedSession = getGiftSessionByCode(payloadSession.code)
        const resolvedSession = cachedSession?.updatedAt
          ? {
              ...payloadSession,
              ...cachedSession,
            }
          : payloadSession

        persistGiftSession(resolvedSession)
        return resolvedSession
      }
    } catch {
      // fall through to local cache
    }
  }

  if (!code) return null
  return getGiftSessionByCode(code)
}
