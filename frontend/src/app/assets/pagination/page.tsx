import { getAssets } from '@/lib/api';

import { AssetItem } from '@/components/custom/assets/AssetItem';
import { PageSection } from '@/components/custom/page/PageSection';

import { paginationPageTitle } from '@/constant/constants';

export const dynamic = 'force-dynamic';

export default async function PaginationPage() {
  const assets = await getAssets('pagination', true);

  const renderedData = assets.map((item) => {
    return <AssetItem key={item.ID} item={item} />;
  });

  return (
    <PageSection title={paginationPageTitle}>
      <div>{renderedData}</div>
    </PageSection>
  );
}
