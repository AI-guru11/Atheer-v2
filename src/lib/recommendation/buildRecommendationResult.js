import {
  controlModeLabels,
  revealToneLabels,
} from "../../data/recommendationSchema"

import {
  buildFitSummary,
  formatPriceRange,
  formatRecipientLabel,
  formatRecipientPrepLabel,
  formatOccasionLabel,
  formatToneLabel,
} from "../../utils/recommendationDisplay"

const recommendationTypeLabelsClean = {
  best_fit: "الاختيار الأمثل",
  safe_pick: "خيار مضمون",
  premium_pick: "خيار أرقى",
  smart_surprise: "اقتراح مميّز",
}

function resolveSummaryAngle(profile) {
  const interest = profile.taste.interestCategory
  const revealStyle = profile.reveal.revealStyle

  if (interest === "perfumes") return "هدية أنيقة بطابع شخصي وراقي"
  if (interest === "coffee") return "هدية يومية مميزة مع تجربة دافئة"
  if (interest === "books") return "هدية هادئة وذكية بطابع شخصي"
  if (interest === "electronics") return "هدية حديثة وعملية بقيمة واضحة"
  if (interest === "self_care") return "هدية راحة وعناية بأسلوب ناعم"
  if (interest === "sports") return "هدية نشيطة بروح حيوية"
  if (interest === "gaming") return "هدية ممتعة لعشّاق الألعاب"
  if (revealStyle === "surprise_heavy") return "هدية مفاجئة بتجربة كشف مؤثرة"

  return "هدية مدروسة وتجربة كشف مناسبة"
}

function resolveRevealDirection(profile) {
  const style = profile.reveal.revealStyle

  const map = {
    simple_elegant: {
      style,
      tone: "warm_refined",
      pageDirection: "minimal_glass_reveal",
    },
    emotional_personal: {
      style,
      tone: "warm_refined",
      pageDirection: "soft_emotional_reveal",
    },
    luxury_premium: {
      style,
      tone: "formal_premium",
      pageDirection: "premium_dark_reveal",
    },
    playful_interactive: {
      style,
      tone: "playful_modern",
      pageDirection: "interactive_light_reveal",
    },
    formal_polished: {
      style,
      tone: "formal_premium",
      pageDirection: "clean_corporate_reveal",
    },
    surprise_heavy: {
      style,
      tone: "celebratory",
      pageDirection: "staged_surprise_reveal",
    },
  }

  return (
    map[style] || {
      style: "simple_elegant",
      tone: "warm_refined",
      pageDirection: "minimal_glass_reveal",
    }
  )
}

function resolveExecutionMode(profile) {
  return {
    controlMode: profile.control.controlMode,
    title: controlModeLabels[profile.control.controlMode],
  }
}

function resolveDisplayTitle(product) {
  return product.displayTitleAr || product.title
}

function resolveDisplaySubtitle(product) {
  return product.displaySubtitleAr || null
}

const whyFitTemplates = {
  mother: [
    (occ) => `اختيار يليق بـ${occ} ويعكس اهتمامًا حقيقيًا`,
    (occ) => `هدية تجمع بين الأناقة والدفء بمناسبة ${occ}`,
  ],
  father: [
    (occ) => `خيار راقٍ يناسب ذوقه بمناسبة ${occ}`,
    (occ) => `هدية مدروسة تعبّر عن التقدير في ${occ}`,
  ],
  friend: [
    (occ) => `اختيار ذكي يناسب ${occ} ويترك أثرًا`,
    (occ) => `هدية مميزة تعكس معرفتك بذوقه`,
  ],
  partner: [
    (occ) => `لمسة شخصية راقية بمناسبة ${occ}`,
    (occ) => `هدية تجمع بين الخصوصية والأناقة`,
  ],
  child: [
    (occ) => `هدية ممتعة ومناسبة لعمره بمناسبة ${occ}`,
    (occ) => `اختيار يجمع بين المرح والقيمة`,
  ],
  manager: [
    (occ) => `خيار مهني وراقٍ يناسب ${occ}`,
    (occ) => `هدية مرتبة تعكس الاحترام والتقدير`,
  ],
  colleague: [
    (occ) => `اختيار أنيق ومناسب لبيئة العمل`,
    (occ) => `هدية عملية بلمسة مميزة بمناسبة ${occ}`,
  ],
  client: [
    (occ) => `هدية احترافية تعكس مستوى العلاقة`,
    (occ) => `خيار راقٍ يناسب ${occ} بطابع مهني`,
  ],
}

function buildWhyFit(product, profile) {
  const recipientType = profile.recipient.recipientType
  const occasionLabel = formatOccasionLabel(profile.occasion.occasionType)
  const templates = whyFitTemplates[recipientType] || whyFitTemplates.friend
  const idx = product.id.charCodeAt(product.id.length - 1) % templates.length
  return templates[idx](occasionLabel)
}

function buildExplanation(product, profile) {
  return {
    whyFit: buildWhyFit(product, profile),
    shortDescription: product.shortDescription,
  }
}

function pickRecommendationSet(scoredProducts, profile) {
  const bestFit = scoredProducts[0] || null

  const safePick =
    scoredProducts.find(
      (item) =>
        item.practicalityScore >= 0.75 ||
        item.scoring?.practicalWowBalance >= 0.7
    ) || scoredProducts[1] || null

  const surpriseAllowed = profile.taste.discoveryMode !== "safe_only"

  const smartSurprise = surpriseAllowed
    ? scoredProducts.find(
        (item) =>
          item.uniquenessScore >= 0.75 &&
          item.scoring.finalScore >= 0.65 &&
          item.id !== bestFit?.id
      ) || scoredProducts[2] || null
    : null

  return {
    bestFit,
    safePick,
    smartSurprise,
  }
}

function resolveNextAction(profile) {
  if (profile.control.controlMode === "manual") return "review_options"
  if (profile.control.controlMode === "delegated") return "handoff_to_atheer"
  return "confirm_direction"
}

function buildPickObject(product, typeLabel, profile) {
  if (!product) return null
  return {
    id: product.id,
    title: resolveDisplayTitle(product),
    subtitle: resolveDisplaySubtitle(product),
    label: typeLabel,
    priceRange: formatPriceRange(
      product.priceMin,
      product.priceMax,
      product.currency
    ),
    sourceName: product.sourceName,
    ...buildExplanation(product, profile),
  }
}

export function buildRecommendationResult(scoredProducts, giftIntentProfile) {
  const recommendationSet = pickRecommendationSet(scoredProducts, giftIntentProfile)
  const reveal = resolveRevealDirection(giftIntentProfile)
  const execution = resolveExecutionMode(giftIntentProfile)
  const summaryAngle = resolveSummaryAngle(giftIntentProfile)

  const topPick = buildPickObject(
    recommendationSet.bestFit,
    recommendationTypeLabelsClean.best_fit,
    giftIntentProfile
  )

  const alternatives = [
    recommendationSet.safePick && recommendationSet.safePick.id !== topPick?.id
      ? buildPickObject(
          recommendationSet.safePick,
          recommendationTypeLabelsClean.safe_pick,
          giftIntentProfile
        )
      : null,
    recommendationSet.smartSurprise &&
    recommendationSet.smartSurprise.id !== topPick?.id &&
    recommendationSet.smartSurprise.id !== recommendationSet.safePick?.id
      ? buildPickObject(
          recommendationSet.smartSurprise,
          recommendationTypeLabelsClean.smart_surprise,
          giftIntentProfile
        )
      : null,
  ].filter(Boolean)

  return {
    summaryAngle,
    revealRecommendation: {
      style: reveal.style,
      tone: reveal.tone,
      pageDirection: reveal.pageDirection,
    },
    executionMode: execution,
    nextAction: resolveNextAction(giftIntentProfile),
    confidenceScore: scoredProducts[0]?.scoring?.finalScore || 0,
    topPick,
    alternatives,
  }
}
