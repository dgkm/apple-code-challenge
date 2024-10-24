'use client';

import * as React from 'react';

import { PageSection } from '@/components/custom/page/PageSection';

import { Changes } from '@/improvements/Changes';

export default function HomePage() {
  return (
    <PageSection title='Identified Improvements or Implemented Changes'>
      <Changes />
    </PageSection>
  );
}
