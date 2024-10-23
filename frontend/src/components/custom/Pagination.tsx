'use client';

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/20/solid';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ReactNode } from 'react';

const leftClass =
  'relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0';

const rightClass =
  'relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0';

const activeClass =
  'relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600';

const normalClass =
  'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0';

interface SideButtonProps {
  page?: number;
  label?: string;
  handleClick: (page: number) => void;
  disabled?: boolean;
  direction?: 'left' | 'right';
  icon?: ReactNode;
}

const SideButton = ({
  page,
  label,
  handleClick,
  disabled = false,
  direction = 'left',
  icon,
}: SideButtonProps) => {
  return (
    <button
      onClick={() => handleClick && page && handleClick(page)}
      disabled={disabled}
      className={direction === 'left' ? leftClass : rightClass}
    >
      {label && <span className='sr-only'>{label}</span>}
      {icon && icon}
    </button>
  );
};

interface PageButtonProps {
  page?: number;
  currentPage: number;
  handleClick: (page: number) => void;
}

const PageButton = ({ page, handleClick, currentPage }: PageButtonProps) => {
  const active = page === currentPage;
  return (
    <button
      onClick={() => handleClick && page && handleClick(page)}
      aria-current='page'
      className={active ? activeClass : normalClass}
    >
      {page}
    </button>
  );
};

export default function Pagination({
  totalPages,
}: Readonly<{ totalPages: number }>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const currentPage = Number(searchParams.get('page')) || 2;

  const changePageNumber = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className='hidden sm:flex sm:items-center sm:justify-between h-8 mb-5'>
      <div>
        <p className='text-sm text-gray-700 w-40'>
          Showing{' '}
          <span className='font-medium'>{currentPage * 10 - 10 + 1}</span> to{' '}
          <span className='font-medium'>{currentPage * 10}</span> of{' '}
          <span className='font-medium'>{totalPages}</span> results
        </p>
      </div>
      <div>
        <nav
          aria-label='Pagination'
          className='isolate inline-flex -space-x-px rounded-md shadow-sm'
        >
          {totalPages > 1 && (
            <SideButton
              page={1}
              handleClick={changePageNumber}
              disabled={currentPage === 1}
              label='First'
              icon={
                <ChevronDoubleLeftIcon aria-hidden='true' className='h-5 w-5' />
              }
              direction='left'
            />
          )}
          <SideButton
            page={currentPage - 1}
            handleClick={changePageNumber}
            disabled={currentPage === 1}
            label='Previous'
            icon={<ChevronLeftIcon aria-hidden='true' className='h-5 w-5' />}
            direction='left'
          />
          {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
          {totalPages >= 1 && (
            <PageButton
              page={Math.min(Math.max(totalPages - 4, 1), currentPage)}
              handleClick={changePageNumber}
              currentPage={currentPage}
            />
          )}
          {totalPages >= 2 && (
            <PageButton
              page={Math.min(Math.max(totalPages - 3, 1), currentPage + 1)}
              handleClick={changePageNumber}
              currentPage={currentPage}
            />
          )}
          {currentPage < totalPages - 5 && (
            <span className='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0'>
              ...
            </span>
          )}
          {totalPages >= 3 && (
            <PageButton
              page={Math.max(totalPages - 2, 2)}
              handleClick={changePageNumber}
              currentPage={currentPage}
            />
          )}
          {totalPages >= 4 && (
            <PageButton
              page={Math.max(totalPages - 1, 3)}
              handleClick={changePageNumber}
              currentPage={currentPage}
            />
          )}
          <SideButton
            page={currentPage + 1}
            handleClick={changePageNumber}
            disabled={currentPage >= totalPages - 1}
            label='Next'
            icon={<ChevronRightIcon aria-hidden='true' className='h-5 w-5' />}
            direction='right'
          />
          {totalPages >= 4 && (
            <SideButton
              page={totalPages - 1}
              handleClick={changePageNumber}
              disabled={currentPage >= totalPages}
              label='Last'
              icon={
                <ChevronDoubleRightIcon
                  aria-hidden='true'
                  className='h-5 w-5'
                />
              }
              direction='right'
            />
          )}
        </nav>
      </div>
    </div>
  );
}
