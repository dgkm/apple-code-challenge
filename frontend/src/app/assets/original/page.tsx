'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';

import { AssetType, IPType, PortType } from '@/components/custom/types/types';
import ButtonLink from '@/components/links/ButtonLink';

import { backendUrl } from '@/constant/env';

import Logo from '~/svg/Logo.svg';

export default function HomePage() {
  const [sortedData, setSortedData] = useState<AssetType[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setError(false);
        const response = await fetch(
          `${backendUrl}/assets/original?page=1&size=10000`
        );

        const result = await response.json();

        sortData(result?.data); // Automatically sort after fetching
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error fetching data:', err);
        sortData([]);
        setError(true);
      }
    }

    fetchData();
  }, []);

  const sortData = (fetchedData: AssetType[]) => {
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
    return (
      <div key={item.ID} className='p-4'>
        <p>{`ID: ${item.ID}`}</p>
        <p>{`Host: ${item.Host}`}</p>
        <p>{`Comment: ${item.Comment}`}</p>
        <p>{`Owner: ${item.Owner}`}</p>
        <p>{`IPs: ${(item.IPs || [])
          .map((ip: IPType) => ip.Address)
          .join(', ')}`}</p>
        <p>{`Ports: ${(item.Ports || [])
          .map((port: PortType) => port.Port)
          .join(', ')}`}</p>
      </div>
    );
  });

  return (
    <main>
      <section className='bg-white'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <Logo className='w-16' />
          <h1 className='mt-4'>Code challenge</h1>

          <p className='mt-2 text-sm text-gray-800'>
            You have complete freedom to present the data here.
          </p>

          <ButtonLink className='mt-6' href='/components' variant='light'>
            See all included components
          </ButtonLink>

          {!error ? (
            <div className='mt-8 w-full max-w-2xl mx-auto bg-gray-100 p-4'>
              <div className='text-lg'>Total Loaded: {sortedData.length}</div>
              {sortedData.length === 0 ? (
                <p>{isSorting ? 'Sorting...' : 'Loading...'}</p>
              ) : (
                <div>{renderedData}</div>
              )}
            </div>
          ) : (
            <div className='m-5 font-bold text-red-500'>
              API data loading error occoured... (client)
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
