'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';

import { AssetItem } from '@/components/custom/assets/AssetItem';
import { PageSection } from '@/components/custom/page/PageSection';

export default function DefaultPage() {
  const [data, setData] = useState<any[]>([]);
  const [sortedData, setSortedData] = useState<any[]>([]);
  const [isSorting, setIsSorting] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8080/assets');
        const result = await response.json();

        setData(result);
        sortData(result); // Automatically sort after fetching
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }

    fetchData();
  }, []);

  const sortData = (fetchedData: any[]) => {
    setIsSorting(true);
    setTimeout(() => {
      const newSortedData = [...fetchedData].sort((a, b) =>
        a.Host.localeCompare(b.Host)
      );
      setSortedData(newSortedData);
      setIsSorting(false);
    }, 100); // Artificial delay to slow down sorting
  };

  const renderedData = sortedData.map((item) => {
    return <AssetItem key={item.ID} item={item} />;
  });

  return (
    <PageSection title='Loading Assets by Pagination'>
      {sortedData.length === 0 ? (
        <p>{isSorting ? 'Sorting...' : 'Loading...'}</p>
      ) : (
        <div>{renderedData}</div>
      )}
    </PageSection>
  );
}
