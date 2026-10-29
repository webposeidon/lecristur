'use client';

import { Fragment } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import CatalogSidebar from '@/components/catalog/catalog-sidebar';
import type { FilterFacets } from '@/types';

export interface CatalogMobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  facets: FilterFacets;
}

export default function CatalogMobileDrawer({
  isOpen,
  onClose,
  facets,
}: CatalogMobileDrawerProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 lg:hidden" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-50 flex">
          <TransitionChild
            as={Fragment}
            enter="transform transition ease-in-out duration-300"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <DialogPanel className="relative mr-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white shadow-xl sm:max-w-sm">
              <CatalogSidebar
                facets={facets}
                onClose={onClose}
                isMobileDrawer={true}
              />
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
