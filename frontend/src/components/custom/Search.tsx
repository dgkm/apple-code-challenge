'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useLocalStorage } from 'usehooks-ts';

export const searchParam = 'search';

export default function Search({
  placeholder,
  onChange,
}: Readonly<{ placeholder: string; onChange?: (term: string) => void }>) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [search, setSearch] = useLocalStorage(
    'searchTerm',
    searchParams.get(searchParam)?.toString(),
    {
      initializeWithValue: false,
    }
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set(searchParam, search);
      replace(`${pathname}?${params.toString()}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [replace, search, searchParams]);

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set(searchParam, term);
      setSearch(term);
      onChange && onChange(term);
    } else {
      params.delete(searchParam);
      onChange && onChange('');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <div className='relative flex flex-1 flex-shrink-0 m-2'>
      <label
        htmlFor='search'
        className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
      >
        Search
      </label>
      <input
        name='search'
        className='block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm h-15 text-gray-900 bg-gray-50 dark:bg-gray-900 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get(searchParam)?.toString() ?? search}
      />
    </div>
  );
}
