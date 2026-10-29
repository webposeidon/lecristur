'use client';

import { useState } from 'react';
import clsx from 'clsx';
import {
  DocumentTextIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  BuildingOffice2Icon,
  TruckIcon,
  MapPinIcon,
  StarIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';

interface TabItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TABS: TabItem[] = [
  { id: 'descriere', label: 'Descriere generală', icon: DocumentTextIcon },
  { id: 'program', label: 'Program pe zile', icon: CalendarDaysIcon },
  { id: 'ce-include', label: 'Ce include', icon: CheckCircleIcon },
  { id: 'cazare', label: 'Cazare', icon: BuildingOffice2Icon },
  { id: 'transport', label: 'Transport', icon: TruckIcon },
  { id: 'harta', label: 'Hartă', icon: MapPinIcon },
  { id: 'recenzii', label: 'Recenzii', icon: StarIcon },
  {
    id: 'intrebari-frecvente',
    label: 'Întrebări frecvente',
    icon: QuestionMarkCircleIcon,
  },
];

export default function TripTabsNav() {
  const [activeTab, setActiveTab] = useState<string>('descriere');

  const handleScrollTo = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      aria-label="Secțiuni detalii excursie"
      className="sticky top-[80px] z-30 rounded-lg border-0 bg-white px-2 sm:px-4 shadow-float"
    >
      <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleScrollTo(tab.id)}
              className={clsx(
                'relative flex flex-shrink-0 items-center gap-1.5 px-2.5 py-3.5 text-xs sm:text-[13px] font-bold transition-colors whitespace-nowrap',
                isActive
                  ? 'text-teal'
                  : 'text-[#777777] hover:text-[#2C2C2C]',
              )}
            >
              <Icon
                className={clsx(
                  'h-4 w-4 flex-shrink-0',
                  isActive ? 'text-teal' : 'text-[#909090]',
                )}
              />
              <span>{tab.label}</span>
              {isActive && (
                <span className="absolute bottom-0 left-2 right-2 h-[3px] rounded-full bg-teal" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
