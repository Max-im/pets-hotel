import { cn } from "@/lib/utils";

export default function ContentBlock({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn(`bg-gray-50 shadow-sm overflow-hidden rounded-md h-full w-full`, className)}>
      {children}
    </div>
  )
}
