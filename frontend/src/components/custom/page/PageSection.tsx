import { ReactNode } from 'react';

interface PageSectionProps {
  title: string;
  children: ReactNode;
}

export const PageSection = ({ title, children }: PageSectionProps) => {
  return (
    <main>
      <section className='bg-white mt-0 mb-10'>
        <div
          className='flex min-h-screen flex-col items-center text-center'
          data-testid='page-section'
        >
          <div className='flex justify-center text-3xl font-bold'>
            <span>{title}</span>
          </div>
          <div className='mt-6 w-full max-w-4xl mx-auto bg-gray-100 p-10'>
            {children}
          </div>
        </div>
      </section>
    </main>
  );
};
