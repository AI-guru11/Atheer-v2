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
          ? "grid grid-cols-2 gap-5" // زيادة الفجوة لإعطاء شعور بالاتساع
          : "grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:gap-6"
      }
    >
      {options.map((option, index) => (
        <div 
          key={option.value}
          className="reveal-block"
          style={{ 
            // إضافة تأخير زمني بسيط لكل بطاقة لخلق حركة Stagger فاخرة
            transitionDelay: `${index * 80}ms` 
          }}
        >
          <BuilderChoiceCard
            label={option.label}
            description={option.description}
            isSelected={selectedValue === option.value}
            onClick={() => onSelect(option.value)}
          />
        </div>
      ))}
    </div>
  )
}
