import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-lg border px-3 py-1 text-sm font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:h-4 [&>svg]:w-4 gap-1 [&>svg]:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 transition-colors overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-blue-500 text-white hover:bg-blue-600 focus-visible:ring-blue-400",
        secondary:
          "border-transparent bg-gray-200 text-blue-800 hover:bg-gray-300 focus-visible:ring-gray-300",
        destructive:
          "border-transparent bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-400",
        outline:
          "border border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-300",
        success:
          "border-transparent bg-green-500 text-white hover:bg-green-600 focus-visible:ring-green-400",
        warning:
          "border-transparent bg-yellow-400 text-gray-900 hover:bg-yellow-500 focus-visible:ring-yellow-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
