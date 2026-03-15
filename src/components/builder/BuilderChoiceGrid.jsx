import BuilderChoiceCard from "./BuilderChoiceCard"

export default function BuilderChoiceGrid({
  options,
  selectedValue,
  onSelect,
  compact = false,
}) {
  return (
    <div
      className={
        compact
          ? "grid grid-cols-2 gap-4"
          : "grid grid-cols-2 gap-4 md:grid-cols-3"
      }
    >
      {options.map((option) => (
        <BuilderChoiceCard
          key={option.value}
          label={option.label}
          isSelected={selectedValue === option.value}
          onClick={() => onSelect(option.value)}
        />
      ))}
    </div>
  )
}