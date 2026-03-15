import { budgetBandRanges } from "../../data/recommendationSchema"

const weights = {
  recipientFit: 0.18,
  occasionFit: 0.15,
  interestFit: 0.15,
  budgetCloseness: 0.16,
  toneFit: 0.08,
  controlModeFit: 0.05,
  revealFit: 0.07,
  premiumRelevance: 0.06,
  merchantConfidence: 0.05,
  giftability: 0.05,
}

function clamp(value) {
  return Math.max(0, Math.min(1, value))
}

function scoreRecipientFit(product, profile) {
  if (!Array.isArray(product.recipientFit)) return 0
  if (product.recipientFit.includes(profile.recipient.recipientType)) return 1
  // Partial credit for related recipients
  const related = {
    mother: ["family_member"],
    father: ["family_member"],
    partner: ["friend"],
    friend: ["colleague"],
    manager: ["colleague", "client"],
    child: [],
    colleague: ["friend", "manager"],
  }
  const relatives = related[profile.recipient.recipientType] || []
  for (const rel of relatives) {
    if (product.recipientFit.includes(rel)) return 0.4
  }
  return 0
}

function scoreOccasionFit(product, profile) {
  if (!Array.isArray(product.occasionFit)) return 0
  if (product.occasionFit.includes(profile.occasion.occasionType)) return 1
  // Partial credit for related occasions
  const related = {
    birthday: ["surprise"],
    surprise: ["birthday"],
    appreciation: ["corporate_gifting", "promotion"],
    promotion: ["appreciation", "corporate_gifting"],
    corporate_gifting: ["appreciation", "promotion"],
  }
  const relatives = related[profile.occasion.occasionType] || []
  for (const rel of relatives) {
    if (product.occasionFit.includes(rel)) return 0.45
  }
  return 0
}

function scoreInterestFit(product, profile) {
  const interest = profile.taste.interestCategory
  if (interest === "open_to_suggestions") return 0.7

  // Direct match via interestFit array
  if (Array.isArray(product.interestFit) && product.interestFit.includes(interest)) return 1

  // Category match
  if (product.category === interest) return 0.95

  // Tag match
  if (Array.isArray(product.tasteTags) && product.tasteTags.includes(interest)) return 0.75

  return 0.15
}

function scoreBudgetCloseness(product, profile) {
  const band = profile.budget.budgetBand
  const range = budgetBandRanges[band]
  if (!range) return 0.5

  const productMid = (product.priceMin + product.priceMax) / 2
  const rangeMid = range.max === Infinity ? range.min + 500 : (range.min + range.max) / 2
  const rangeSpan = range.max === Infinity ? 1000 : range.max - range.min

  // Perfect fit: product midpoint within range
  if (productMid >= range.min && productMid <= (range.max === Infinity ? range.min + 2000 : range.max)) {
    // Score higher the closer to the center of the range
    const distance = Math.abs(productMid - rangeMid)
    return clamp(1 - (distance / (rangeSpan * 1.5)))
  }

  // Near miss: slightly outside range
  const overshoot = productMid > rangeMid
    ? productMid - (range.max === Infinity ? range.min + 2000 : range.max)
    : range.min - productMid
  const penalty = overshoot / (rangeSpan || 250)
  return clamp(0.5 - penalty)
}

function scoreToneFit(product, profile) {
  if (!Array.isArray(product.toneFit)) return 0.5
  const reveal = profile.reveal
  // Map reveal styles to tones
  const styleToneMap = {
    simple_elegant: "warm_refined",
    emotional_personal: "warm_refined",
    luxury_premium: "formal_premium",
    playful_interactive: "playful_modern",
    formal_polished: "formal_premium",
    surprise_heavy: "celebratory",
  }
  const expectedTone = styleToneMap[reveal.revealStyle]
  if (expectedTone && product.toneFit.includes(expectedTone)) return 1
  // Any tone match is partial credit
  if (product.toneFit.length > 0) return 0.5
  return 0.3
}

function scoreControlModeFit(product, profile) {
  if (!Array.isArray(product.controlModeFit)) return 0.5
  return product.controlModeFit.includes(profile.control.controlMode) ? 1 : 0.4
}

function scoreRevealFit(product, profile) {
  if (!Array.isArray(product.revealFit)) return 0.5
  return product.revealFit.includes(profile.reveal.revealStyle) ? 1 : 0.4
}

function scorePremiumRelevance(product, profile) {
  const isFormal =
    profile.recipient.formalityLevel === "formal" ||
    profile.occasion.occasionType === "corporate_gifting"

  const premium = product.premiumScore ?? 0.5
  const wow = product.wowFactor ?? 0.5
  const giftability = product.giftabilityScore ?? 0.5

  if (isFormal) {
    return clamp(premium * 0.5 + giftability * 0.35 + wow * 0.15)
  }

  if (profile.taste.discoveryMode === "surprising") {
    return clamp(wow * 0.5 + premium * 0.25 + giftability * 0.25)
  }

  return clamp(premium * 0.35 + giftability * 0.35 + wow * 0.3)
}

function scoreMerchantConfidence(product) {
  return clamp(product.merchantConfidence ?? 0.5)
}

function scoreGiftability(product) {
  return clamp(product.giftabilityScore ?? 0.5)
}

function buildReasons(scores, product, profile) {
  const reasons = []
  const matched = []

  if (scores.recipientFit >= 0.8) {
    reasons.push(`يناسب ${profile.recipient.recipientType}`)
    matched.push("recipient")
  }
  if (scores.occasionFit >= 0.8) {
    reasons.push(`مناسب لمناسبة ${profile.occasion.occasionType}`)
    matched.push("occasion")
  }
  if (scores.interestFit >= 0.8) {
    reasons.push(`يتوافق مع اهتمام ${profile.taste.interestCategory}`)
    matched.push("interest")
  }
  if (scores.budgetCloseness >= 0.7) {
    reasons.push("ضمن نطاق الميزانية")
    matched.push("budget")
  }
  if (scores.toneFit >= 0.8) {
    matched.push("tone")
  }
  if (scores.controlModeFit >= 0.8) {
    matched.push("controlMode")
  }
  if (scores.revealFit >= 0.8) {
    matched.push("reveal")
  }
  if (scores.premiumRelevance >= 0.75) {
    matched.push("premium")
  }

  return { reasons, matchedSignals: matched }
}

export function scoreCandidates(candidates, giftIntentProfile) {
  return candidates
    .map((product) => {
      const scores = {
        recipientFit: scoreRecipientFit(product, giftIntentProfile),
        occasionFit: scoreOccasionFit(product, giftIntentProfile),
        interestFit: scoreInterestFit(product, giftIntentProfile),
        budgetCloseness: scoreBudgetCloseness(product, giftIntentProfile),
        toneFit: scoreToneFit(product, giftIntentProfile),
        controlModeFit: scoreControlModeFit(product, giftIntentProfile),
        revealFit: scoreRevealFit(product, giftIntentProfile),
        premiumRelevance: scorePremiumRelevance(product, giftIntentProfile),
        merchantConfidence: scoreMerchantConfidence(product),
        giftability: scoreGiftability(product),
      }

      let finalScore = 0
      for (const key of Object.keys(weights)) {
        finalScore += (scores[key] ?? 0) * weights[key]
      }

      const { reasons, matchedSignals } = buildReasons(scores, product, giftIntentProfile)

      return {
        item: product,
        score: Number(finalScore.toFixed(4)),
        scores,
        reasons,
        matchedSignals,
        // Preserve backward-compatible flat shape for buildRecommendationResult
        ...product,
        scoring: {
          ...scores,
          finalScore: Number(finalScore.toFixed(4)),
        },
      }
    })
    .sort((a, b) => b.score - a.score)
}
