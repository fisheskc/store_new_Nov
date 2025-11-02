import { cn } from '@/lib/utils'
// This component is looking for two props
// heading - we set it equal to optional
function EmptyList({heading = 'No items found.', className}:{heading?:string, className?:string}) {
  return (
    <h2 className={cn('text-xl',className)}>
      {heading}
    </h2>
  )
}

export default EmptyList