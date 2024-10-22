import { PageSection } from '@/components/custom/page/PageSection';

import { paginationPageTitle } from '@/constant/constants';

export default function PaginationLoadingPage() {
  return (
    <PageSection title={paginationPageTitle}>
      <p>Loading...</p>
    </PageSection>
  );
}
