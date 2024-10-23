import { revalidatePath } from "next/cache";

import { AssetType,ResponseType } from "@/components/custom/types/types";

import { backendUrl } from "@/constant/env";


export const getAssets = async (source = 'pagination', sorted = false): Promise<AssetType[]> => {
    'use server';

    const time = Date.now().toString();

    const response = await fetch(`${backendUrl}/assets?src=${source}&time=${time}`, {
        next: { revalidate: 0 }
      });
      const result: ResponseType<AssetType[]> = await response.json();

      const { data = []} = result;

      const sortedData = sorted ? [...data].sort((a, b) => a.Host.localeCompare(b.Host)) : result?.data;

      revalidatePath('/assets')
    
      return sortedData
}

export const getAssetById = async (id: string): Promise<AssetType> => {
    'use server';

    const response = await fetch(
        `${backendUrl}/assets?id=${id}&src=asset-details`,
        {
          cache: 'no-store',
        }
      );
      const assets: AssetType[] = await response.json();
      
      return assets[0];
}
