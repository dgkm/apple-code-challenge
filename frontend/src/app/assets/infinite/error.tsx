'use client';

import { PageSection } from '@/components/custom/page/PageSection';

import { infinitePageTitle } from '@/constant/constants';

export default function PaginationLoadingPage() {
  return (
    <PageSection title={infinitePageTitle}>
      <p>Error occoured...</p>
    </PageSection>
  );
}
