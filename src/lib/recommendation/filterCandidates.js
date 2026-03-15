import { budgetBandRanges } from "../../data/recommendationSchema"

function overlapsBudget(product, budgetBand) {
  const range = budgetBandRanges[budgetBand]
  if (!range) return true

  const productMin = product.priceMin ?? 0
  const productMax = product.priceMax ?? productMin

  return productMin <= range.max && productMax >= range.min
}

function nearBudget(product, budgetBand) {
  const range = budgetBandRanges[budgetBand]
  if (!range) return true

  const productMin = product.priceMin ?? 0
  const productMax = product.priceMax ?? productMin
  const margin = (range.max - range.min) * 0.25 || 75

  return productMin <= (range.max + margin) && productMax >= (range.min - margin)
}

function matchesRecipient(product, recipientType) {
  return Array.isArray(product.recipientFit)
    ? product.recipientFit.includes(recipientType)
    : false
}

function matchesOccasion(product, occasionType) {
  return Array.isArray(product.occasionFit)
    ? product.occasionFit.includes(occasionType)
    : false
}

function matchesInterest(product, interestCategory) {
  if (interestCategory === "open_to_suggestions") return true
  if (Array.isArray(product.interestFit)) {
    return product.interestFit.includes(interestCategory)
  }
  return product.category === interestCategory ||
    (Array.isArray(product.tasteTags) && product.tasteTags.includes(interestCategory))
}

function passesAvailability(product) {
  return product.availabilityStatus === "available"
}

function passesConstraints(product, constraints) {
  const avoidCategories = constraints?.avoidCategories || []
  if (avoidCategories.includes(product.category)) return false
  return true
}

function buildMeta(product, profile, tier) {
  const { recipient, occasion, budget, taste, constraints } = profile
  return {
    passesBudget: overlapsBudget(product, budget.budgetBand),
    nearBudget: nearBudget(product, budget.budgetBand),
    passesRecipientFit: matchesRecipient(product, recipient.recipientType),
    passesOccasionFit: matchesOccasion(product, occasion.occasionType),
    passesInterestFit: matchesInterest(product, taste.interestCategory),
    passesAvailability: passesAvailability(product),
    passesConstraints: passesConstraints(product, constraints),
    filterTier: tier,
  }
}

function tierOneStrict(products, profile) {
  const { recipient, occasion, budget, taste, constraints } = profile

  return products.filter((product) => {
    if (!passesAvailability(product)) return false
    if (!passesConstraints(product, constraints)) return false
    if (!overlapsBudget(product, budget.budgetBand)) return false
    if (!matchesRecipient(product, recipient.recipientType)) return false
    if (!matchesOccasion(product, occasion.occasionType)) return false
    if (!matchesInterest(product, taste.interestCategory)) return false
    return true
  })
}

function tierTwoBalanced(products, profile) {
  const { recipient, occasion, budget, taste, constraints } = profile

  return products.filter((product) => {
    if (!passesAvailability(product)) return false
    if (!passesConstraints(product, constraints)) return false
    if (!overlapsBudget(product, budget.budgetBand)) return false

    const recipientMatch = matchesRecipient(product, recipient.recipientType)
    const occasionMatch = matchesOccasion(product, occasion.occasionType)
    const interestMatch = matchesInterest(product, taste.interestCategory)

    // Allow one dimension to relax: need at least 2 of 3
    const matchCount = [recipientMatch, occasionMatch, interestMatch].filter(Boolean).length
    return matchCount >= 2
  })
}

function tierThreeIntelligent(products, profile) {
  const { recipient, occasion, budget, taste, constraints } = profile

  return products.filter((product) => {
    if (!passesAvailability(product)) return false
    if (!passesConstraints(product, constraints)) return false

    // Budget: accept near-budget items too
    if (!nearBudget(product, budget.budgetBand)) return false

    const recipientMatch = matchesRecipient(product, recipient.recipientType)
    const occasionMatch = matchesOccasion(product, occasion.occasionType)
    const interestMatch = matchesInterest(product, taste.interestCategory)

    // Need at least 1 of 3 dimensions to match
    const matchCount = [recipientMatch, occasionMatch, interestMatch].filter(Boolean).length
    return matchCount >= 1
  })
}

export function filterCandidates(products, giftIntentProfile) {
  // Tier 1: strict — all dimensions must match
  const strictResults = tierOneStrict(products, giftIntentProfile)
  if (strictResults.length >= 3) {
    const candidates = strictResults.map((p) => ({
      ...p,
      candidateMeta: buildMeta(p, giftIntentProfile, "strict"),
    }))
    return {
      candidates,
      filterTierUsed: "strict",
      candidateCount: candidates.length,
    }
  }

  // Tier 2: balanced — budget required, 2 of 3 soft dimensions
  const balancedResults = tierTwoBalanced(products, giftIntentProfile)
  if (balancedResults.length >= 2) {
    const candidates = balancedResults.map((p) => ({
      ...p,
      candidateMeta: buildMeta(p, giftIntentProfile, "balanced"),
    }))
    return {
      candidates,
      filterTierUsed: "balanced",
      candidateCount: candidates.length,
    }
  }

  // Tier 3: intelligent — near-budget, at least 1 dimension
  const intelligentResults = tierThreeIntelligent(products, giftIntentProfile)
  const candidates = intelligentResults.map((p) => ({
    ...p,
    candidateMeta: buildMeta(p, giftIntentProfile, "intelligent"),
  }))
  return {
    candidates,
    filterTierUsed: "intelligent",
    candidateCount: candidates.length,
  }
}
