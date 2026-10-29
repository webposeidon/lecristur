import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import type { DestinationSummary } from '@/types';

export interface DestinationCardProps {
  destination: DestinationSummary;
  className?: string;
  priority?: boolean;
}

const DESTINATION_IMAGE_FALLBACK: Record<string, string> = {
  transilvania: '/images/trips/marele-tur-transilvania.svg',
  maramures: '/images/trips/maramures-mocanita.svg',
  bucovina: '/images/trips/bucovina-manastiri.svg',
  moldova: '/images/trips/iasi-cetatea-neamt.svg',
  'delta-dunarii': '/images/trips/delta-dunarii.svg',
  litoral: '/images/trips/litoralul-romaniei.svg',
  brasov: '/images/trips/brasov-bran-sinaia.svg',
  sinaia: '/images/trips/sinaia-castelul-peles.svg',
  sovata: '/images/trips/sovata-corund-targu-mures.svg',
  sibiu: '/images/trips/sibiu-sighisoara.svg',
  transfagarasan: '/images/trips/transfagarasan-balea-lac.svg',
  apuseani: '/images/trips/circuit-carpati-apuseni.svg',
};

export default function DestinationCard({
  destination,
  className,
  priority = false,
}: DestinationCardProps) {
  const imageSrc =
    DESTINATION_IMAGE_FALLBACK[destination.slug] ||
    destination.image ||
    '/images/trips/brasov-bran-sinaia.svg';

  return (
    <Link
      href={`/excursii?destinatie=${destination.slug}`}
      className={clsx(
        'group block rounded-lg border-0 bg-white transition-all duration-300',
        className,
      )}
    >
      {/* Imagine curată rounded-lg */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#F7F7F7]">
        <Image
          src={imageSrc}
          alt={destination.name}
          fill
          sizes="(min-width: 1536px) 16vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Text direct pe alb dedesubt — fără chenar și fără gradiente */}
      <div className="pt-3 pb-1 px-0.5">
        <p className="text-[13px] font-normal text-[#909090]">
          {destination.tripCount} excursii
        </p>
        <h3 className="mt-0.5 truncate font-sans text-[17px] font-bold text-[#2C2C2C] transition-colors group-hover:text-teal">
          {destination.name}
        </h3>
        <span className="mt-1 inline-block text-[13px] font-bold text-teal transition-colors group-hover:text-teal-light">
          Vezi detalii
        </span>
      </div>
    </Link>
  );
}
