import { useState } from 'react';

export const useIsServerSide = (): boolean => {
  const [isServerSide] = useState(typeof window === 'undefined');

  return isServerSide;
};
