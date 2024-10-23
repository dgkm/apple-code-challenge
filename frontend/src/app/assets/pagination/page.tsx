import { getAssets } from '@/lib/api';

import { PageSection } from '@/components/custom/page/PageSection';
import Pagination from '@/components/custom/Pagination';
import Search from '@/components/custom/Search';
import { AssetItem } from '@/components/custom/types/AssetItem';

import { paginationPageTitle } from '@/constant/constants';

export const dynamic = 'force-dynamic';

export default async function PaginationPage(
  props: Readonly<{
    searchParams?: Promise<{
      search?: string;
      page?: string;
    }>;
  }>
) {
  const searchParams = await props.searchParams;
  const search = searchParams?.search ?? '';
  const currentPage = Number(searchParams?.page) || 1;

  const {
    data: assets = [],
    metadata: { total },
  } = await getAssets({
    page: currentPage,
    search,
  });

  const renderedData = assets.map((item) => {
    return <AssetItem key={item.ID} item={item} />;
  });

  return (
    <PageSection title={paginationPageTitle}>
      <Search placeholder='Host Search' />
      <div className='mt-5 flex w-full justify-center m-5'>
        <Pagination totalPages={Math.floor(total / 10) + 1} />
      </div>
      <div>{renderedData}</div>
      <div className='mt-5 flex w-full justify-center m-5'>
        <Pagination totalPages={Math.floor(total / 10) + 1} />
      </div>
    </PageSection>
  );
}
