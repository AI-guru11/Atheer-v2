const recipientLabels = {
  mother: "الأم",
  father: "الأب",
  friend: "صديق",
  partner: "الشريك",
  child: "الطفل",
  manager: "المدير",
  colleague: "الزميل",
  client: "العميل",
  family_member: "أحد أفراد العائلة",
  other: "شخص مقرّب",
}

const recipientPrepLabels = {
  mother: "للأم",
  father: "للأب",
  friend: "لصديق",
  partner: "للشريك",
  child: "للطفل",
  manager: "للمدير",
  colleague: "للزميل",
  client: "للعميل",
  family_member: "لأحد أفراد العائلة",
  other: "لشخص مقرّب",
}

const occasionLabels = {
  birthday: "عيد ميلاد",
  appreciation: "شكر وتقدير",
  anniversary: "ذكرى سنوية",
  surprise: "مفاجأة خاصة",
  promotion: "ترقية",
  corporate_gifting: "مناسبة عمل",
  graduation: "تخرّج",
  new_baby: "مولود جديد",
  eid: "العيد",
  ramadan: "رمضان",
  farewell: "وداع",
  get_well: "سلامة",
  custom: "مناسبة خاصة",
}

const occasionAsGiftLabels = {
  birthday: "هدية عيد ميلاد",
  appreciation: "هدية شكر وتقدير",
  anniversary: "هدية ذكرى سنوية",
  surprise: "هدية مفاجأة",
  promotion: "هدية ترقية",
  corporate_gifting: "هدية مناسبة عمل",
  graduation: "هدية تخرّج",
  new_baby: "هدية مولود",
  eid: "هدية العيد",
  ramadan: "هدية رمضان",
  farewell: "هدية وداع",
  get_well: "هدية سلامة",
  custom: "هدية مناسبة خاصة",
}

const toneLabels = {
  warm_refined: "دافئ وراقٍ",
  romantic_soft: "رومانسي وهادئ",
  formal_premium: "رسمي ومرتب",
  playful_modern: "مرح وحديث",
  grateful_respectful: "تقديري ومحترم",
  celebratory: "احتفالي",
}

const revealStyleDescriptions = {
  warm_refined: "هادئ ودافئ",
  romantic_soft: "رومانسي وناعم",
  formal_premium: "رسمي وراقٍ",
  playful_modern: "ممتع وحديث",
  grateful_respectful: "تقديري ومحترم",
  celebratory: "احتفالي ومؤثر",
}

const executionModeDisplay = {
  manual: {
    title: "أنت تختار",
    description: "ستراجع الخيارات المقترحة وتختار ما يناسبك بنفسك",
    benefit: "تحكّم كامل في كل تفصيل",
  },
  assisted: {
    title: "أثير يساعدك",
    description: "سنقترح لك الاتجاه الأنسب وتوافق أنت قبل التنفيذ",
    benefit: "توازن بين الراحة والتحكّم",
  },
  delegated: {
    title: "أثير يتولّى الأمر",
    description: "سنتكفّل بالاختيار والتنفيذ من البداية حتى التسليم",
    benefit: "تجربة مريحة بدون أي جهد",
  },
}

const recommendationLabels = {
  best_fit: "الاختيار الأمثل",
  safe_pick: "خيار مضمون",
  premium_pick: "خيار أرقى",
  smart_surprise: "اقتراح مميّز",
}

export function formatRecipientLabel(recipientType) {
  return recipientLabels[recipientType] || "الشخص"
}

export function formatRecipientPrepLabel(recipientType) {
  return recipientPrepLabels[recipientType] || "للشخص"
}

export function formatOccasionLabel(occasionType) {
  return occasionLabels[occasionType] || "مناسبة خاصة"
}

export function formatOccasionAsGift(occasionType) {
  return occasionAsGiftLabels[occasionType] || "هدية مناسبة خاصة"
}

export function formatPriceRange(priceMin, priceMax, currency) {
  if (!priceMin && !priceMax) return ""
  const min = Number(priceMin)
  const max = Number(priceMax)
  if (min === max) return `${min} ر.س`
  return `${min}–${max} ر.س`
}

export function formatPriceRangeFromString(priceRange) {
  if (!priceRange) return ""
  return priceRange
    .replace(/\s*SAR\s*/gi, " ر.س")
    .replace(/\s*ر\.س\s*/, "")
    .trim() + " ر.س"
}

export function formatConfidence(score) {
  const percent = Math.round(score * 100)
  if (percent >= 85) return { text: "توافق عالٍ", level: "high" }
  if (percent >= 70) return { text: "توافق جيد", level: "good" }
  if (percent >= 55) return { text: "توافق مقبول", level: "fair" }
  return { text: "اقتراح أولي", level: "low" }
}

export function formatConfidencePercent(score) {
  return `${Math.round(score * 100)}٪`
}

export function formatSourceLabel(sourceName) {
  if (!sourceName) return ""
  return sourceName
    .replace(/Atheer Curated Merchant/gi, "مختار من أثير")
    .replace(/Atheer/gi, "أثير")
}

export function formatRecommendationLabel(typeKey) {
  return recommendationLabels[typeKey] || typeKey
}

export function formatToneLabel(tone) {
  return toneLabels[tone] || tone
}

export function getRevealStyleDescription(tone) {
  return revealStyleDescriptions[tone] || "مصمّم للمناسبة"
}

export function getExecutionModeDisplay(controlMode) {
  return executionModeDisplay[controlMode] || executionModeDisplay.assisted
}

export function buildFitSummary(recipientType, occasionType) {
  const recipient = formatRecipientPrepLabel(recipientType)
  const occasion = formatOccasionAsGift(occasionType)
  return `مناسب كـ${occasion} ${recipient}`
}
