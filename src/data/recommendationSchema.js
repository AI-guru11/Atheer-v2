export const recipientTypes = [
  "mother",
  "father",
  "friend",
  "partner",
  "child",
  "manager",
  "colleague",
  "client",
  "family_member",
  "other",
]

export const occasionTypes = [
  "birthday",
  "appreciation",
  "anniversary",
  "promotion",
  "surprise",
  "graduation",
  "new_baby",
  "eid",
  "ramadan",
  "corporate_gifting",
  "farewell",
  "get_well",
  "custom",
]

export const budgetBands = [
  "under_250",
  "250_500",
  "500_1000",
  "above_1000",
]

export const interestCategories = [
  "perfumes",
  "coffee",
  "books",
  "electronics",
  "sports",
  "self_care",
  "fashion",
  "gaming",
  "home",
  "stationery",
  "flowers",
  "sweets",
  "open_to_suggestions",
]

export const revealStyles = [
  "simple_elegant",
  "emotional_personal",
  "luxury_premium",
  "playful_interactive",
  "formal_polished",
  "surprise_heavy",
]

export const controlModes = [
  "manual",
  "assisted",
  "delegated",
]

export const scoreWeights = {
  recipientFit: 0.2,
  occasionFit: 0.2,
  budgetFit: 0.15,
  tasteFit: 0.15,
  revealFit: 0.1,
  merchantConfidence: 0.08,
  giftability: 0.07,
  practicalWowBalance: 0.05,
}

export const budgetBandRanges = {
  under_250: { min: 0, max: 250 },
  "250_500": { min: 250, max: 500 },
  "500_1000": { min: 500, max: 1000 },
  above_1000: { min: 1000, max: Infinity },
}

export const builderValueToSchemaMap = {
  recipient: {
    father: "father",
    mother: "mother",
    friend: "friend",
    partner: "partner",
    child: "child",
    manager: "manager",
  },
  occasion: {
    birthday: "birthday",
    thanks: "appreciation",
    anniversary: "anniversary",
    "special-surprise": "surprise",
    promotion: "promotion",
    corporate: "corporate_gifting",
  },
  budget: {
    "under-250": "under_250",
    "250-500": "250_500",
    "500-1000": "500_1000",
    "1000-plus": "above_1000",
  },
  interest: {
    coffee: "coffee",
    books: "books",
    perfume: "perfumes",
    electronics: "electronics",
    sports: "sports",
    "self-care": "self_care",
    gaming: "gaming",
    open: "open_to_suggestions",
  },
  revealStyle: {
    simple: "simple_elegant",
    emotional: "emotional_personal",
    playful: "playful_interactive",
    luxury: "luxury_premium",
    surprise: "surprise_heavy",
    professional: "formal_polished",
  },
  controlMode: {
    self: "manual",
    copilot: "assisted",
    delegated: "delegated",
  },
}

export const recommendationTypeLabels = {
  best_fit: "الخيار الأنسب",
  safe_pick: "خيار مضمون",
  premium_pick: "خيار أرقى",
  smart_surprise: "خيار مميز",
}

export const controlModeLabels = {
  manual: "اختيار يدوي بالكامل",
  assisted: "اقتراح ذكي مع مراجعة العميل",
  delegated: "تفويض كامل لأثير",
}

export const revealToneLabels = {
  warm_refined: "دافئ وراقٍ",
  romantic_soft: "رومانسي وهادئ",
  formal_premium: "رسمي ومرتب",
  playful_modern: "مرح وحديث",
  grateful_respectful: "تقديري ومحترم",
  celebratory: "احتفالي",
}