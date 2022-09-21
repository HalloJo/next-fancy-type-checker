import type { RefObject } from 'react';
import { useIsomorphicLayoutEffect } from 'react-use';
import { useRef } from 'react';

export function useIsMounted(): RefObject<boolean> {
  const isMounted = useRef(true);

  useIsomorphicLayoutEffect(
    () => () => {
      isMounted.current = false;
    },
    [],
  );

  return isMounted;
}
