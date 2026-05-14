import { cn } from "@workspace/ui/lib/utils"

type StepIndicatorProps = {
  step: number
  total: number
  className?: string
}

/** Doorwise onboarding step indicator — active step is a wider pill. */
function StepIndicator({ step, total, className }: StepIndicatorProps) {
  return (
    <div className={cn("flex items-center justify-center gap-1.5", className)}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-2 rounded-full transition-all",
            i === step - 1 ? "bg-primary w-7" : "w-2",
            i < step - 1 ? "bg-primary" : i === step - 1 ? "" : "bg-muted",
          )}
        />
      ))}
    </div>
  )
}

export { StepIndicator }
