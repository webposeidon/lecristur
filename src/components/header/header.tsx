'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
  MagnifyingGlassIcon,
  HeartIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Logo from '@/components/ui/logo';
import Button from '@/components/ui/button';

const navLinks = [
  { label: 'Acasă', href: '/' },
  { label: 'Excursii', href: '/excursii' },
  { label: 'Calendar', href: '/calendar' },
  { label: 'Destinații', href: '/#destinatii' },
  { label: 'Grupuri', href: '/grupuri' },
  { label: 'Despre noi', href: '/despre-noi' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export interface HeaderProps {
  variant?: 'transparent' | 'solid';
}

export default function Header(_props: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on path change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 w-full bg-white text-[#2C2C2C] shadow-float border-0">
      <div className="container-fluid flex min-h-[82px] items-center justify-between gap-4">
        {/* Logo oficial color */}
        <Logo />

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 2xl:gap-2">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'relative px-3.5 py-7 text-[15px] leading-[18px] transition-colors hover:text-teal',
                  isActive
                    ? 'font-bold text-teal after:absolute after:bottom-0 after:left-3.5 after:right-3.5 after:h-[3px] after:bg-teal'
                    : 'font-normal text-[#2C2C2C]',
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Utilities */}
        <div className="flex items-center gap-2.5 md:gap-4">
          {/* Quick Search */}
          <Link
            href="/excursii"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#2C2C2C] hover:text-teal hover:bg-[#F7F7F7] transition-colors"
            title="Căutare"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </Link>

          {/* Wishlist / Favorites */}
          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-[#2C2C2C] hover:text-teal hover:bg-[#F7F7F7] transition-colors"
            title="Favorite"
          >
            <HeartIcon className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-teal text-[10px] font-bold text-white">
              2
            </span>
          </button>

          {/* User Account */}
          <Link
            href="/contul-meu"
            className="hidden lg:flex items-center gap-1.5 text-[15px] font-normal text-[#2C2C2C] hover:text-teal transition-colors py-2 px-2.5 rounded-[3px]"
          >
            <UserIcon className="h-4 w-4" />
            <span>Contul meu</span>
          </Link>

          {/* CTA Button Teal */}
          <Link href="/excursii" className="hidden sm:inline-flex">
            <Button
              color="teal"
              size="DEFAULT"
              rounded="DEFAULT"
              className="min-h-[38px] px-4 py-2 text-[15px] font-normal"
            >
              Rezervă acum
            </Button>
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex xl:hidden h-10 w-10 items-center justify-center rounded-lg text-[#2C2C2C] hover:bg-[#F7F7F7] transition-colors"
            aria-label="Meniu"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white px-4 py-5 shadow-float border-0 transition-all">
          <nav className="flex flex-col gap-1">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'px-3.5 py-2.5 rounded-lg text-[15px] transition-colors',
                    isActive
                      ? 'bg-[#F7F7F7] text-teal font-bold'
                      : 'text-[#2C2C2C] font-normal hover:bg-[#F7F7F7] hover:text-teal',
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 pt-4 flex flex-col gap-3">
            <Link
              href="/contul-meu"
              className="flex items-center gap-2 text-sm text-[#2C2C2C] hover:text-teal px-3.5 py-1.5"
            >
              <UserIcon className="h-5 w-5" />
              <span>Contul meu</span>
            </Link>
            <Link href="/excursii">
              <Button color="teal" className="w-full text-center">
                Rezervă acum
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
