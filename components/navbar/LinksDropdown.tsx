"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { LuAlignLeft } from 'react-icons/lu';
import Link from 'next/link';
import { Button } from '../ui/button';
import { links, adminLinks } from '@/utils/links';
import UserIcon from './UserIcon';
import { SignInButton, SignedIn, SignedOut, SignUpButton, useUser } from '@clerk/nextjs';
import SignOutLink from './SignOutLink';


function LinksDropdown() {
  const { user } = useUser();

  // const { userId } = auth();
  // If the user is admin, we want to display the dashboard link. If not then we will not do that.
  // const isAdmin = user?.id === process.env.NEXT_PUBLIC_ADMIN_USER_ID;
  const isAdmin = user?.publicMetadata?.role === 'admin';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='flex gap-4 max-w-[100px]'>
          <LuAlignLeft className='w-6 h-6' />
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-40' align='start' sideOffset={10}>
        <SignedOut>
          <DropdownMenuItem>
            <SignInButton mode='modal'>
              <button className='w-full text-left'>Login</button>
            </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignUpButton mode='modal'>
              <button className='w-full text-left'>Register</button>
            </SignUpButton>
          </DropdownMenuItem>
        </SignedOut>
        <SignedIn>
          {links.map((link) => {
            if (link.label === 'dashboard' && !isAdmin) return null;
            return (
              <DropdownMenuItem key={link.href} asChild>
                <Link href={link.href} className='capitalize w-full'>
                  {link.label}
                </Link>
              </DropdownMenuItem>
            );
          })}
            {isAdmin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/admin/sales" className="capitalize w-full">
                dashboard
              </Link>
            </DropdownMenuItem>
          </>
        )}

         <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutLink />
          </DropdownMenuItem>
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default LinksDropdown;