'use client';

import { ReloadIcon } from '@radix-ui/react-icons';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SignInButton } from '@clerk/nextjs';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
// import { FaRegHeart, FaHeart, FaPenSquare } from 'react-icons/fa';
import { LuTrash2, LuPen } from 'react-icons/lu';

type btnSize = 'default' | 'lg' | 'sm';

// These are going to be props we can pass into the Submit button.
// ClassName, text & size are all optional. All of these will be setup with default values.
type SubmitButtonProps = {
  className?: string;
  text?: string;
  size?: btnSize;
};
export function SubmitButton({
  className = '',
  text = 'submit',
  size = 'lg',
}: SubmitButtonProps) {
  // This is going to give us the pending state of the form submission.
  const { pending } = useFormStatus();
  // Where it is going to be disabled?
  // When the pending is true
  // We use the helper function cn to combine the class names together
  // Inside of the pending of the button, we are going to show a loading icon if the form is pending
    // If it is not pending, we are going to show the text that was passed in
    // Inside the fragment there will be two things, the ReloadIcon
  return (
    <Button
      type='submit'
      disabled={pending}
      className={cn('capitalize', className)}
      size={size}
    >
             {pending ? (
        <>
          <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  );
}

type actionType = 'edit' | 'delete'

    // Whenever we render the icon button, it will either be the action type edit or delete
    // We will display different icons & we will use action type
export const IconButton = ({ actionType }: { actionType: actionType }) => {
      // We want to use the pending one. This will be the submit button, so we can check
      // for pending value. We will use the pending value in order to display the spinner
   const {pending} = useFormStatus()
      // We will check what is the action type & we will render the icon
      // If we are pending, it means we are communicating with the database
      // Therefore, we will display the reload icon & if we are not pending, we want to display one of the icons.
   const renderIcon = () => {
    switch (actionType) {
      case 'edit':
        return <LuPen />;
      case 'delete':
        return <LuTrash2 />;
      default:
        const never: never = actionType;
        throw new Error(`Invalid action type: ${never}`);
    }
  };
      return (
    <Button
      type='submit'
      size='icon'
      variant='link'
      className='p-2 cursor-pointer'
    >
      {pending ? <ReloadIcon className='animate-spin' /> : renderIcon()}
    </Button>
  );
};