'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogInIcon, LogOutIcon } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { ModeToggle } from '../components/mode-toggle';
import { Button } from '../components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

function AccountDropdown() {
  const session = useSession();
  const isLoggedIn = !!session.data;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'link'}>
          <Avatar className="mr-2">
            <AvatarImage src={session.data?.user?.image ?? ''} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          {session.data?.user?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() =>
            signOut({
              callbackUrl: '/',
            })
          }
        >
          <LogOutIcon className="mr-2" /> Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header() {
  const session = useSession();
  const isLoggedIn = !!session.data;

  return (
    <header className="bg-gray-100 py-4 dark:bg-gray-900 container mx-auto z-10 relative">
      <div className="flex justify-between items-center">
        <Link
          href="/"
          className="flex gap-2 items-center text-xl hover:underline"
        >
          <Image
            src="/icon.png"
            width="60"
            height="60"
            alt="the application icon of a magnifying glass"
          />
          DevFinder
        </Link>

        <nav className="flex gap-8">
          {isLoggedIn && (
            <>
              <Link className="hover:underline" href="/browse">
                Browse
              </Link>

              <Link className="hover:underline" href="/your-rooms">
                Your Rooms
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {isLoggedIn && <AccountDropdown />}
          {!isLoggedIn && (
            <Button onClick={() => signIn()} variant="link">
              <LogInIcon className="mr-2" /> Sign In
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
