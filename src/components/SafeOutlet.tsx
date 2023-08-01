import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

import ErrorMessage from './ErrorMessage';

export function SafeOutlet() {
  return (
    <ErrorBoundary fallback={<ErrorMessage />}>
      <Outlet />
    </ErrorBoundary>
  );
}
