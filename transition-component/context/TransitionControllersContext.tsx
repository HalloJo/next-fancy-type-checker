import { Context, createContext, useContext } from 'react';
import { TransitionController } from '../types/transition.types';

export type TransitionControllersContextType = Set<TransitionController> | undefined;

export function createTransitionControllerContext(): {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  TransitionControllersContext: Context<TransitionControllersContextType>;
  useTransitionControllers: () => TransitionControllersContextType;
} {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const TransitionControllersContext = createContext<TransitionControllersContextType>(undefined);

  function useTransitionControllers(): TransitionControllersContextType {
    return useContext(TransitionControllersContext);
  }

  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    TransitionControllersContext,
    useTransitionControllers,
  };
}

export const {
  TransitionControllersContext: TransitionPresenceTransitionControllersContext,
  useTransitionControllers: useTransitionPresenceTransitionController,
} = createTransitionControllerContext();
