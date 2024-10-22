import { ReactNode } from 'react';

import Logo from '~/svg/Logo.svg';

interface PageSectionProps {
  title: string;
  children: ReactNode;
}

export const PageSection = ({ title, children }: PageSectionProps) => {
  return (
    <main>
      <section className='bg-white'>
        <div className='flex min-h-screen flex-col items-center text-center'>
          <div className='flex justify-center text-3xl font-bold'>
            <Logo className='w-10' />
            <span>{title}</span>
          </div>
          <div className='mt-8 w-full max-w-4xl mx-auto bg-gray-100 p-10'>
            {children}
          </div>
        </div>
      </section>
    </main>
  );
};
