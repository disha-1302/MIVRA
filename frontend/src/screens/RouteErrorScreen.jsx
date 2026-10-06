import { useEffect } from 'react';
import { useRouteError } from 'react-router-dom';
import { RenderErrorFallback } from '../components/ErrorBoundary';

const RouteErrorScreen = () => {
  const error = useRouteError();
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') console.error('MIVRA route error', error);
    else console.error('MIVRA route error; reload the page to recover.');
  }, [error]);
  return <RenderErrorFallback />;
};
export default RouteErrorScreen;
