'use client';
import { memo } from 'react';
import { adminLinks } from '@/utils/links';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

// This is going to give us the value, for the SalesPage or the ProductsPage.
function Sidebar() {
  const pathname = usePathname();

  return (
    // We want to iterate over the adminLinks
    // This is going to be the active page & it will get different styles
    <aside>
      {adminLinks.map((link) => {
        const isActivePage = pathname === link.href;
        console.log("isActivePage")
        console.log(isActivePage)
        // If it is the case, then the value is going to be secondary
        const variant = isActivePage ? 'default' : 'ghost';
        // We will set asChild since we want to render the link
        return (
         
          <Button
            key={link.href}
            asChild
            className='w-full mb-2 capitalize font-normal justify-start'
            variant={variant}
          >
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          </Button>
        );
      })}
    </aside>
  );
}
export default memo(Sidebar);