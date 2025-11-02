// Separator which is a horizontal line from Shahcn
import { Separator } from '@/components/ui/separator';

function SectionTitle({text}:{text:string}) {
  return (
    <div>
      <h2 className='text-3x1 font-medium tracking-wider capitalize mb-8'>
        {text}
      </h2>
      <Separator />
    </div>
  )
}

export default SectionTitle
