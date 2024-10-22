import { getAssets } from '@/lib/api';

import { AssetItem } from '@/components/custom/assets/AssetItem';
import { PageSection } from '@/components/custom/page/PageSection';

import { infinitePageTitle } from '@/constant/constants';

export const dynamic = 'force-dynamic';
export const fetchCache = 'default-no-store';

export default async function InfinitePage() {
  const assets = await getAssets('infinite');

  const renderedData = assets.map((item) => {
    return <AssetItem key={item.ID} item={item} />;
  });

  return (
    <PageSection title={infinitePageTitle}>
      <div>{renderedData}</div>
    </PageSection>
  );
}
