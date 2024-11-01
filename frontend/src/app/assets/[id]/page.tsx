'use server';

import { notFound } from 'next/navigation';

import { getAssetById } from '@/lib/api.server';

import { PageSection } from '@/components/custom/page/PageSection';
import { AssetItem } from '@/components/custom/types/AssetItem';
import { AssetType } from '@/components/custom/types/types';

import { detailsPageTitle } from '@/constant/constants';

type AssetDetailsParams = Promise<{ id: string }>;

interface AssetDetailsPageProps {
  params: AssetDetailsParams;
}

export default async function AssetDetailsPage({
  params,
}: Readonly<AssetDetailsPageProps>) {
  'use server';

  const { id } = await params;
  const asset: AssetType = await getAssetById(id);

  if (!asset) {
    return notFound();
  }

  const renderedData = <AssetItem item={asset} link={false} />;

  return (
    <PageSection title={`${detailsPageTitle}${id} - ${asset.Host}`}>
      <div>{renderedData}</div>
    </PageSection>
  );
}
