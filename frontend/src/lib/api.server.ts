import { AssetType, ResponseType } from '@/components/custom/types/types';

import { backendUrl } from '@/constant/env';

interface QueryOptions {
  page?: number;
  size?: number;
  search?: string;
  time?: string;
}

export const getAssets = async ({
  page = 1,
  size = 10,
  search,
  time,
}: QueryOptions): Promise<ResponseType<AssetType[]>> => {
  'use server';

  const response = await fetch(
    `${backendUrl}/assets?page=${page}&size=${size}${
      search ? '&search=' + search : ''
    }${time ? '&time=' + time : ''}`,
    {
      // : { revalidate: 0 },
      cache: 'no-cache',
    }
  );

  if (response.status != 200) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  const result: ResponseType<AssetType[]> = await response.json();

  return result;
};

export const getAssetById = async (id: string): Promise<AssetType> => {
  'use server';

  const response = await fetch(`${backendUrl}/assets/${id}`, {
    cache: 'no-store',
  });

  if (response.status != 200) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  const result: ResponseType<AssetType[]> = await response.json();

  const { data = [] } = result;
  return data[0];
};
