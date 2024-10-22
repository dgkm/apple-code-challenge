import { PageSection } from '@/components/custom/page/PageSection';

import { infinitePageTitle } from '@/constant/constants';

export default function InfiniteLoadingPage() {
  return (
    <PageSection title={infinitePageTitle}>
      <p>Loading...</p>
    </PageSection>
  );
}
