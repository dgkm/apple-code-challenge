'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';

import { AssetItem } from '@/components/assets/Asset';

import Logo from '~/svg/Logo.svg';

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
    <main>
      <section className='bg-white'>
        <div className='flex min-h-screen flex-col items-center text-center'>
          <div className='flex justify-center text-3xl font-bold'>
            <Logo className='w-10' />
            <span>Code challenge (Loading by Pagination)</span>
          </div>
          <div className='mt-8 w-full max-w-2xl mx-auto bg-gray-100 p-4'>
            {sortedData.length === 0 ? (
              <p>{isSorting ? 'Sorting...' : 'Loading...'}</p>
            ) : (
              <div>{renderedData}</div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
