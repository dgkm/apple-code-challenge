'use client';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

import UnderlineLink from '../links/UnderlineLink';

import Logo from '~/svg/Logo.svg';

interface MenuItemProps {
  href: string;
  icon?: boolean;
  children: ReactNode;
}

export const MenuItem = ({ href, icon, children }: MenuItemProps) => {
  const pathname = usePathname();

  const linkLabel = icon ? (
    <div className='flex flex-row'>
      <Logo className='w-5' />
      {children}
    </div>
  ) : (
    children
  );
  return (
    <UnderlineLink href={href} className={pathname == href ? 'active' : ''}>
      {linkLabel}
    </UnderlineLink>
  );
};
