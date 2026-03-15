import { normalizeGiftIntentProfile } from "./normalizeGiftIntentProfile"
import { filterCandidates } from "./filterCandidates"
import { scoreCandidates } from "./scoreCandidates"
import { buildRecommendationResult } from "./buildRecommendationResult"
import { productCatalogSample } from "../../data/productCatalog.sample"

export function runRecommendationEngine(builderSelections) {
  const giftIntentProfile = normalizeGiftIntentProfile(builderSelections)

  const filterResult = filterCandidates(productCatalogSample, giftIntentProfile)
  const { candidates, filterTierUsed, candidateCount } = filterResult

  const scored = scoreCandidates(candidates, giftIntentProfile)
  const recommendation = buildRecommendationResult(scored, giftIntentProfile)

  return {
    inputProfile: giftIntentProfile,
    filterTierUsed,
    candidates,
    scored,
    recommendation: {
      ...recommendation,
      confidenceScore: recommendation.confidenceScore,
      topPick: recommendation.topPick,
      alternatives: recommendation.alternatives,
      summaryAngle: recommendation.summaryAngle,
      revealRecommendation: recommendation.revealRecommendation,
      executionMode: recommendation.executionMode,
      nextAction: recommendation.nextAction,
    },
  }
}
