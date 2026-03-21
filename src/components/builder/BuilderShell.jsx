import { useEffect, useMemo, useState } from "react"
import { builderContent, builderValueLabels } from "../../data/builderContent"
import BuilderProgress from "./BuilderProgress"
import BuilderChoiceGrid from "./BuilderChoiceGrid"
import BuilderSummary from "./BuilderSummary"
import BuilderActions from "./BuilderActions"
import BuilderRecommendationPreview from "./BuilderRecommendationPreview"
import DirectDeliveryForm from "./DirectDeliveryForm"
import DirectDeliveryReview from "./DirectDeliveryReview"
import DirectDeliveryConfirmation from "./DirectDeliveryConfirmation"
import RecipientContactForm from "./RecipientContactForm"
import RecipientReview from "./RecipientReview"
import RecipientLinkReady from "./RecipientLinkReady"
import { runRecommendationEngine } from "../../lib/recommendation"
import { buildGiftLink, createGiftSession, getGiftPathMeta, persistGiftSession } from "../../lib/giftSession"

const initialSelections = {
  recipient: "",
  occasion: "",
  budget: "",
  interest: "",
  revealStyle: "",
  giftPath: "",
  deliveryMode: "",
}

function resolveControlMode(giftPath) {
  if (giftPath === "exactGift") return "self"
  if (giftPath === "recipientChoice") return "copilot"
  return "copilot"
}

export default function BuilderShell() {
  const { intro, steps, labels, completion } = builderContent

  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [selections, setSelections] = useState(initialSelections)
  const [engineResult, setEngineResult] = useState(null)
  const [directDeliveryStep, setDirectDeliveryStep] = useState(null)
  const [shippingData, setShippingData] = useState(null)
  const [recipientChoiceStep, setRecipientChoiceStep] = useState(null)
  const [recipientData, setRecipientData] = useState(null)
  const [giftLink, setGiftLink] = useState(null)

  const resolvedSteps = useMemo(() => {
    return steps.map((step) => {
      if (step.field !== "deliveryMode") {
        return step
      }

      if (selections.giftPath === "recipientChoice") {
        return {
          ...step,
          title: "كيف ستصل تجربة الاختيار؟",
          description:
            "بما أنك اخترت أن يدع المستلم يختار هديته، فسيتم إرسال رابط خاص له ليرى الخيارات ويكمل التفاصيل بنفسه.",
          options: [
            {
              value: "recipientChoice",
              label: "أرسل رابطًا ليختار هديته",
              description: "نرسل له صفحة خاصة يراجع فيها الخيارات ويضيف عنوانه بنفسه",
            },
          ],
        }
      }

      return {
        ...step,
        title: "كيف تريد إرسال الهدية المحددة؟",
        description:
          "بعد أن اخترت هدية محددة، قرر هل تريد إدخال عنوان المستلم الآن أو إرسال رابط تجربة الهدية أولًا.",
        options: [
          {
            value: "directDelivery",
            label: "أدخل عنوان المستلم الآن",
            description: "أكمل العنوان الآن لنبدأ تجهيز الهدية مباشرة",
          },
          {
            value: "recipientChoice",
            label: "أرسل رابط تجربة الهدية أولًا",
            description: "نرسل له صفحة خاصة يشاهد منها الهدية ويكمل التفاصيل بنفسه",
          },
        ],
      }
    })
  }, [steps, selections.giftPath])

  const totalSteps = resolvedSteps.length
  const isComplete = resolvedSteps.every((step) => Boolean(selections[step.field]))
  const showCompletionState = currentStepIndex >= totalSteps && isComplete

  const safeStepIndex = Math.min(currentStepIndex, totalSteps - 1)
  const currentStep = resolvedSteps[safeStepIndex]
  const giftPathMeta = getGiftPathMeta(selections.giftPath)

  const currentStepNumber = showCompletionState ? totalSteps : safeStepIndex + 1
  const currentValue = currentStep ? selections[currentStep.field] : ""
  const isLastStep = safeStepIndex === totalSteps - 1

  const selectedCount = useMemo(() => {
    return Object.values(selections).filter(Boolean).length
  }, [selections])

  useEffect(() => {
    if (
      currentStep?.field === "deliveryMode" &&
      selections.giftPath === "recipientChoice" &&
      selections.deliveryMode !== "recipientChoice"
    ) {
      setSelections((prev) => ({
        ...prev,
        deliveryMode: "recipientChoice",
      }))
    }
  }, [currentStep, selections.giftPath, selections.deliveryMode])

  function handleSelect(value) {
    if (!currentStep) return

    setSelections((prev) => {
      if (currentStep.field === "giftPath") {
        return {
          ...prev,
          giftPath: value,
          deliveryMode: "",
        }
      }

      return {
        ...prev,
        [currentStep.field]: value,
      }
    })
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

    const result = runRecommendationEngine({
      ...selections,
      controlMode: resolveControlMode(selections.giftPath),
    })
    setEngineResult(result)
    setCurrentStepIndex(totalSteps)
  }

  function handleReset() {
    setSelections(initialSelections)
    setEngineResult(null)
    setCurrentStepIndex(0)
    setDirectDeliveryStep(null)
    setShippingData(null)
    setRecipientChoiceStep(null)
    setRecipientData(null)
    setGiftLink(null)
  }

  function handlePrimaryCtaClick() {
    if (selections.deliveryMode === "directDelivery") {
      setDirectDeliveryStep("form")
    } else if (selections.deliveryMode === "recipientChoice") {
      setRecipientChoiceStep("contact")
    }
  }

  function handleRecipientContactSubmit(data) {
    setRecipientData(data)
    setRecipientChoiceStep("review")
  }

  function handleGenerateLink() {
    if (!recommendation || !recipientData) return

    const code = Math.random().toString(36).slice(2, 9).toUpperCase()

    const session = createGiftSession({
      code,
      selections: {
        ...selections,
        recipientLabel: builderValueLabels.recipient[selections.recipient] ?? "",
        occasionLabel: builderValueLabels.occasion[selections.occasion] ?? "",
        budgetLabel: builderValueLabels.budget[selections.budget] ?? "",
        interestLabel: builderValueLabels.interest[selections.interest] ?? "",
        revealStyleLabel: builderValueLabels.revealStyle[selections.revealStyle] ?? "",
      },
      recipientData,
      recommendation,
    })

    persistGiftSession(session)

    setGiftLink(
      buildGiftLink("https://ai-guru11.github.io/Atheer-v2/", session),
    )
    setRecipientChoiceStep("link")
  }

  function handleDeliveryFormSubmit(data) {
    setShippingData(data)
    setDirectDeliveryStep("review")
  }

  function handleApproveOrder() {
    setDirectDeliveryStep("confirmed")
  }

  const recommendation = engineResult?.recommendation || null

  const primaryCtaLabel = (() => {
    if (selections.deliveryMode === "directDelivery") {
      return "أكمل بيانات التوصيل الآن"
    }

    if (selections.deliveryMode === "recipientChoice" && selections.giftPath === "exactGift") {
      return "أنشئ رابط كشف الهدية"
    }

    if (selections.deliveryMode === "recipientChoice" && selections.giftPath === "recipientChoice") {
      return "أنشئ رابط اختيار الهدية"
    }

    return completion.primaryCta
  })()

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
            <div className="charcoal-card rounded-[32px] p-5 sm:p-7 lg:p-8">
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
                      currentStep.field === "giftPath" ||
                      currentStep.field === "deliveryMode"
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
                <div>
                  {directDeliveryStep === null && recipientChoiceStep === null && (
                    <div className="text-right">
                      <div className="mb-6">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-3 py-1.5 text-[12px] font-semibold text-emerald-300">
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          {completion.badge}
                        </span>

                        <h2 className="mt-3 text-xl font-bold leading-tight text-white sm:text-2xl">
                          {completion.title}
                        </h2>
                      </div>

                      {selections.giftPath ? (
                        <div className="mb-6 rounded-[18px] border border-white/[0.08] bg-white/[0.02] p-4">
                          <div className="flex items-center justify-between gap-3">
                            <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-[11px] font-semibold text-white/75">
                              {giftPathMeta.label}
                            </span>
                            <p className="text-[10px] font-bold tracking-widest text-slate-500/70">
                              المسار الذي بنيته الآن
                            </p>
                          </div>
                          <p className="mt-3 text-[13px] leading-relaxed text-slate-300">
                            {giftPathMeta.senderNote}
                          </p>
                        </div>
                      ) : null}

                      <BuilderRecommendationPreview recommendation={recommendation} />

                      <div className="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
                        <button
                          type="button"
                          onClick={handleReset}
                          className="rounded-full border border-white/[0.08] bg-white/[0.02] px-5 py-2.5 text-[13px] font-semibold text-slate-400 transition-colors duration-200 hover:border-white/15 hover:text-slate-200"
                        >
                          {labels.reset}
                        </button>

                        <button
                          type="button"
                          onClick={handlePrimaryCtaClick}
                          className="rounded-full bg-[linear-gradient(90deg,#7c5cff,#22d3ee)] px-6 py-3 text-[15px] font-bold text-white shadow-[0_10px_30px_rgba(34,211,238,0.15)] transition-all duration-200 hover:shadow-[0_14px_40px_rgba(34,211,238,0.22)] active:scale-[0.98]"
                        >
                          {primaryCtaLabel}
                        </button>
                      </div>
                    </div>
                  )}

                  {directDeliveryStep === "form" && (
                    <DirectDeliveryForm
                      initialData={shippingData}
                      onSubmit={handleDeliveryFormSubmit}
                      onBack={() => setDirectDeliveryStep(null)}
                    />
                  )}

                  {directDeliveryStep === "review" && (
                    <DirectDeliveryReview
                      recommendation={recommendation}
                      shippingData={shippingData}
                      onApprove={handleApproveOrder}
                      onBack={() => setDirectDeliveryStep("form")}
                    />
                  )}

                  {directDeliveryStep === "confirmed" && (
                    <DirectDeliveryConfirmation onReset={handleReset} />
                  )}

                  {recipientChoiceStep === "contact" && (
                    <RecipientContactForm
                      initialData={recipientData}
                      onSubmit={handleRecipientContactSubmit}
                      onBack={() => setRecipientChoiceStep(null)}
                    />
                  )}

                  {recipientChoiceStep === "review" && (
                    <RecipientReview
                      recommendation={recommendation}
                      recipientData={recipientData}
                      giftPath={selections.giftPath}
                      onGenerateLink={handleGenerateLink}
                      onBack={() => setRecipientChoiceStep("contact")}
                    />
                  )}

                  {recipientChoiceStep === "link" && (
                    <RecipientLinkReady
                      giftLink={giftLink}
                      recipientData={recipientData}
                      giftPath={selections.giftPath}
                      onReset={handleReset}
                    />
                  )}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <BuilderSummary selections={selections} />

              <div className={`rounded-[22px] border px-4 py-3.5 transition-colors duration-300 ${
                showCompletionState
                  ? "border-emerald-400/15 bg-emerald-400/[0.02]"
                  : "border-white/10 bg-white/[0.03]"
              }`}>
                <div className="space-y-2 text-right">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] tabular-nums text-slate-500">
                      {selectedCount}/{totalSteps}
                    </span>
                    <h3 className="text-[13px] font-bold text-white">
                      {showCompletionState ? "اكتملت" : "التقدم"}
                    </h3>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        showCompletionState
                          ? "bg-emerald-400"
                          : "bg-[linear-gradient(90deg,#7c5cff,#22d3ee)]"
                      }`}
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
