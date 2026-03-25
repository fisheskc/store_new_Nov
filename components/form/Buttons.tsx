'use client';

import { ReloadIcon } from '@radix-ui/react-icons';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SignInButton } from '@clerk/nextjs';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
// import { FaRegHeart, FaHeart, FaPenSquare } from 'react-icons/fa';
import { LuTrash2, LuPen } from 'react-icons/lu';
import { Card } from '@/components/ui/card';

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
  // We use the helper function to combine the class names together
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

// This is the sign in button from Shadci. That is the one we display, if the user has not logged in. 
export const CardSignInButton = () => {
  //  const { pending } = useFormStatus();
  // We just want to render the sign in button from Clerk
  return (
    <SignInButton mode='modal'>
    <Button type='button'size='icon' variant='outline' className='p-2 cursor-pointer' asChild>
      <FaRegHeart />
    </Button>
  </SignInButton>
  )
}

// We are going to pass in the product
export const CardSubmitButton = ({isFavorite}:{isFavorite:boolean}) => {
  const {pending} = useFormStatus()
  // We return a button where we will display the icon based on the pending value.
  // We just want to provide what we are going to render, if we are pending
  // If we are pending, we are displaying the reload icon. If not, then we are going to use a nested ternary operator
  // We are going to check the isFavourite value.
  // If it is the case, we are just going to use the heart icon
  // If it is not the case, we will display the same icon
  return (
    <Button type='submit' size='icon' variant='outline' className='p-2 cursor-pointer'>
    {pending ? (
      <ReloadIcon className='animate-spin'/> 
      ) :isFavorite ? (
      <FaHeart />
      ) : (
      <FaRegHeart />
      )}
  </Button>
  )
}

export const ProductSignInButton = () => {
  return <SignInButton mode='modal'>
    <Button type='button' className='mt-8 capitalize'>
      Sign in 
    </Button>
  </SignInButton>
}