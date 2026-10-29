import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

export interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export default function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={clsx('inline-flex items-center select-none', className)}
      aria-label="LeCrisTur — Acasă"
    >
      <Image
        src="/images/logo/LogoLeCris/Vector/SVG/LogoLeCrisRGB_Logo1.svg"
        alt="LeCrisTur — Excursii • Călătorii • Experiențe"
        width={198}
        height={45}
        priority
        className="h-10 sm:h-11 w-auto object-contain"
      />
    </Link>
  );
}

Logo.displayName = 'Logo';
