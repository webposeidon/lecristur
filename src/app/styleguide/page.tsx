'use client';

import { useState } from 'react';
import Button from '@/components/ui/button';
import Badge from '@/components/ui/badge';
import Rating from '@/components/ui/rating';
import Input from '@/components/ui/form-fields/input';
import SelectBox, { OptionType } from '@/components/ui/select-box';
import Checkbox from '@/components/ui/form-fields/checkbox';
import CheckboxGroup, { CheckboxOption } from '@/components/ui/checkbox-group';
import RangeSlider from '@/components/ui/range-slider';
import Pagination from '@/components/ui/pagination';
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

export default function StyleguidePage() {
  // Select state
  const destinationOptions: OptionType[] = [
    { label: 'Toate destinațiile', value: 'all' },
    { label: 'Brașov • Bran • Sinaia', value: 'brasov' },
    { label: 'Maramureș • Mocănița', value: 'maramures' },
    { label: 'Bucovina • Mănăstiri', value: 'bucovina' },
    { label: 'Sovata • Corund • Salina Praid', value: 'sovata' },
    { label: 'Delta Dunării & Litoral', value: 'delta' },
  ];
  const [selectedDestination, setSelectedDestination] = useState<OptionType>(destinationOptions[0]);

  // Sort state
  const sortOptions: OptionType[] = [
    { label: 'Cele mai populare', value: 'popular' },
    { label: 'Data plecării (crescător)', value: 'date-asc' },
    { label: 'Preț (crescător)', value: 'price-asc' },
    { label: 'Preț (descrescător)', value: 'price-desc' },
  ];
  const [selectedSort, setSelectedSort] = useState<OptionType>(sortOptions[0]);

  // Checkbox group state
  const [checkboxOptions, setCheckboxOptions] = useState<CheckboxOption[]>([
    { id: '1', label: 'Toate destinațiile', count: 50, checked: true },
    { id: '2', label: 'Brașov & Valea Prahovei', count: 12, checked: false },
    { id: '3', label: 'Maramureș & Țara Oașului', count: 8, checked: false },
    { id: '4', label: 'Bucovina & Neamț', count: 6, checked: false },
  ]);

  const handleCheckboxToggle = (option: CheckboxOption) => {
    setCheckboxOptions((prev) =>
      prev.map((item) =>
        item.id === option.id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  // Slider state
  const [priceRange, setPriceRange] = useState<number | number[]>([30, 180]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Single checkbox state
  const [singleChecked, setSingleChecked] = useState(true);

  // Input clearable state
  const [searchValue, setSearchValue] = useState('Castelul Bran');

  return (
    <main className="min-h-screen bg-white py-12 lg:py-16">
      <div className="container-fluid max-w-6xl">
        {/* Intro Header */}
        <div className="mb-14">
          <Badge color="teal" variant="flat" className="mb-3">
            Ghid de Stil & Design System (tripfinder-hotel)
          </Badge>
          <h1 className="font-sans text-3xl md:text-5xl font-bold text-[#1F284B] mb-4">
            Sistemul Vizual LeCrisTur
          </h1>
          <p className="text-base md:text-lg text-[#777777] max-w-3xl leading-relaxed">
            Alb curat (`#FFFFFF`), fără borderuri, fără gradiente, tipografie 100% Sans-Serif (`Lato`) și accente Primary Teal (`#0E7A7A` / `#008489`).
            <span className="font-bold text-[#2C2C2C] ml-1">„ș, ț, ă, â, î — Excursii • Călătorii • Experiențe!”</span>
          </p>
        </div>

        {/* 1. PALETA DE CULORI */}
        <section className="mb-14 bg-white">
          <h2 className="font-sans text-2xl font-bold text-[#1F284B] mb-6">
            1. Paleta de Culori (Design Tokens)
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="flex flex-col gap-2">
              <div className="h-16 rounded-lg bg-teal" />
              <div className="text-xs font-bold text-[#2C2C2C]">Primary Teal</div>
              <div className="text-[11px] text-[#909090]">#0E7A7A</div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-16 rounded-lg bg-teal-hover" />
              <div className="text-xs font-bold text-[#2C2C2C]">Hotel Teal</div>
              <div className="text-[11px] text-[#909090]">#008489</div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-16 rounded-lg bg-[#1F284B]" />
              <div className="text-xs font-bold text-[#2C2C2C]">Heading Dark</div>
              <div className="text-[11px] text-[#909090]">#1F284B</div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-16 rounded-lg bg-[#2C2C2C]" />
              <div className="text-xs font-bold text-[#2C2C2C]">Text Principal</div>
              <div className="text-[11px] text-[#909090]">#2C2C2C</div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-16 rounded-lg bg-[#F7F7F7]" />
              <div className="text-xs font-bold text-[#2C2C2C]">Suprafață Input</div>
              <div className="text-[11px] text-[#909090]">#F7F7F7</div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-16 rounded-lg bg-status-success" />
              <div className="text-xs font-bold text-[#2C2C2C]">Verde Status</div>
              <div className="text-[11px] text-[#909090]">#00BB5D</div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-bold text-[#2C2C2C] mb-3">
              Culori Categorii Excursii
            </h3>
            <div className="flex flex-wrap gap-2.5">
              <Badge color="popular">Popular</Badge>
              <Badge color="natura">Natură</Badge>
              <Badge color="cultural">Cultural</Badge>
              <Badge color="citybreak">City Break</Badge>
              <Badge color="exclusiv">Exclusiv</Badge>
            </div>
          </div>
        </section>

        {/* 2. TIPOGRAFIE */}
        <section className="mb-14 bg-white">
          <h2 className="font-sans text-2xl font-bold text-[#1F284B] mb-6">
            2. Tipografie (100% Lato Sans-Serif)
          </h2>
          <div className="space-y-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-teal font-bold">Heading H1 Lato Bold</span>
              <h1 className="font-sans text-3xl sm:text-4xl font-bold text-[#1F284B]">
                Descoperă România alături de LeCrisTur
              </h1>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-teal font-bold">Heading H2 Lato Bold</span>
              <h2 className="font-sans text-2xl sm:text-3xl font-bold text-[#2C2C2C]">
                Toate plecările din Noiembrie 2026
              </h2>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-teal font-bold">Heading H3 Lato Bold</span>
              <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#2C2C2C]">
                Brașov • Bran • Sinaia (2 zile / 1 noapte)
              </h3>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-teal font-bold">Text Lato Regular (cu diacritice)</span>
              <p className="text-base text-[#777777] leading-relaxed">
                Vă invităm într-o călătorie de neuitat prin Transilvania, unde istoria se împletește cu peisajele spectaculoase
                ale Munților Carpați. Autocar modern, pornire comodă din Chișinău, ghid atestat pe tot traseul și asistență turistică dedicată.
              </p>
            </div>
          </div>
        </section>

        {/* 3. BUTOANE */}
        <section className="mb-14 bg-white">
          <h2 className="font-sans text-2xl font-bold text-[#1F284B] mb-6">
            3. Butoane (Variante, Mărimi & Stări)
          </h2>

          <div className="space-y-6">
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#909090] font-bold mb-3">Variante</h4>
              <div className="flex flex-wrap items-center gap-3">
                <Button color="teal">Teal CTA (Solid)</Button>
                <Button color="navy">Dark Brand</Button>
                <Button variant="flat" color="teal">Teal Flat</Button>
                <Button variant="flat" color="navy">Secondary Flat</Button>
                <Button variant="text" color="teal">Text Button</Button>
              </div>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#909090] font-bold mb-3">Mărimi & Rotunjiri</h4>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm" rounded="DEFAULT">Mic</Button>
                <Button size="DEFAULT" rounded="DEFAULT">Mediu</Button>
                <Button size="lg" rounded="lg">Mare (Large)</Button>
                <Button size="xl" rounded="pill">Extra Large Pill</Button>
              </div>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#909090] font-bold mb-3">Cu Icon & Stare Încărcare</h4>
              <div className="flex flex-wrap items-center gap-3">
                <Button color="teal" className="gap-2">
                  <span>Rezervă acum</span>
                  <ArrowRightIcon className="h-4 w-4" />
                </Button>
                <Button color="navy" isLoading>
                  Se încarcă...
                </Button>
                <Button color="teal" disabled>
                  Dezactivat
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 4. BADGE-URI & STATUSURI */}
        <section className="mb-14 bg-white">
          <h2 className="font-sans text-2xl font-bold text-[#1F284B] mb-6">
            4. Badge-uri (Categorii & Status Disponibilitate)
          </h2>

          <div className="space-y-6">
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#909090] font-bold mb-3">
                Categorii Excursii
              </h4>
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge color="popular" rounded="md">Popular</Badge>
                <Badge color="natura" rounded="md">Natură</Badge>
                <Badge color="cultural" rounded="md">Cultural</Badge>
                <Badge color="citybreak" rounded="md">City Break</Badge>
                <Badge color="exclusiv" rounded="md">Exclusiv</Badge>
              </div>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#909090] font-bold mb-3">
                Status Locuri în Autocar
              </h4>
              <div className="flex flex-wrap items-center gap-3">
                <Badge color="success" variant="flat" rounded="pill" className="px-3 py-1 font-bold">
                  ● 28 locuri disponibile
                </Badge>
                <Badge color="warning" variant="flat" rounded="pill" className="px-3 py-1 font-bold">
                  ● Ultimele 4 locuri
                </Badge>
                <Badge color="danger" variant="flat" rounded="pill" className="px-3 py-1 font-bold">
                  ● Sold out
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* 5. CÂMPURI DE FORMULAR (INPUTS) */}
        <section className="mb-14 bg-white">
          <h2 className="font-sans text-2xl font-bold text-[#1F284B] mb-6">
            5. Câmpuri de Formular (Inputs pe #F7F7F7 fără border)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Destinație căutată"
              placeholder="Ex: Brașov, Sinaia, Maramureș..."
              startIcon={<MapPinIcon className="h-5 w-5" />}
            />

            <Input
              label="Dată plecare"
              placeholder="Selectează data"
              startIcon={<CalendarDaysIcon className="h-5 w-5" />}
            />

            <Input
              label="Căutare excursie (cu ștergere)"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              clearable
              onClearClick={() => setSearchValue('')}
              startIcon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />

            <Input
              label="Număr pasageri"
              placeholder="Ex: 2 persoane"
              startIcon={<UserGroupIcon className="h-5 w-5" />}
              error="Selectați cel puțin o persoană pentru rezervare"
            />
          </div>
        </section>

        {/* 6. SELECTBOX */}
        <section className="mb-14 bg-white">
          <h2 className="font-sans text-2xl font-bold text-[#1F284B] mb-6">
            6. SelectBox (Dropdown Accesibil cu umbră fină)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <SelectBox
                label="Filtru Destinație"
                options={destinationOptions}
                value={selectedDestination}
                onChange={(val) => setSelectedDestination(val)}
              />
              <p className="mt-2 text-xs text-[#909090]">
                Valoare selectată: <span className="font-bold text-[#2C2C2C]">{selectedDestination.label}</span>
              </p>
            </div>

            <div>
              <SelectBox
                label="Sortează Catalogul"
                options={sortOptions}
                value={selectedSort}
                onChange={(val) => setSelectedSort(val)}
              />
              <p className="mt-2 text-xs text-[#909090]">
                Sortează după: <span className="font-bold text-[#2C2C2C]">{selectedSort.label}</span>
              </p>
            </div>
          </div>
        </section>

        {/* 7. RATING */}
        <section className="mb-14 bg-white">
          <h2 className="font-sans text-2xl font-bold text-[#1F284B] mb-6">
            7. Rating (Steluțe Teal #008489)
          </h2>

          <div className="flex flex-wrap items-center gap-8">
            <div>
              <span className="block text-xs uppercase tracking-wider text-[#909090] font-bold mb-2">
                Card Excursie (4.8 / 5)
              </span>
              <div className="flex items-center gap-2">
                <Rating defaultValue={4.8} allowHalf disabled size="DEFAULT" />
                <span className="text-sm font-bold text-[#2C2C2C]">4.8</span>
                <span className="text-xs text-[#909090]">(128 recenzii)</span>
              </div>
            </div>

            <div>
              <span className="block text-xs uppercase tracking-wider text-[#909090] font-bold mb-2">
                Interactiv (Adaugă recenzie)
              </span>
              <Rating defaultValue={5} allowHalf size="lg" />
            </div>
          </div>
        </section>

        {/* 8. CHECKBOX & CHECKBOX GROUP */}
        <section className="mb-14 bg-white">
          <h2 className="font-sans text-2xl font-bold text-[#1F284B] mb-6">
            8. Checkbox & Filtre Laterale
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <CheckboxGroup
                label="Destinații disponibile"
                options={checkboxOptions}
                onChange={handleCheckboxToggle}
              />
            </div>

            <div className="flex flex-col gap-4">
              <span className="block text-sm font-bold text-[#2C2C2C]">
                Opțiuni individuale
              </span>
              <Checkbox
                label="Transport cu autocar inclus"
                checked={singleChecked}
                onChange={() => setSingleChecked(!singleChecked)}
              />
              <Checkbox
                label="Cazare la hotel 3★ inclusă"
                defaultChecked
              />
              <Checkbox
                label="Ghid turistic însoțitor pe tot traseul"
                defaultChecked
              />
            </div>
          </div>
        </section>

        {/* 9. RANGE SLIDER (BUGET) */}
        <section className="mb-14 bg-white">
          <h2 className="font-sans text-2xl font-bold text-[#1F284B] mb-6">
            9. RangeSlider (Filtru Buget €/persoană)
          </h2>

          <div className="max-w-md">
            <div className="flex items-center justify-between text-sm font-bold text-[#2C2C2C] mb-2">
              <span>Buget (€/persoană)</span>
              <span className="text-teal">
                {Array.isArray(priceRange) ? `${priceRange[0]} € — ${priceRange[1]} €` : `${priceRange} €`}
              </span>
            </div>

            <RangeSlider
              range
              min={0}
              max={300}
              defaultValue={[30, 180]}
              onChange={(val) => setPriceRange(val)}
            />

            <div className="flex justify-between text-xs font-bold text-[#909090] mt-2">
              <span>0 €</span>
              <span>150 €</span>
              <span>300 €</span>
            </div>
          </div>
        </section>

        {/* 10. PAGINARE */}
        <section className="bg-white">
          <h2 className="font-sans text-2xl font-bold text-[#1F284B] mb-6">
            10. Paginare (Catalog Excursii)
          </h2>

          <div className="flex flex-col items-center gap-4">
            <Pagination
              current={currentPage}
              total={50}
              pageSize={10}
              onChange={(page) => setCurrentPage(page)}
            />
            <p className="text-xs text-[#909090]">
              Pagina curentă: <span className="font-bold text-[#2C2C2C]">{currentPage}</span> din 5
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
