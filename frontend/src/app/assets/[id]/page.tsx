'use server';

import { notFound } from 'next/navigation';

import { getAssetById } from '@/lib/api';

import { AssetType } from '@/components/custom/assets/asset.types';
import { AssetItem } from '@/components/custom/assets/AssetItem';
import { PageSection } from '@/components/custom/page/PageSection';

import { detailsPageTitle } from '@/constant/constants';

interface AssetDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function AssetDetailsPage({
  params,
}: AssetDetailsPageProps) {
  'use server';

  const { id } = params;
  const asset: AssetType = await getAssetById(id);

  if (!asset) {
    return notFound();
  }

  const renderedData = <AssetItem item={asset} />;

  return (
    <PageSection title={`${detailsPageTitle}${id}`}>
      <div>{renderedData}</div>
    </PageSection>
  );
}
