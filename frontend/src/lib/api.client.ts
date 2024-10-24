import { AssetType, ResponseType } from '@/components/custom/types/types';

import { backendUrl } from '@/constant/env';

interface QueryOptions {
  page?: number;
  size?: number;
  search?: string;
}

export const getAssetsClient = async ({
  page = 1,
  size = 10,
  search,
}: QueryOptions): Promise<ResponseType<AssetType[]>> => {
  'use client';

  const response = await fetch(
    `${backendUrl}/assets?page=${page}&size=${size}${
      search ? '&search=' + search : ''
    }`,
    {
      next: { revalidate: 0 },
    }
  );

  if (response.status != 200) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  const result: ResponseType<AssetType[]> = await response.json();

  return result;
};
