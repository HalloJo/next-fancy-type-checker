import { useMemo } from 'react';
import { useIsomorphicLayoutEffect } from 'react-use';
import { SetupTransitionOptions, TransitionController } from '../types/transition.types';
import { createTransitionController } from '../utils/transition.utils';
import {
  registerTransitionController,
  unregisterTransitionController,
} from '../context/TransitionControllers';

export function useTransitionController<T, V>(
  setupOptions: SetupTransitionOptions<T, V>,
  dependencies?: ReadonlyArray<unknown>,
): TransitionController {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const controller = useMemo(() => createTransitionController(setupOptions), dependencies ?? []);

  useIsomorphicLayoutEffect(() => {
    registerTransitionController(controller);

    return () => {
      controller.getTimeline('in')?.kill();
      controller.getTimeline('out')?.kill();

      unregisterTransitionController(controller);
    };
  }, [controller]);

  return controller;
}
