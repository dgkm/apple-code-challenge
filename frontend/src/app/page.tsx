'use client';

import * as React from 'react';

import Logo from '~/svg/Logo.svg';

export default function HomePage() {
  return (
    <main>
      <section className='bg-white'>
        <div className='layout relative flex min-h-screen flex-col items-center text-center'>
          <Logo className='w-16' />
          <h1 className='mt-4'>Code challenge</h1>
        </div>
      </section>
    </main>
  );
}
