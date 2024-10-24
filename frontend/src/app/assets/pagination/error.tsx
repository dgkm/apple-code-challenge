'use client';

import { PageSection } from '@/components/custom/page/PageSection';

import { paginationPageTitle } from '@/constant/constants';

export default function PaginationLoadingPage() {
  return (
    <PageSection title={paginationPageTitle}>
      <div className='font-bold text-red-500'>
        API data loading error occoured... (server)
      </div>
    </PageSection>
  );
}
