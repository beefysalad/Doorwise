import { colorFor, initialsOf } from "@/lib/mock/doorwise"
import { cn } from "@workspace/ui/lib/utils"

type AvatarInitialsProps = {
  name: string
  size?: number
  className?: string
}

/** Initials in a deterministically-colored circle — no photos. */
function AvatarInitials({ name, size = 36, className }: AvatarInitialsProps) {
  if (!name) {
    return (
      <div
        className={cn(
          "bg-muted text-muted-foreground flex shrink-0 items-center justify-center rounded-full font-semibold",
          className,
        )}
        style={{ width: size, height: size, fontSize: size * 0.4 }}
      >
        ?
      </div>
    )
  }
  const c = colorFor(name)
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-semibold",
        className,
      )}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4,
        background: c.bg,
        color: c.fg,
      }}
    >
      {initialsOf(name)}
    </div>
  )
}

export { AvatarInitials }
