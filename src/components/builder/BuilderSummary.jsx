import { useState } from "react"
import { builderContent, builderValueLabels } from "../../data/builderContent"

export default function BuilderSummary({ selections }) {
  const [expanded, setExpanded] = useState(false)
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
      <div className="rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-3.5">
        <p className="text-[13px] text-slate-400 text-right">
          {builderContent.summary.empty}
        </p>
      </div>
    )
  }

  const previewItems = filledItems.slice(0, 3)
  const remainingItems = filledItems.slice(3)
  const hasMore = remainingItems.length > 0

  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-3.5">
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            {filledItems.length} من {resolvedItems.length}
          </span>
          <h3 className="text-[13px] font-bold text-white">
            {builderContent.summary.title}
          </h3>
        </div>

        <div className="flex flex-wrap justify-end gap-1.5">
          {previewItems.map((item) => (
            <span
              key={item.key}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.04] px-2.5 py-1 text-[11px]"
            >
              <span className="font-semibold text-white">{item.value}</span>
              <span className="text-slate-500">{item.label}</span>
            </span>
          ))}
        </div>

        {hasMore && expanded && (
          <div className="flex flex-wrap justify-end gap-1.5">
            {remainingItems.map((item) => (
              <span
                key={item.key}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.04] px-2.5 py-1 text-[11px]"
              >
                <span className="font-semibold text-white">{item.value}</span>
                <span className="text-slate-500">{item.label}</span>
              </span>
            ))}
          </div>
        )}

        {hasMore && (
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="w-full text-center text-[11px] font-medium text-slate-500 hover:text-slate-300 transition-colors"
          >
            {expanded ? "عرض أقل" : `+${remainingItems.length} المزيد`}
          </button>
        )}
      </div>
    </div>
  )
}
