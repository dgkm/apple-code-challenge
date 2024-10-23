import { revalidatePath } from "next/cache";

import { AssetType,ResponseType } from "@/components/custom/types/types";

import { backendUrl } from "@/constant/env";

interface QueryOptions {
  page?: number;
  size?: number;
  search?: string;
}

export const getAssets = async ({page = 1, size = 10, search}: QueryOptions): Promise<ResponseType<AssetType[]>> => {
    'use server';

    const response = await fetch(`${backendUrl}/assets?page=${page}&size=${size}${search ? '&search=' + search : ''}`, {
        next: { revalidate: 0 }
      });
      const result: ResponseType<AssetType[]> = await response.json();

      revalidatePath('/assets')
    
      return result
}

export const getAssetById = async (id: string): Promise<AssetType> => {
    'use server';

    const response = await fetch(
        `${backendUrl}/assets/${id}`,
        {
          cache: 'no-store',
        }
      );
      const result: ResponseType<AssetType[]> = await response.json();

      const { data = []} = result;
      return data[0];
}
