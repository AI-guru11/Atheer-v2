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

function buildBaseSession({
  code,
  selections,
  senderName,
  recipientName,
  recipientPhone,
  recipientEmail,
  message,
  recommendationTitle,
  selectedGift,
  giftOptions,
  addressData,
  status,
  shareLink = "",
}) {
  const createdAt = new Date().toISOString()

  return {
    code,
    createdAt,
    updatedAt: createdAt,
    status,
    statusTimeline: [createStatusEntry(status)],
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
    message: message || "",
    senderName: senderName?.trim() || "مرسل الهدية",
    recipientName: recipientName || "",
    recipientPhone: recipientPhone || "",
    recipientEmail: recipientEmail || "",
    recommendationTitle: recommendationTitle || "",
    selectedGift: selectedGift || null,
    giftOptions: giftOptions || [],
    addressData: addressData || null,
    shareLink,
  }
}

export function getGiftPathMeta(giftPath) {
  if (giftPath === "exactGift") {
    return {
      key: "exactGift",
      label: "هدية محددة",
      badge: "مسار هدية محددة",
      senderTitle: "أنت ترسل هدية محددة",
      senderNote: "المستلم سيرى الهدية نفسها بعد لحظة كشف قصيرة ثم ينتقل مباشرة إلى بيانات الاستلام.",
      entryHeading: "تم اختيار هدية محددة لك",
      entryDescription: "افتح التجربة وشاهد الهدية التي تم تجهيزها لك قبل تأكيد بيانات الاستلام.",
      entryCta: "ابدأ لحظة الكشف",
      revealHeading: "هذه الهدية التي اختارها لك المُهدي",
      revealDescription: "بعد مراجعة تفاصيل الهدية ستنتقل مباشرة إلى إدخال بيانات الاستلام.",
      revealCta: "أكمل بيانات الاستلام",
      addressHeading: "أدخل بيانات استلام هديتك",
      addressDescription: "هذه البيانات ستُستخدم لتأكيد تسليم الهدية المحددة التي ظهرت لك.",
      confirmedHeading: "تم تأكيد استلام الهدية",
      confirmedDescription: "تم حفظ بيانات الاستلام الخاصة بالهدية المحددة وجلسة الهدية أصبحت جاهزة للمتابعة.",
      steps: ["فتح الرابط", "لحظة الكشف", "مشاهدة الهدية", "إدخال العنوان"],
    }
  }

  return {
    key: "recipientChoice",
    label: "اختيار من مجموعة",
    badge: "مسار اختيار هدية",
    senderTitle: "أنت ترسل تجربة اختيار",
    senderNote: "المستلم سيشاهد مجموعة هدايا منسقة، يختار واحدة منها، ثم يُدخل بيانات الاستلام.",
    entryHeading: "تم إعداد تجربة اختيار هدية لك",
    entryDescription: "افتح التجربة وراجع المجموعة المختارة لك ثم اختر الهدية الأنسب قبل إدخال العنوان.",
    entryCta: "ابدأ عرض الخيارات",
    revealHeading: "هذه تجربتك الخاصة لاختيار الهدية",
    revealDescription: "الخطوة التالية ستكون عرض الخيارات المتاحة لك لاختيار هدية واحدة منها.",
    revealCta: "انتقل إلى قائمة الخيارات",
    addressHeading: "أدخل بيانات استلام اختيارك",
    addressDescription: "بعد اختيار الهدية المناسبة لك، أكمل بيانات التوصيل لإتمام التجربة.",
    confirmedHeading: "تم تأكيد اختيارك وبيانات الاستلام",
    confirmedDescription: "تم حفظ اختيارك من المجموعة مع بيانات الاستلام، وأصبحت الجلسة جاهزة للمتابعة.",
    steps: ["فتح الرابط", "عرض التجربة", "اختيار هدية", "إدخال العنوان"],
  }
}

export function getGiftStatusMeta(status, giftPath) {
  const isExactGift = giftPath === "exactGift"

  const fallback = isExactGift
    ? {
        badge: "مسار هدية محددة",
        note: "هناك هدية محددة بانتظار الكشف ثم تأكيد بيانات الاستلام.",
      }
    : {
        badge: "مسار اختيار هدية",
        note: "هناك تجربة اختيار هدية بانتظار مراجعة الخيارات ثم اختيار واحدة منها.",
      }

  const statusMap = {
    link_ready: isExactGift
      ? {
          badge: "رابط كشف الهدية جاهز",
          note: "تم تجهيز رابط خاص يفتح لحظة الكشف ثم يعرض الهدية المحددة قبل إدخال العنوان.",
        }
      : {
          badge: "رابط الاختيار جاهز",
          note: "تم تجهيز رابط خاص يفتح تجربة الاختيار ثم يعرض المجموعة المتاحة للمستلم.",
        },
    opened: isExactGift
      ? {
          badge: "بدأت لحظة الكشف",
          note: "بدأ المستلم رحلة الهدية المحددة، والخطوة التالية هي تهيئة لحظة الكشف قبل عرض الهدية.",
        }
      : {
          badge: "بدأت تجربة الاختيار",
          note: "بدأ المستلم رحلة اختيار الهدية، والخطوة التالية هي عرض التجربة قبل قائمة الخيارات.",
        },
    unlocked: {
      badge: "تم فتح لحظة الكشف",
      note: "تم تجاوز خطوة التهيئة وأصبحت تفاصيل الهدية المحددة جاهزة للعرض الكامل.",
    },
    revealed: isExactGift
      ? {
          badge: "تم عرض الهدية",
          note: "شاهد المستلم تفاصيل الهدية المحددة والخطوة التالية هي إدخال بيانات الاستلام.",
        }
      : {
          badge: "تم عرض التجربة",
          note: "تم عرض مقدمة تجربة الاختيار والخطوة التالية هي مراجعة قائمة الهدايا المتاحة.",
        },
    choice_pending: {
      badge: "قائمة الخيارات جاهزة",
      note: "أصبحت مجموعة الهدايا جاهزة للمراجعة، ويجب اختيار هدية واحدة فقط للمتابعة.",
    },
    gift_selected: {
      badge: "تم اختيار الهدية",
      note: "تم تثبيت الهدية المختارة والخطوة التالية هي إدخال عنوان الاستلام لهذه الهدية.",
    },
    address_submitted: {
      badge: "تم حفظ بيانات الاستلام",
      note: "تم حفظ اختيار الهدية وبيانات الاستلام داخل الجلسة نفسها وأصبحت جاهزة للمتابعة النهائية.",
    },
    direct_review_ready: {
      badge: "الطلب جاهز للمراجعة",
      note: "تم تثبيت التوصية داخل الطلب. الخطوة الحالية هي مراجعة بيانات المرسل والمستلم قبل اعتماد التجهيز.",
    },
    direct_order_confirmed: {
      badge: "تم اعتماد طلب التوصيل المباشر",
      note: "تم حفظ الهدية وبيانات التوصيل في جلسة واحدة وأصبح الطلب جاهزًا لمرحلة الدفع أو التنفيذ لاحقًا.",
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

  return buildBaseSession({
    code,
    selections,
    senderName: recipientData?.senderName,
    recipientName: recipientData?.name,
    recipientPhone: recipientData?.phone,
    recipientEmail: recipientData?.email,
    message: recipientData?.message,
    recommendationTitle: recommendation?.summaryAngle,
    selectedGift: selections.giftPath === "exactGift" ? topPick : null,
    giftOptions: selections.giftPath === "recipientChoice" ? giftOptions : [],
    addressData: null,
    status: "link_ready",
  })
}

export function createDirectDeliverySession({ code, selections, shippingData, recommendation }) {
  const topPick = recommendation?.topPick ? sanitizeOption(recommendation.topPick) : null

  return buildBaseSession({
    code,
    selections,
    senderName: shippingData?.senderName,
    recipientName: shippingData?.recipientName,
    recipientPhone: shippingData?.phone,
    recipientEmail: "",
    message: shippingData?.senderMessage,
    recommendationTitle: recommendation?.summaryAngle,
    selectedGift: topPick,
    giftOptions: [],
    addressData: shippingData
      ? {
          name: shippingData.recipientName || "",
          phone: shippingData.phone || "",
          city: shippingData.city || "",
          address: shippingData.address || "",
          notes: shippingData.notes || "",
        }
      : null,
    status: "direct_order_confirmed",
  })
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
