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

const LEGACY_GIFT_STATUS_ALIASES = {
  direct_review_ready: "direct_order_confirmed",
}

function normalizeGiftStatus(status, deliveryMode) {
  if (!status) return ""

  if (LEGACY_GIFT_STATUS_ALIASES[status]) {
    return LEGACY_GIFT_STATUS_ALIASES[status]
  }

  if (status === "link_ready" && deliveryMode === "directDelivery") {
    return "direct_order_confirmed"
  }

  return status
}

function normalizeStatusTimeline(statusTimeline, deliveryMode, fallbackStatus) {
  const normalizedEntries = Array.isArray(statusTimeline) ? statusTimeline : []
  const deduped = []

  normalizedEntries.forEach((entry) => {
    const nextStatus = normalizeGiftStatus(entry?.status, deliveryMode)
    if (!nextStatus) return

    const previous = deduped[deduped.length - 1]
    if (previous?.status === nextStatus) return

    deduped.push({
      status: nextStatus,
      at: entry?.at || new Date().toISOString(),
    })
  })

  if (deduped.length > 0) return deduped

  const normalizedFallback = normalizeGiftStatus(fallbackStatus, deliveryMode)
  return normalizedFallback ? [createStatusEntry(normalizedFallback)] : []
}

function migrateLegacyGiftSession(session) {
  if (!session) return null

  const normalizedStatus = normalizeGiftStatus(session.status, session.deliveryMode)
  const normalizedTimeline = normalizeStatusTimeline(
    session.statusTimeline,
    session.deliveryMode,
    normalizedStatus,
  )

  const currentTimeline = Array.isArray(session.statusTimeline) ? session.statusTimeline : []
  const hasStatusChanged = normalizedStatus !== session.status
  const hasTimelineChanged = JSON.stringify(normalizedTimeline) != JSON.stringify(currentTimeline)

  if (!hasStatusChanged && !hasTimelineChanged) return session

  return {
    ...session,
    status: normalizedStatus,
    statusTimeline: normalizedTimeline,
  }
}

function getSessionStatus(session) {
  return normalizeGiftStatus(session?.status, session?.deliveryMode)
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

export function getGiftStatusMeta(status, giftPath, deliveryMode = "") {
  const isExactGift = giftPath === "exactGift"
  const normalizedStatus = normalizeGiftStatus(status, deliveryMode)

  const fallback = isExactGift
    ? {
        badge: "الطلب قيد المتابعة",
        note: "هناك هدية محددة مرتبطة بهذا الطلب، ويمكنك الرجوع إلى الملخص لمراجعة آخر خطوة مكتملة.",
      }
    : {
        badge: "التجربة قيد المتابعة",
        note: "هناك تجربة اختيار هدية مرتبطة بهذا الطلب، ويمكنك الرجوع إلى الملخص لمراجعة آخر خطوة مكتملة.",
      }

  const statusMap = {
    link_ready: isExactGift
      ? {
          badge: "رابط الهدية جاهز",
          note: "تم تجهيز رابط خاص لعرض لحظة الكشف والهدية المحددة عند فتحه من المستلم.",
        }
      : {
          badge: "رابط الاختيار جاهز",
          note: "تم تجهيز رابط خاص لعرض تجربة الاختيار والخيارات المتاحة للمستلم.",
        },
    opened: isExactGift
      ? {
          badge: "تم فتح تجربة الهدية",
          note: "بدأ المستلم رحلة الهدية المحددة، والخطوة التالية هي متابعة لحظة الكشف.",
        }
      : {
          badge: "تم فتح تجربة الاختيار",
          note: "بدأ المستلم رحلة الاختيار، والخطوة التالية هي عرض التجربة قبل قائمة الخيارات.",
        },
    unlocked: {
      badge: "تم فتح لحظة الكشف",
      note: "أصبحت تفاصيل الهدية المحددة جاهزة للعرض الكامل أمام المستلم.",
    },
    revealed: isExactGift
      ? {
          badge: "تم عرض تفاصيل الهدية",
          note: "شاهد المستلم تفاصيل الهدية المحددة، والخطوة التالية هي إدخال بيانات الاستلام.",
        }
      : {
          badge: "تم عرض تفاصيل التجربة",
          note: "تم عرض مقدمة تجربة الاختيار، والخطوة التالية هي مراجعة قائمة الهدايا المتاحة.",
        },
    choice_pending: {
      badge: "الخيارات أصبحت متاحة",
      note: "يمكن للمستلم الآن مراجعة الخيارات المتاحة واختيار هدية واحدة للمتابعة.",
    },
    gift_selected: {
      badge: "تم اختيار الهدية",
      note: "تم تثبيت الهدية المختارة، والخطوة التالية هي إدخال بيانات التوصيل الخاصة بها.",
    },
    address_submitted: {
      badge: "تم استلام بيانات التوصيل",
      note: "تم حفظ بيانات الهدية والتوصيل داخل الطلب، وأصبح الطلب جاهزًا للمراجعة النهائية.",
    },
    direct_order_confirmed: {
      badge: "تم تأكيد الطلب",
      note: "تم حفظ الهدية وبيانات التوصيل داخل طلب واحد، وأصبح الطلب جاهزًا للمتابعة.",
    },
  }

  return statusMap[normalizedStatus] || fallback
}

export function getGiftNextStepMeta(session) {
  if (!session) {
    return {
      title: "لا توجد خطوة تالية",
      note: "افتح الجلسة من المسار الصحيح لمتابعة الطلب.",
    }
  }

  const normalizedStatus = getSessionStatus(session)

  const statusMap = {
    link_ready: {
      title: "شارك الرابط مع المستلم",
      note: "تم تجهيز الرابط داخل الطلب، والخطوة التالية هي أن يفتحه المستلم ليبدأ التجربة من جهته.",
    },
    opened: {
      title: "ينتظر استكمال تجربة المستلم",
      note: "المستلم بدأ التجربة، والخطوة التالية ستظهر تلقائيًا عند انتقاله لمرحلة الكشف أو العرض.",
    },
    unlocked: {
      title: "ينتظر عرض تفاصيل الهدية",
      note: "تم فتح لحظة الكشف، والخطوة التالية هي مشاهدة التفاصيل الكاملة للهدية.",
    },
    revealed: session.giftPath === "exactGift"
      ? {
          title: "ينتظر إدخال بيانات الاستلام",
          note: "بعد عرض تفاصيل الهدية، يحتاج المستلم الآن إلى إدخال بيانات التوصيل.",
        }
      : {
          title: "ينتظر مراجعة قائمة الخيارات",
          note: "بعد عرض التجربة، يحتاج المستلم الآن إلى الانتقال لقائمة الهدايا المتاحة.",
        },
    choice_pending: {
      title: "ينتظر اختيار هدية واحدة",
      note: "المستلم يستطيع الآن اختيار الهدية الأنسب له من المجموعة المحفوظة داخل الطلب.",
    },
    gift_selected: {
      title: "ينتظر إدخال بيانات التوصيل",
      note: "تم اختيار الهدية، والخطوة التالية هي إدخال بيانات التسليم الخاصة بالمستلم.",
    },
    address_submitted: {
      title: "الطلب جاهز للمراجعة النهائية",
      note: "جميع التفاصيل الأساسية أصبحت محفوظة، ويمكن الآن متابعة الطلب من نفس المرجع.",
    },
    direct_order_confirmed: {
      title: "الطلب محفوظ وجاهز للمتابعة",
      note: "تم تثبيت الطلب المباشر بالكامل داخل الجلسة، ويمكن استخدام صفحة الملخص كمرجع ثابت للمتابعة.",
    },
  }

  return statusMap[normalizedStatus] || {
    title: "راجع ملخص الطلب",
    note: "هذا الملخص هو المرجع الحالي لحالة الطلب والتفاصيل المحفوظة داخله.",
  }
}

export function getGiftTimelineEntries(session) {
  if (!session?.statusTimeline?.length) return []

  return normalizeStatusTimeline(session.statusTimeline, session.deliveryMode, session.status).map((entry) => {
    const meta = getGiftStatusMeta(entry.status, session.giftPath, session.deliveryMode)
    return {
      ...entry,
      label: meta.badge,
      note: meta.note,
    }
  })
}

export function getGiftReadinessChecklist(session) {
  if (!session) return []

  const items = [
    {
      key: "session",
      label: "مرجع الطلب محفوظ",
      done: Boolean(session.code),
    },
    {
      key: "gift",
      label: session.giftPath === "exactGift" ? "الهدية محددة" : "المجموعة محفوظة",
      done: session.giftPath === "exactGift"
        ? Boolean(session.selectedGift)
        : Array.isArray(session.giftOptions) && session.giftOptions.length > 0,
    },
    {
      key: "recipient",
      label: "بيانات المستلم محفوظة",
      done: Boolean(session.recipientName),
    },
    {
      key: "address",
      label: "بيانات التوصيل مكتملة",
      done: Boolean(session.addressData?.name && session.addressData?.address && session.addressData?.city),
    },
  ]

  if (session.deliveryMode !== "directDelivery") {
    items.splice(3, 0, {
      key: "shareLink",
      label: "رابط التجربة محفوظ",
      done: Boolean(session.shareLink),
    })
  }

  return items
}

export function getGiftOpsMeta(session) {
  if (!session) {
    return {
      badge: "Ops غير متاح",
      note: "الجلسة غير موجودة، لذلك لا يمكن تجهيز handoff داخلي.",
      lane: "غير متاح",
      readiness: "غير مكتمل",
    }
  }

  const normalizedStatus = getSessionStatus(session)

  const statusMap = {
    link_ready: {
      badge: "بانتظار تفاعل المستلم",
      note: "تم حفظ الرابط داخل الجلسة، لكن handoff الداخلي يظل ناقصًا حتى يبدأ المستلم التجربة أو يكمل اختياره.",
      lane: "انتظار تفاعل",
      readiness: "معلّق",
    },
    opened: {
      badge: "المستلم داخل التجربة",
      note: "الطلب نشط حاليًا من جهة المستلم. لا يلزم إجراء داخلي الآن سوى المتابعة من نفس المرجع.",
      lane: "متابعة",
      readiness: "معلّق",
    },
    unlocked: {
      badge: "الكشف تم فتحه",
      note: "تجربة الكشف بدأت، لكن handoff الداخلي يكتمل بعد ظهور تفاصيل الهدية أو استلام الاختيار النهائي.",
      lane: "متابعة",
      readiness: "معلّق",
    },
    revealed: session.giftPath === "exactGift"
      ? {
          badge: "بانتظار عنوان الاستلام",
          note: "الهدية أصبحت واضحة داخل الجلسة، لكن التنفيذ لا ينتقل للمرحلة التالية قبل حفظ بيانات التوصيل.",
          lane: "استكمال بيانات",
          readiness: "معلّق",
        }
      : {
          badge: "بانتظار اختيار نهائي",
          note: "المجموعة ظهرت للمستلم، لكن handoff الداخلي لا يكتمل قبل تثبيت هدية واحدة داخل الطلب.",
          lane: "استكمال اختيار",
          readiness: "معلّق",
        },
    choice_pending: {
      badge: "بانتظار تثبيت الهدية",
      note: "تجربة الاختيار جاهزة، وأقرب نقطة تشغيلية حقيقية هي لحظة اختيار المستلم لهدية واحدة.",
      lane: "استكمال اختيار",
      readiness: "معلّق",
    },
    gift_selected: {
      badge: "الهدية محددة داخليًا",
      note: "الهدية النهائية ثبتت داخل الجلسة، والخطوة الحاسمة المتبقية هي بيانات التوصيل فقط.",
      lane: "استكمال بيانات",
      readiness: "شبه جاهز",
    },
    address_submitted: {
      badge: "جاهز للتنفيذ اليدوي",
      note: "الهدية وبيانات التوصيل والمستلم أصبحت محفوظة، ويمكن استخدام هذه الصفحة كنقطة handoff تشغيلية داخلية.",
      lane: "handoff جاهز",
      readiness: "جاهز",
    },
    direct_order_confirmed: {
      badge: "handoff مباشر جاهز",
      note: "الطلب المباشر محفوظ بالكامل داخل الجلسة ويمكن استخدام مرجع الطلب كحزمة تنفيذ داخلية دون الرجوع للـ Builder.",
      lane: "handoff جاهز",
      readiness: "جاهز",
    },
  }

  return statusMap[normalizedStatus] || {
    badge: "يتطلب مراجعة",
    note: "الجلسة تحتوي على بيانات مفيدة، لكن الحالة الحالية لا تزال تحتاج مراجعة داخلية قبل اعتماد handoff الكامل.",
    lane: "مراجعة داخلية",
    readiness: "معلّق",
  }
}

export function getGiftOpsChecklist(session) {
  if (!session) return []

  const hasRecipientContact = Boolean(session.recipientName && (session.recipientPhone || session.recipientEmail))
  const hasGiftLocked = session.giftPath === "exactGift"
    ? Boolean(session.selectedGift)
    : Boolean(session.selectedGift || (Array.isArray(session.giftOptions) && session.giftOptions.length > 0))

  return [
    {
      key: "ops-reference",
      label: "مرجع الطلب جاهز للاستخدام الداخلي",
      done: Boolean(session.code),
    },
    {
      key: "ops-path",
      label: "مسار الهدية واضح داخل الجلسة",
      done: Boolean(session.giftPath && session.deliveryMode),
    },
    {
      key: "ops-gift",
      label: session.giftPath === "exactGift" ? "الهدية النهائية مثبتة" : "بيانات الاختيار النهائي أو المجموعة جاهزة",
      done: hasGiftLocked,
    },
    {
      key: "ops-recipient",
      label: "بيانات التواصل مع المستلم موجودة",
      done: hasRecipientContact,
    },
    {
      key: "ops-address",
      label: "بيانات التوصيل صالحة للتنفيذ",
      done: Boolean(session.addressData?.name && session.addressData?.city && session.addressData?.address),
    },
    {
      key: "ops-status",
      label: "حالة العميل متزامنة مع آخر خطوة",
      done: Array.isArray(session.statusTimeline) && session.statusTimeline.length > 0,
    },
  ]
}

export function buildGiftOpsHandoff(session) {
  if (!session) return "لا توجد جلسة متاحة لبناء handoff داخلي."

  const pathMeta = getGiftPathMeta(session.giftPath)
  const opsMeta = getGiftOpsMeta(session)
  const selectedGiftTitle = session.selectedGift?.title || (session.giftOptions?.[0]?.title ?? "—")
  const lines = [
    `Order Ref: ${session.code || "—"}`,
    `Ops Lane: ${opsMeta.lane}`,
    `Ops Readiness: ${opsMeta.readiness}`,
    `Gift Path: ${pathMeta.label}`,
    `Delivery Mode: ${session.deliveryMode === "directDelivery" ? "Direct Delivery" : "Recipient Link"}`,
    `Occasion: ${session.occasionLabel || "—"}`,
    `Budget: ${session.budgetLabel || "—"}`,
    `Sender: ${session.senderName || "—"}`,
    `Recipient: ${session.recipientName || "—"}`,
    `Phone: ${session.recipientPhone || session.addressData?.phone || "—"}`,
    `Gift: ${selectedGiftTitle}`,
    `Address: ${session.addressData ? `${session.addressData.city || "—"} — ${session.addressData.address || "—"}` : "—"}`,
    `Customer Status: ${getGiftStatusMeta(session.status, session.giftPath, session.deliveryMode).badge}`,
    `Ops Note: ${opsMeta.note}`,
  ]

  return lines.join("\n")
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
    const parsed = JSON.parse(raw)
    const migrated = migrateLegacyGiftSession(parsed)

    if (migrated && JSON.stringify(migrated) !== JSON.stringify(parsed)) {
      window.localStorage.setItem(getStorageKey(code), JSON.stringify(migrated))
    }

    return migrated
  } catch {
    return null
  }
}

export function updateGiftSession(code, patch) {
  if (!code) return null

  const existing = getGiftSessionByCode(code)
  if (!existing) return null

  const nextStatus = normalizeGiftStatus(patch?.status, existing.deliveryMode)
  const currentStatus = getSessionStatus(existing)
  const shouldAppendStatus = nextStatus && nextStatus !== currentStatus

  const nextSession = migrateLegacyGiftSession({
    ...existing,
    ...patch,
    status: nextStatus || currentStatus,
    updatedAt: new Date().toISOString(),
    statusTimeline: shouldAppendStatus
      ? [...normalizeStatusTimeline(existing.statusTimeline, existing.deliveryMode, currentStatus), createStatusEntry(nextStatus)]
      : normalizeStatusTimeline(existing.statusTimeline, existing.deliveryMode, currentStatus),
  })

  persistGiftSession(nextSession)
  return nextSession
}

function normalizeBaseUrl(baseUrl) {
  if (!baseUrl) return ""
  const sanitized = baseUrl.replace(/#.*$/, "").replace(/\/index\.html$/, "")
  return sanitized.endsWith("/") ? sanitized : `${sanitized}/`
}

export function resolveGiftLinkBaseUrl() {
  if (!isBrowser()) return ""

  return normalizeBaseUrl(`${window.location.origin}${window.location.pathname}`)
}

export function buildGiftLink(baseUrlOrSession, maybeSession) {
  const session = maybeSession ?? baseUrlOrSession
  const explicitBaseUrl = maybeSession ? baseUrlOrSession : ""

  if (!session?.code) return ""

  const payload = encodeUtf8ToBase64Url(session)
  const baseUrl = normalizeBaseUrl(explicitBaseUrl || resolveGiftLinkBaseUrl())

  return `${baseUrl}#/gift/open?code=${session.code}&gift=${payload}`
}

export function buildGiftFlowUrl(path, session, searchParams) {
  if (!path) return ""

  const params = new URLSearchParams()
  const code = session?.code || searchParams?.get?.("code") || ""
  if (code) params.set("code", code)

  const existingPayload = searchParams?.get?.("gift") || ""
  const nextPayload = existingPayload || (session?.code ? encodeUtf8ToBase64Url(session) : "")
  if (nextPayload) params.set("gift", nextPayload)

  const query = params.toString()
  return query ? `${path}?${query}` : path
}

export function getAllGiftSessions() {
  if (!isBrowser()) return []

  const sessions = []
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i)
    if (!key?.startsWith(STORAGE_PREFIX)) continue
    try {
      const raw = window.localStorage.getItem(key)
      if (!raw) continue

      const parsed = JSON.parse(raw)
      const migrated = migrateLegacyGiftSession(parsed)
      if (migrated && JSON.stringify(migrated) !== JSON.stringify(parsed)) {
        window.localStorage.setItem(key, JSON.stringify(migrated))
      }

      if (migrated) sessions.push(migrated)
    } catch {
      // skip malformed entries
    }
  }

  return sessions.sort((a, b) => {
    const ta = a.updatedAt || a.createdAt || ''
    const tb = b.updatedAt || b.createdAt || ''
    return tb.localeCompare(ta)
  })
}

export function getOrderFilterCategory(session) {
  const status = getSessionStatus(session)
  if (!status) return 'active'

  if (status === 'address_submitted' || status === 'direct_order_confirmed') return 'completed'
  if (status === 'link_ready' || status === 'gift_selected') return 'awaiting'
  if (status === 'revealed' && session?.giftPath === 'exactGift') return 'awaiting'

  return 'active'
}

// Save a plain-text internal note on a local session.
// The note is internal only — never surfaced in customer-facing messages.
export function saveOrderNote(code, noteText) {
  return updateGiftSession(code, { notes: (noteText ?? '').trim() })
}

// Set or clear the "علّم للمتابعة" priority flag on a local session.
export function setOrderPriorityFlag(code, value) {
  return updateGiftSession(code, { flaggedPriority: Boolean(value) })
}

// Set or clear the "يحتاج متابعة" follow-up flag on a local session.
export function setFollowUpFlag(code, value) {
  return updateGiftSession(code, { followUpNeeded: Boolean(value) })
}

// Build a clean, customer-safe sender follow-up snippet from session data.
// Internal notes and sourcing details are intentionally excluded.
export function buildSenderFollowUpSnippet(session) {
  if (!session) return ''
  const statusMeta = getGiftStatusMeta(session.status, session.giftPath, session.deliveryMode)
  const nextStep = getGiftNextStepMeta(session)
  const recipient = session.recipientName ? ` لـ ${session.recipientName}` : ''
  const occasion = session.occasionLabel ? ` بمناسبة ${session.occasionLabel}` : ''
  return [
    `مرحباً ${session.senderName || 'عزيزنا العميل'}،`,
    '',
    `بخصوص طلب هديتك${recipient}${occasion}:`,
    `مرجع الطلب: ${session.code}`,
    `الحالة الحالية: ${statusMeta.badge}`,
    '',
    `الخطوة التالية: ${nextStep.title}`,
    '',
    'نحن متاحون لأي استفسار. شكراً لثقتك.',
  ].join('\n')
}

// Build a clean, customer-safe recipient coordination snippet from session data.
// Internal notes and sourcing details are intentionally excluded.
export function buildRecipientCoordinationSnippet(session) {
  if (!session) return ''
  const occasion = session.occasionLabel || 'مناسبة مميزة'
  const linkLine = session.shareLink
    ? 'يمكنك فتح تجربة هديتك الخاصة عبر الرابط الذي تم إرساله إليك.'
    : 'سيتم التواصل معك قريباً لتأكيد تفاصيل الاستلام.'
  return [
    `مرحباً ${session.recipientName || ''}،`.replace('، ،', '،').trim(),
    '',
    `لديك هدية خاصة بمناسبة ${occasion}.`,
    linkLine,
    '',
    `للاستفسار يُرجى ذكر المرجع: ${session.code}`,
  ].join('\n')
}

// Build grouped preset variants for the order detail follow-up toolkit.
// Each group returns an array of { key, label, text } ready for copy or insert-to-notes.
// Internal notes are never included in any variant text.
export function buildOrderPresets(session) {
  if (!session) return { sender: [], recipient: [], ops: [] }

  const statusMeta = getGiftStatusMeta(session.status, session.giftPath, session.deliveryMode)
  const nextStep   = getGiftNextStepMeta(session)
  const sender     = session.senderName    || 'العميل'
  const recipient  = session.recipientName || ''
  const occasion   = session.occasionLabel || 'مناسبة مميزة'
  const code       = session.code          || '—'
  const recipientSuffix = recipient ? ` لـ ${recipient}` : ''
  const giftTitle  = session.selectedGift?.title ?? null

  return {
    sender: [
      {
        key:   'short',
        label: 'قصير',
        text:  [
          `مرحباً ${sender}،`,
          `طلبك رقم ${code} — الحالة: ${statusMeta.badge}.`,
          `الخطوة التالية: ${nextStep.title}`,
        ].join('\n'),
      },
      {
        key:   'formal',
        label: 'رسمي',
        text:  buildSenderFollowUpSnippet(session),
      },
      {
        key:   'reminder',
        label: 'تذكير',
        text:  [
          `تذكير — طلب هديتك${recipientSuffix} (${code})`,
          `لا يزال في انتظار: ${nextStep.title}`,
          `الحالة الحالية: ${statusMeta.badge}`,
          '',
          'يُرجى المتابعة عند أقرب فرصة. نحن هنا لمساعدتك.',
        ].join('\n'),
      },
    ],
    recipient: [
      {
        key:   'short',
        label: 'قصير',
        text:  [
          `مرحباً${recipient ? ' ' + recipient : ''}،`,
          `لديك هدية بمناسبة ${occasion}. المرجع: ${code}`,
        ].join('\n'),
      },
      {
        key:   'formal',
        label: 'رسمي',
        text:  buildRecipientCoordinationSnippet(session),
      },
      {
        key:   'reminder',
        label: 'تذكير',
        text:  [
          `تذكير — هديتك بمناسبة ${occasion} تنتظرك.`,
          session.shareLink
            ? 'افتح الرابط المرسل إليك لاستكمال تجربة استلام هديتك.'
            : 'سيتم التواصل معك قريباً لتأكيد تفاصيل الاستلام.',
          `المرجع: ${code}`,
        ].join('\n'),
      },
    ],
    ops: [
      {
        key:   'quick',
        label: 'سريع',
        text:  [
          `REF ${code} — ${statusMeta.badge}`,
          `Next: ${nextStep.title}`,
          `${sender}${recipient ? ' → ' + recipient : ''}`,
          giftTitle ? `Gift: ${giftTitle}` : null,
        ].filter(Boolean).join('\n'),
      },
      {
        key:   'detailed',
        label: 'تفصيلي',
        text:  buildGiftOpsHandoff(session),
      },
      {
        key:   'status',
        label: 'حالة',
        text:  [
          `Order: ${code}`,
          `Status: ${statusMeta.badge}`,
          `Next: ${nextStep.title}`,
          `Path: ${session.giftPath === 'exactGift' ? 'Exact Gift' : 'Recipient Choice'}`,
          `Mode: ${session.deliveryMode === 'directDelivery' ? 'Direct' : 'Link'}`,
          session.addressData ? 'Address: ✓' : 'Address: pending',
        ].join('\n'),
      },
    ],
  }
}

// Returns a numeric sort priority — lower = more operationally urgent.
// Used by the "الأولوية" sort in OrdersPage.
export function getStatusSortPriority(session) {
  const status = getSessionStatus(session)
  if (!status) return 10

  if (status === 'gift_selected') return 1
  if (status === 'revealed' && session?.giftPath === 'exactGift') return 2
  if (status === 'choice_pending') return 3
  if (status === 'opened') return 4
  if (status === 'unlocked') return 5
  if (status === 'revealed') return 6
  if (status === 'link_ready') return 7
  if (status === 'address_submitted') return 8
  if (status === 'direct_order_confirmed') return 9

  return 11
}

export function archiveOrder(code) {
  updateGiftSession(code, { archived: true })
}

export function unarchiveOrder(code) {
  updateGiftSession(code, { archived: false })
}

export function resolveGiftSession(searchParams) {
  const code = searchParams.get("code")
  const payload = searchParams.get("gift")

  if (payload) {
    try {
      const payloadSession = migrateLegacyGiftSession(decodeBase64UrlToUtf8(payload))
      if (payloadSession?.code) {
        const cachedSession = getGiftSessionByCode(payloadSession.code)
        const resolvedSession = migrateLegacyGiftSession(
          cachedSession?.updatedAt
            ? {
                ...payloadSession,
                ...cachedSession,
              }
            : payloadSession,
        )

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
