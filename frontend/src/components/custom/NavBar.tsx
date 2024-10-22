'use client';
import { usePathname } from 'next/navigation';

import { MenuItem } from './MenuItem';
import ArrowLink from '../links/ArrowLink';

export const Navbar = () => {
  const pathname = usePathname();
  return (
    <>
      <nav>
        <h3>Code Challenge</h3>
        <MenuItem href='/' icon>
          Home
        </MenuItem>
        <MenuItem href='/assets/pagination' icon>
          Assets (by pagination)
        </MenuItem>
        <MenuItem href='/assets/infinite' icon>
          Assets (by infinite)
        </MenuItem>
        <MenuItem href='/assets/original'>Original List</MenuItem>
        <MenuItem href='/components'>Included Components</MenuItem>
      </nav>

      <div className='flex max-w-5xl flex-col items-center text-right pb-8 pt-0'>
        {pathname !== '/' ? (
          <ArrowLink direction='left' className='mt-2' href='/'>
            Back to Home
          </ArrowLink>
        ) : (
          ''
        )}
      </div>
    </>
  );
};
