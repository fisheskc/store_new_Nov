import Link from 'next/link';
import { Button } from '../ui/button';
import { VscCode } from 'react-icons/vsc';

function Logo() {
  // We are going to use forward slash, so the link is always going to the home page
  return (
    <Button size='icon' asChild>
    <Link href={'/'}>
    <VscCode className='w-6 h-6' />
    </Link>
      </Button>
  )
}

export default Logo