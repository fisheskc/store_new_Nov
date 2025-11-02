// This will be a client component
'use client';

import * as React from 'react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
// There is also a button component & a dropdown menu component from shadcn
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function ModeToggle() {
  // We invoke the hook, the usetheme & we get back this set theme function
  // Everytime we will invoke the setting, we are going to change the theme
  // When it comes to the dropdown menu, there is going to be three major components
  // which is the root component & then we have a trigger, "DropdownMenuTrigger"
  // This where we set up for example, buttons
  // We are going to toggle the content
  // Instead of using JS, for example, setting up the state variable they are using CSS in order 
  // to flip the icons. When the dark mode is present, the sun icon actually scales to zero.
  // When it comes to the moon icon, when the dark mode is present, it actually scales to a 100.
  // As a note, we tested with the use state. We can definitely set up the state value & check for the theme.
  // Then based on the value, display the icon, it is definitely the case.
  // As a result, once we flip the theme, we will also flip the icon. DropdownMenuContent will be our trigger.
  // Inside of the content, we display the dropdown menu items & each item represents a specific theme value.
  // Once we click on it, we invoke set theme
  // Either it is going to be light, dark or the sytem one.
  // Since the theme is light, we display the sun icon.
  // Once we click the sun icon, notice, we toggle the drop down menu content
  // We have the options & once we click on the dark, we right away get the values.
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <SunIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <MoonIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}