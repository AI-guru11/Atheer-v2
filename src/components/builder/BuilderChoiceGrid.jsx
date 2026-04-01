import BuilderChoiceCard from "./BuilderChoiceCard"

export default function BuilderChoiceGrid({
  options,
  selectedValue,
  onSelect,
  layout = "grid",
}) {
  const layoutClass = (() => {
    if (layout === "stack") return "grid grid-cols-1 gap-4"
    if (layout === "compact") return "grid grid-cols-2 gap-3 sm:gap-4"
    return "grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:gap-5"
  })()

  return (
    <div className={layoutClass}>
      {options.map((option, index) => (
        <div
          key={option.value}
          className="reveal-block"
          style={{ transitionDelay: `${index * 50}ms` }}
        >
          <BuilderChoiceCard
            label={option.label}
            description={option.description}
            isSelected={selectedValue === option.value}
            onClick={() => onSelect(option.value)}
            compact={layout !== "stack"}
          />
        </div>
      ))}
    </div>
  )
}
