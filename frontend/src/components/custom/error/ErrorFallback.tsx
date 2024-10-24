'use client';

import { useErrorBoundary } from 'react-error-boundary';

interface ErrorFallbackProps {
  error: Error;
}

export const ErrorFallback = ({ error }: ErrorFallbackProps) => {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div role='alert'>
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <button onClick={resetBoundary}>Try again</button>
    </div>
  );
};
