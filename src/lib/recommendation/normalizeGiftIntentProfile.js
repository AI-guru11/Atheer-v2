import { builderValueToSchemaMap } from "../../data/recommendationSchema"

function resolveRecipientMeta(recipientType) {
  const defaults = {
    genderHint: "unknown",
    ageBand: "adult",
    relationshipDepth: "warm",
    formalityLevel: "personal",
  }

  const map = {
    mother: {
      genderHint: "female",
      ageBand: "adult",
      relationshipDepth: "close",
      formalityLevel: "personal",
    },
    father: {
      genderHint: "male",
      ageBand: "adult",
      relationshipDepth: "close",
      formalityLevel: "personal",
    },
    friend: {
      genderHint: "unknown",
      ageBand: "adult",
      relationshipDepth: "close",
      formalityLevel: "personal",
    },
    partner: {
      genderHint: "unknown",
      ageBand: "adult",
      relationshipDepth: "very_close",
      formalityLevel: "personal",
    },
    child: {
      genderHint: "unknown",
      ageBand: "child",
      relationshipDepth: "close",
      formalityLevel: "personal",
    },
    manager: {
      genderHint: "unknown",
      ageBand: "adult",
      relationshipDepth: "formal",
      formalityLevel: "formal",
    },
  }

  return map[recipientType] || defaults
}

function resolveOccasionMeta(occasionType) {
  const defaults = {
    importanceLevel: "medium",
    emotionalTone: "warm",
    surpriseFactor: "medium",
  }

  const map = {
    birthday: {
      importanceLevel: "high",
      emotionalTone: "celebratory",
      surpriseFactor: "medium",
    },
    appreciation: {
      importanceLevel: "medium",
      emotionalTone: "grateful",
      surpriseFactor: "low",
    },
    anniversary: {
      importanceLevel: "very_high",
      emotionalTone: "romantic",
      surpriseFactor: "medium",
    },
    promotion: {
      importanceLevel: "medium",
      emotionalTone: "supportive",
      surpriseFactor: "low",
    },
    surprise: {
      importanceLevel: "medium",
      emotionalTone: "playful",
      surpriseFactor: "high",
    },
    corporate_gifting: {
      importanceLevel: "high",
      emotionalTone: "formal",
      surpriseFactor: "low",
    },
  }

  return map[occasionType] || defaults
}

function resolveBudgetMeta(budgetBand) {
  return {
    budgetBand,
    currency: "SAR",
    strictness: budgetBand === "under_250" ? "strict" : "medium",
  }
}

function resolveTasteMeta(interestCategory) {
  if (interestCategory === "open_to_suggestions") {
    return {
      interestCategory,
      styleDirection: "modern",
      discoveryMode: "balanced",
    }
  }

  const map = {
    perfumes: { styleDirection: "elegant", discoveryMode: "balanced" },
    coffee: { styleDirection: "modern", discoveryMode: "balanced" },
    books: { styleDirection: "minimal", discoveryMode: "safe_only" },
    electronics: { styleDirection: "modern", discoveryMode: "safe_only" },
    sports: { styleDirection: "practical", discoveryMode: "balanced" },
    self_care: { styleDirection: "emotional", discoveryMode: "balanced" },
    gaming: { styleDirection: "bold", discoveryMode: "surprising" },
  }

  return {
    interestCategory,
    ...(map[interestCategory] || {
      styleDirection: "modern",
      discoveryMode: "balanced",
    }),
  }
}

function resolveRevealMeta(revealStyle) {
  const map = {
    simple_elegant: {
      revealStyle,
      deliveryPacing: "instant",
      messageWeight: "medium",
    },
    emotional_personal: {
      revealStyle,
      deliveryPacing: "guided",
      messageWeight: "high",
    },
    luxury_premium: {
      revealStyle,
      deliveryPacing: "guided",
      messageWeight: "medium",
    },
    playful_interactive: {
      revealStyle,
      deliveryPacing: "staged",
      messageWeight: "medium",
    },
    formal_polished: {
      revealStyle,
      deliveryPacing: "instant",
      messageWeight: "low",
    },
    surprise_heavy: {
      revealStyle,
      deliveryPacing: "staged",
      messageWeight: "medium",
    },
  }

  return (
    map[revealStyle] || {
      revealStyle: "simple_elegant",
      deliveryPacing: "instant",
      messageWeight: "medium",
    }
  )
}

function resolveControlMeta(controlMode) {
  return {
    controlMode,
    reviewBeforeFinalizing: controlMode !== "delegated",
  }
}

export function normalizeGiftIntentProfile(builderSelections) {
  const recipientType =
    builderValueToSchemaMap.recipient[builderSelections.recipient] || "other"
  const occasionType =
    builderValueToSchemaMap.occasion[builderSelections.occasion] || "custom"
  const budgetBand =
    builderValueToSchemaMap.budget[builderSelections.budget] || "250_500"
  const interestCategory =
    builderValueToSchemaMap.interest[builderSelections.interest] ||
    "open_to_suggestions"
  const revealStyle =
    builderValueToSchemaMap.revealStyle[builderSelections.revealStyle] ||
    "simple_elegant"
  const controlMode =
    builderValueToSchemaMap.controlMode[builderSelections.controlMode] ||
    "assisted"

  return {
    recipient: {
      recipientType,
      ...resolveRecipientMeta(recipientType),
    },
    occasion: {
      occasionType,
      ...resolveOccasionMeta(occasionType),
    },
    budget: resolveBudgetMeta(budgetBand),
    taste: resolveTasteMeta(interestCategory),
    reveal: resolveRevealMeta(revealStyle),
    control: resolveControlMeta(controlMode),
    constraints: {
      avoidCategories: [],
      preferredMerchants: [],
      deliveryRegion: "Saudi Arabia",
      deliverySpeed: "normal",
      mustBeSurprising: revealStyle === "surprise_heavy",
      mustBePractical: controlMode === "delegated" && occasionType === "corporate_gifting",
    },
  }
}