import Router from 'next/router';
import { useEffect } from 'react';

const onRouteChange = () => {
  // eslint-disable-next-line no-restricted-properties
  const allStyleElems = document.querySelectorAll('style[media="x"]');
  allStyleElems.forEach((element) => {
    element.removeAttribute('media');
  });
};

export const useTransitionFix = (): void => {
  useEffect(() => {
    Router.events.on('routeChangeComplete', onRouteChange);
    Router.events.on('routeChangeStart', onRouteChange);

    return () => {
      Router.events.off('routeChangeComplete', onRouteChange);
      Router.events.off('routeChangeStart', onRouteChange);
    };
  }, []);
};
