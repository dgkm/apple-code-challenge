'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useLocalStorage } from 'usehooks-ts';

import { getAssetsClient } from '@/lib/api.client';

import { PageSection } from '@/components/custom/page/PageSection';
import Search from '@/components/custom/Search';
import { AssetItem } from '@/components/custom/types/AssetItem';
import { AssetType } from '@/components/custom/types/types';

import { infinitePageTitle } from '@/constant/constants';

export default function InfinitePage() {
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [assets, setAssets] = useState<AssetType[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [search, setSearch] = useLocalStorage('searchTerm', '', {
    initializeWithValue: false,
  });

  const { ref, inView } = useInView();

  const handleSearch = (term: string) => {
    setSearch(term);
  };

  const initLoadAssets = async () => {
    try {
      setError(false);
      const {
        data = [],
        metadata: { total },
      } = await getAssetsClient({
        page: page,
        search: search,
      });

      setAssets(data);
      setPage(1);
      setTotalRecords(total);
    } catch (e) {
      setError(true);
    }
  };

  const loadMoreAssets = async () => {
    try {
      setError(false);
      const {
        data = [],
        metadata: { total },
      } = await getAssetsClient({
        page: page,
        search: search,
      });

      setAssets((assets) => [...assets, ...data]);
      setPage((page) => page + 1);
      setTotalRecords(total);
    } catch (e) {
      setError(true);
    }
  };

  useEffect(() => {
    initLoadAssets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    if (inView && page < totalRecords / 10) {
      loadMoreAssets();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const renderedData = assets.map((item) => {
    return <AssetItem key={item.ID} item={item} />;
  });

  const totalLoaded = (
    <div className='m-6'>
      Total Loaded: {assets?.length} of {totalRecords}
    </div>
  );

  return (
    <PageSection title={infinitePageTitle}>
      {!error ? (
        <>
          <Search placeholder='Host Search' onChange={handleSearch} />
          {totalLoaded}
          <div>{renderedData}</div>
          <div ref={ref}>Loading...</div>
          {totalLoaded}
        </>
      ) : (
        <div className='m-5 font-bold text-red-500'>
          API data loading error occoured... (client)
        </div>
      )}
    </PageSection>
  );
}
