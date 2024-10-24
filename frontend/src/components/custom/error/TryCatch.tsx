import { ErrorInfo, ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorFallback } from './ErrorFallback';

interface TryCatchProps {
  children: ReactNode;
}

const logError = (error: Error, info: ErrorInfo) => {
  // eslint-disable-next-line no-console
  console.error(error, info);
};

export const TryCatch = ({ children }: TryCatchProps) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
      {children}
    </ErrorBoundary>
  );
};
