import Link from 'next/link';
import Logo from '@/components/ui/logo';

export default function Footer() {
  return (
    <footer className="w-full bg-white text-[#2C2C2C] mt-8">
      <div className="container-fluid">
        {/* Separator minimal și discret la începutul footer-ului */}
        <div className="h-px w-full bg-[#EBEBEB]" />

        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Col */}
          <div className="flex flex-col items-start gap-4">
            <Logo />
            <p className="text-sm text-[#777777] leading-relaxed">
              Excursii organizate din Republica Moldova către cele mai pitorești destinații din România.
              Autocare moderne, ghizi pasionați și experiențe memorabile.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3.5">
            <h4 className="text-[15px] font-bold text-[#1F284B]">Navigație</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[#777777]">
              <li>
                <Link href="/" className="hover:text-teal transition-colors">Acasă</Link>
              </li>
              <li>
                <Link href="/excursii" className="hover:text-teal transition-colors">Catalog excursii</Link>
              </li>
              <li>
                <Link href="/calendar" className="hover:text-teal transition-colors">Calendarul plecărilor</Link>
              </li>
              <li>
                <Link href="/#destinatii" className="hover:text-teal transition-colors">Destinații România</Link>
              </li>
              <li>
                <Link href="/despre-noi" className="hover:text-teal transition-colors">Despre noi</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-teal transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Destinații */}
          <div className="flex flex-col gap-3.5">
            <h4 className="text-[15px] font-bold text-[#1F284B]">Destinații Populare</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[#777777]">
              <li>Brașov • Castelul Bran • Sinaia</li>
              <li>Maramureș • Mocănița de pe Vaser</li>
              <li>Bucovina • Mănăstirile pictate</li>
              <li>Sovata • Salina Praid • Corund</li>
              <li>Delta Dunării & Litoral</li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="flex flex-col gap-3.5">
            <h4 className="text-[15px] font-bold text-[#1F284B]">Contact & Asistență</h4>
            <div className="flex flex-col gap-2.5 text-sm text-[#777777]">
              <p><span className="text-[#2C2C2C] font-bold">Punct de plecare:</span> Chișinău, Rep. Moldova</p>
              <p>
                <span className="text-[#2C2C2C] font-bold">Telefon:</span>{' '}
                <a href="tel:+37360123456" className="hover:text-teal transition-colors font-bold text-[#2C2C2C]">
                  +373 60 123 456
                </a>
              </p>
              <p><span className="text-[#2C2C2C] font-bold">Program:</span> Luni - Duminică: 08:00 - 20:00</p>
              <p className="text-xs text-[#909090] mt-1">Rezervări online sau telefonice cu confirmare imediată.</p>
            </div>
          </div>
        </div>

          {/* Bottom bar cu linie fină discretă */}
          <div className="mt-12 pt-6 border-t border-[#F0F0F0] flex flex-col sm:flex-row items-center justify-between gap-4 text-[14px] text-[#909090]">
            <p>© {new Date().getFullYear()} LeCrisTur. Toate drepturile rezervate.</p>
            <div className="flex gap-6">
              <Link href="/termeni" className="hover:text-teal transition-colors">Termeni și condiții</Link>
              <Link href="/confidentialitate" className="hover:text-teal transition-colors">Politică de confidențialitate</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.displayName = 'Footer';
