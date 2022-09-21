import { useIsServerSide } from './useIsServerSide';

export const useIsClientSide = (): boolean => !useIsServerSide();
