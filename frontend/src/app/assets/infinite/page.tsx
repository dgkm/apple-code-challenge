import { getAssets } from '@/lib/api';

import { PageSection } from '@/components/custom/page/PageSection';
import { AssetItem } from '@/components/custom/types/AssetItem';

import { infinitePageTitle } from '@/constant/constants';

export const dynamic = 'force-dynamic';
export const fetchCache = 'default-no-store';

export default async function InfinitePage() {
  const { data: assets = [] } = await getAssets({});

  const renderedData = assets.map((item) => {
    return <AssetItem key={item.ID} item={item} />;
  });

  return (
    <PageSection title={infinitePageTitle}>
      <div>{renderedData}</div>
    </PageSection>
  );
}
