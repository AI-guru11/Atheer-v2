import { builderContent, builderValueLabels } from "../../data/builderContent"

export default function BuilderSummary({ selections }) {
  const summaryFields = builderContent.summary.fields

  const resolvedItems = [
    {
      key: "recipient",
      label: summaryFields.recipient,
      value: selections.recipient
        ? builderValueLabels.recipient[selections.recipient]
        : null,
    },
    {
      key: "occasion",
      label: summaryFields.occasion,
      value: selections.occasion
        ? builderValueLabels.occasion[selections.occasion]
        : null,
    },
    {
      key: "budget",
      label: summaryFields.budget,
      value: selections.budget
        ? builderValueLabels.budget[selections.budget]
        : null,
    },
    {
      key: "interest",
      label: summaryFields.interest,
      value: selections.interest
        ? builderValueLabels.interest[selections.interest]
        : null,
    },
    {
      key: "revealStyle",
      label: summaryFields.revealStyle,
      value: selections.revealStyle
        ? builderValueLabels.revealStyle[selections.revealStyle]
        : null,
    },
    {
      key: "controlMode",
      label: summaryFields.controlMode,
      value: selections.controlMode
        ? builderValueLabels.controlMode[selections.controlMode]
        : null,
    },
  ]

  const filledItems = resolvedItems.filter((item) => item.value)
  const hasSelections = filledItems.length > 0

  if (!hasSelections) {
    return (
      <div className="rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-3">
        <p className="text-[12px] text-slate-400/80 text-right">
          {builderContent.summary.empty}
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-3">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] tabular-nums text-slate-500">
            {filledItems.length}/{resolvedItems.length}
          </span>
          <h3 className="text-[12px] font-bold text-white">
            {builderContent.summary.title}
          </h3>
        </div>

        <div className="flex flex-wrap justify-end gap-1">
          {filledItems.map((item) => (
            <span
              key={item.key}
              className="inline-flex items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[10px]"
            >
              <span className="font-semibold text-white/90">{item.value}</span>
              <span className="text-slate-500/70">{item.label}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
