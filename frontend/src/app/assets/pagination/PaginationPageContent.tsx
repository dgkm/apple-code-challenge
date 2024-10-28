import { getAssets } from '@/lib/api.server';

import Pagination from '@/components/custom/Pagination';
import Search from '@/components/custom/Search';
import { AssetItem } from '@/components/custom/types/AssetItem';

export const dynamic = 'force-dynamic';
export const fetchCache = 'default-no-store';

interface PaginationPageContentProps {
  pageNumber?: number;
  searchTerm?: string;
  pageKey?: string;
}

export default async function PaginationPageContent({
  pageNumber,
  searchTerm,
}: Readonly<PaginationPageContentProps>) {
  const time = Date.now().toString();

  const {
    data: assets = [],
    metadata: { total },
  } = await getAssets({
    page: pageNumber,
    search: searchTerm,
    time,
  });

  const renderedData = assets.map((item) => {
    return <AssetItem key={item.ID} item={item} />;
  });

  const pagination = (
    <div className='mt-5 flex w-full justify-center m-5'>
      <Pagination
        totalPages={Math.floor(total / 10) + 1}
        totalRecords={total}
      />
    </div>
  );

  return (
    <>
      <Search placeholder='Host Search' />
      {pagination}
      <div>{renderedData}</div>
      {pagination}
    </>
  );
}
