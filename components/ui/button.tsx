import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 ease-in-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:h-4 [&_svg]:w-4 shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-blue-500 text-white shadow-md hover:bg-blue-600 focus-visible:ring-blue-400",
        destructive:
          "bg-red-500 text-white shadow-md hover:bg-red-600 focus-visible:ring-red-400",
        outline:
          "border border-gray-300 bg-white text-gray-800 shadow-sm hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-300",
        secondary:
          "bg-gray-200 text-gray-800 shadow-sm hover:bg-gray-300 focus-visible:ring-gray-200",
        ghost:
          "bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-200",
        link:
          "text-blue-500 underline-offset-4 hover:underline focus-visible:ring-blue-300",
        success:
          "bg-green-500 text-white shadow-md hover:bg-green-600 focus-visible:ring-green-400",
        warning:
          "bg-yellow-400 text-gray-900 shadow-sm hover:bg-yellow-500 focus-visible:ring-yellow-300",
      },
      size: {
        default: "h-10 px-5 py-2 has-[>svg]:pl-4",
        sm: "h-8 px-3 py-1.5 text-sm has-[>svg]:pl-2.5",
        lg: "h-12 px-6 py-3 text-base has-[>svg]:pl-4",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
