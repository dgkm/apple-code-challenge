import { PageSection } from '@/components/custom/page/PageSection';

import { paginationPageTitle } from '@/constant/constants';

import PaginationPageContent from './PaginationPageContent';

// export const dynamic = 'force-dynamic';

export default async function PaginationPage(
  props: Readonly<{
    searchParams?: Promise<{
      search?: string;
      page?: string;
    }>;
  }>
) {
  const searchParams = await props.searchParams;
  const searchTerm = searchParams?.search ?? '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <PageSection title={paginationPageTitle}>
      <PaginationPageContent pageNumber={currentPage} searchTerm={searchTerm} />
    </PageSection>
  );
}
