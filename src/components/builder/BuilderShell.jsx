import { useEffect, useMemo, useRef, useState } from "react"
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
import { buildGiftLink, createDirectDeliverySession, createGiftSession, getGiftPathMeta, persistGiftSession } from "../../lib/giftSession"

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
  const [linkSessionCode, setLinkSessionCode] = useState(null)
  const [directOrderSessionCode, setDirectOrderSessionCode] = useState(null)

  const builderCardRef = useRef(null)
  const builderStepAnchorRef = useRef(null)

  // هندسة المسارات الذكية بناءً على اختيارات المستخدم
  const resolvedSteps = useMemo(() => {
    return steps.map((step) => {
      if (step.field !== "deliveryMode") return step

      if (selections.giftPath === "recipientChoice") {
        return {
          ...step,
          title: "كيف ستصل تجربة الاختيار؟",
          description: "بما أنك اخترت أن يدع المستلم يختار هديته، فسيتم إرسال رابط خاص له ليرى الخيارات ويكمل التفاصيل بنفسه.",
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
        description: "بعد أن اخترت هدية محددة، قرر هل تريد إدخال عنوان المستلم الآن أو إرسال رابط تجربة الهدية أولًا.",
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

  const optionLayout = useMemo(() => {
    if (!currentStep) return "grid"
    if (currentStep.field === "giftPath" || currentStep.field === "deliveryMode") return "stack"
    if (currentStep.field === "budget") return "compact"
    return "grid"
  }, [currentStep])

  useEffect(() => {
    const target = builderStepAnchorRef.current || builderCardRef.current
    if (!target) return

    const frame = window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [currentStepIndex, directDeliveryStep, recipientChoiceStep])

  // التزامن التلقائي للمسارات
  useEffect(() => {
    if (
      currentStep?.field === "deliveryMode" &&
      selections.giftPath === "recipientChoice" &&
      selections.deliveryMode !== "recipientChoice"
    ) {
      setSelections((prev) => ({ ...prev, deliveryMode: "recipientChoice" }))
    }
  }, [currentStep, selections.giftPath, selections.deliveryMode])

  function handleSelect(value) {
    if (!currentStep) return
    setSelections((prev) => {
      if (currentStep.field === "giftPath") {
        return { ...prev, giftPath: value, deliveryMode: "" }
      }
      return { ...prev, [currentStep.field]: value }
    })
  }

  function handlePrevious() {
    if (showCompletionState) {
      setCurrentStepIndex(totalSteps - 1)
      return
    }
    if (currentStepIndex > 0) setCurrentStepIndex((prev) => prev - 1)
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
    setLinkSessionCode(null)
    setDirectOrderSessionCode(null)
  }

  function handlePrimaryCtaClick() {
    if (selections.deliveryMode === "directDelivery") setDirectDeliveryStep("form")
    else if (selections.deliveryMode === "recipientChoice") setRecipientChoiceStep("contact")
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
    const nextGiftLink = buildGiftLink(session)
    persistGiftSession({ ...session, shareLink: nextGiftLink })
    setGiftLink(nextGiftLink)
    setLinkSessionCode(session.code)
    setRecipientChoiceStep("link")
  }

  function handleDeliveryFormSubmit(data) {
    setShippingData(data)
    setDirectDeliveryStep("review")
  }

  function handleApproveOrder() {
    if (!recommendation || !shippingData) return
    const code = Math.random().toString(36).slice(2, 9).toUpperCase()
    const session = createDirectDeliverySession({
      code,
      selections: {
        ...selections,
        recipientLabel: builderValueLabels.recipient[selections.recipient] ?? "",
        occasionLabel: builderValueLabels.occasion[selections.occasion] ?? "",
        budgetLabel: builderValueLabels.budget[selections.budget] ?? "",
        interestLabel: builderValueLabels.interest[selections.interest] ?? "",
        revealStyleLabel: builderValueLabels.revealStyle[selections.revealStyle] ?? "",
      },
      shippingData,
      recommendation,
    })
    persistGiftSession(session)
    setDirectOrderSessionCode(session.code)
    setDirectDeliveryStep("confirmed")
  }

  const recommendation = engineResult?.recommendation || null

  const primaryCtaLabel = (() => {
    if (selections.deliveryMode === "directDelivery") {
      return completion.ctaByDelivery?.directDelivery || completion.primaryCta
    }

    if (selections.deliveryMode === "recipientChoice") {
      if (selections.giftPath === "exactGift") {
        return completion.ctaByDelivery?.recipientChoice?.exactGift || completion.primaryCta
      }

      if (selections.giftPath === "recipientChoice") {
        return completion.ctaByDelivery?.recipientChoice?.recipientChoice || completion.primaryCta
      }
    }

    return completion.primaryCta
  })()

  return (
    <section className="section-shell min-h-screen">
      <div className="container-tight pt-8 pb-20">
        <div className="space-y-12">
          {/* Header Section */}
          <div className="reveal-block space-y-4 text-right">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-brand-2/80">
              {intro.eyebrow}
            </span>
            <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl tracking-tight">
              {intro.title}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-slate-400">
              {intro.description}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
            {/* Main Interactive Card */}
            <div 
              key={currentStepIndex} // يضمن إعادة تشغيل الحركة عند تغيير الخطوة
              ref={builderCardRef}
              className="reveal-block scroll-mt-24 charcoal-card rounded-[40px] p-6 sm:p-10 lg:p-12 border-white/[0.03] shadow-2xl"
            >
              {!showCompletionState ? (
                <div className="space-y-10">
                  <BuilderProgress
                    currentStep={currentStepNumber}
                    totalSteps={totalSteps}
                    currentTitle={currentStep.title}
                  />

                  <div ref={builderStepAnchorRef} className="space-y-4 text-right scroll-mt-24">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                      {currentStep.title}
                    </h2>
                    <p className="max-w-2xl text-base text-slate-400 leading-relaxed">
                      {currentStep.description}
                    </p>
                  </div>

                  <BuilderChoiceGrid
                    options={currentStep.options}
                    selectedValue={currentValue}
                    onSelect={handleSelect}
                    layout={optionLayout}
                  />

                  <div className="pt-6 border-t border-white/[0.05]">
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
                </div>
              ) : (
                <div className="reveal-block">
                  {directDeliveryStep === null && recipientChoiceStep === null && (
                    <div className="text-right space-y-8">
                      <div>
                        <span className="inline-flex items-center gap-2 rounded-full border border-brand-2/20 bg-brand-2/[0.05] px-4 py-1.5 text-xs font-bold text-brand-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-2 animate-pulse" />
                          {completion.badge}
                        </span>
                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">
                          {completion.title}
                        </h2>
                      </div>

                      {selections.giftPath && (
                        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 space-y-2">
                          <div className="flex items-center justify-between">
                             <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                              تم اختيار المسار
                            </span>
                            <span className="rounded-lg bg-brand/10 px-3 py-1 text-xs font-bold text-brand">
                              {giftPathMeta.label}
                            </span>
                          </div>
                          <p className="text-sm leading-relaxed text-slate-400">
                            {giftPathMeta.senderNote}
                          </p>
                        </div>
                      )}

                      <BuilderRecommendationPreview
                        recommendation={recommendation}
                        locked
                        budgetLabel={builderValueLabels.budget[selections.budget] ?? ""}
                        interestLabel={builderValueLabels.interest[selections.interest] ?? ""}
                        giftPathLabel={giftPathMeta.label}
                      />

                      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-end pt-4">
                        <button
                          type="button"
                          onClick={handleReset}
                          className="rounded-full border border-white/10 bg-white/[0.02] px-8 py-3 text-sm font-bold text-slate-400 transition-all hover:bg-white/[0.05] hover:text-white"
                        >
                          {labels.reset}
                        </button>
                        <button
                          type="button"
                          onClick={handlePrimaryCtaClick}
                          className="rounded-full bg-gradient-to-r from-brand to-brand-2 px-10 py-3 text-sm font-black text-white shadow-lg shadow-brand/20 transition-all hover:scale-[1.02] hover:shadow-brand/40 active:scale-[0.98]"
                        >
                          {primaryCtaLabel}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Flow Steps Rendering */}
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
                      giftPath={selections.giftPath}
                      onApprove={handleApproveOrder}
                      onBack={() => setDirectDeliveryStep("form")}
                    />
                  )}
                  {directDeliveryStep === "confirmed" && (
                    <DirectDeliveryConfirmation sessionCode={directOrderSessionCode} onReset={handleReset} />
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
                      sessionCode={linkSessionCode}
                      onReset={handleReset}
                    />
                  )}
                </div>
              )}
            </div>

            {/* Sidebar Summary Section */}
            <aside className="reveal-block space-y-6 lg:sticky lg:top-24">
              <BuilderSummary selections={selections} />

              <div className={`rounded-3xl border p-5 transition-all duration-500 shadow-xl ${
                showCompletionState
                  ? "border-emerald-500/20 bg-emerald-500/[0.03]"
                  : "border-white/5 bg-white/[0.02]"
              }`}>
                <div className="space-y-4 text-right">
                  <div className="flex items-center justify-between">
                    <span dir="ltr" className="text-[11px] font-bold tabular-nums text-slate-500 tracking-widest">
                      {selectedCount} / {totalSteps}
                    </span>
                    <h3 className="text-xs font-black uppercase tracking-wider text-white/90">
                      {showCompletionState ? "اكتمل البناء" : "التقدم الحالي"}
                    </h3>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/[0.05]">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ease-out ${
                        showCompletionState
                          ? "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.4)]"
                          : "bg-gradient-to-r from-brand to-brand-2"
                      }`}
                      style={{ width: `${(selectedCount / totalSteps) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}
