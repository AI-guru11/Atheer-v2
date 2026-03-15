import { useMemo, useState } from "react"
import { builderContent } from "../../data/builderContent"
import BuilderProgress from "./BuilderProgress"
import BuilderChoiceGrid from "./BuilderChoiceGrid"
import BuilderSummary from "./BuilderSummary"
import BuilderActions from "./BuilderActions"
import BuilderRecommendationPreview from "./BuilderRecommendationPreview"
import { runRecommendationEngine } from "../../lib/recommendation"

const initialSelections = {
  recipient: "",
  occasion: "",
  budget: "",
  interest: "",
  revealStyle: "",
  controlMode: "",
}

export default function BuilderShell() {
  const { intro, steps, labels, completion } = builderContent

  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [selections, setSelections] = useState(initialSelections)
  const [engineResult, setEngineResult] = useState(null)

  const totalSteps = steps.length
  const isComplete = steps.every((step) => Boolean(selections[step.field]))
  const showCompletionState = currentStepIndex >= totalSteps && isComplete

  const safeStepIndex = Math.min(currentStepIndex, totalSteps - 1)
  const currentStep = steps[safeStepIndex]

  const currentStepNumber = showCompletionState ? totalSteps : safeStepIndex + 1
  const currentValue = currentStep ? selections[currentStep.field] : ""
  const isLastStep = safeStepIndex === totalSteps - 1

  const selectedCount = useMemo(() => {
    return Object.values(selections).filter(Boolean).length
  }, [selections])

  function handleSelect(value) {
    if (!currentStep) return

    setSelections((prev) => ({
      ...prev,
      [currentStep.field]: value,
    }))
  }

  function handlePrevious() {
    if (showCompletionState) {
      setCurrentStepIndex(totalSteps - 1)
      return
    }

    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1)
    }
  }

  function handleNext() {
    if (!currentStep || !currentValue) return

    if (!isLastStep) {
      setCurrentStepIndex((prev) => prev + 1)
      return
    }

    const result = runRecommendationEngine(selections)
    setEngineResult(result)
    setCurrentStepIndex(totalSteps)
  }

  function handleReset() {
    setSelections(initialSelections)
    setEngineResult(null)
    setCurrentStepIndex(0)
  }

  const recommendation = engineResult?.recommendation || null

  return (
    <section className="section-shell">
      <div className="container-tight">
        <div className="space-y-8">
          <div className="space-y-4 text-right">
            <span className="text-xs font-semibold tracking-[0.14em] text-cyan-300/70">
              {intro.eyebrow}
            </span>

            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {intro.title}
            </h1>

            <p className="max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {intro.description}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
            <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-5 sm:p-7 lg:p-8">
              {!showCompletionState ? (
                <div className="space-y-7">
                  <BuilderProgress
                    currentStep={currentStepNumber}
                    totalSteps={totalSteps}
                    currentTitle={currentStep.title}
                  />

                  <div className="space-y-3 text-right">
                    <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
                      {currentStep.title}
                    </h2>

                    <p className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                      {currentStep.description}
                    </p>
                  </div>

                  <BuilderChoiceGrid
                    options={currentStep.options}
                    selectedValue={currentValue}
                    onSelect={handleSelect}
                    compact={
                      currentStep.field === "budget" ||
                      currentStep.field === "controlMode"
                    }
                  />

                  <BuilderActions
                    canGoBack={currentStepIndex > 0}
                    canGoNext={Boolean(currentValue)}
                    isLastStep={isLastStep}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    onReset={handleReset}
                    labels={labels}
                  />
                </div>
              ) : (
                <div className="space-y-6 text-right">
                  <span className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-300">
                    {completion.badge}
                  </span>

                  <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
                    {completion.title}
                  </h2>

                  <p className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                    {completion.description}
                  </p>

                  <BuilderRecommendationPreview recommendation={recommendation} />

                  <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      className="rounded-full bg-[linear-gradient(90deg,#7c5cff,#22d3ee)] px-6 py-3 text-base font-bold text-white shadow-[0_12px_35px_rgba(34,211,238,0.18)]"
                    >
                      {completion.primaryCta}
                    </button>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-base font-semibold text-white"
                    >
                      {labels.reset}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <BuilderSummary selections={selections} />

              <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                <div className="space-y-3 text-right">
                  <h3 className="text-lg font-bold text-white sm:text-xl">
                    تقدمك الحالي
                  </h3>

                  <p className="text-sm leading-relaxed text-slate-400 sm:text-base">
                    أكملت {selectedCount} من أصل {totalSteps} خطوات في هذه
                    المرحلة.
                  </p>

                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,#7c5cff,#22d3ee)] transition-all duration-300"
                      style={{
                        width: `${(selectedCount / totalSteps) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}