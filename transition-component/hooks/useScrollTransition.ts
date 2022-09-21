import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMemo } from 'react';
import { useIsomorphicLayoutEffect } from 'react-use';
import {
  SetupTransitionOptions,
  TransitionController,
  TransitionRef,
} from '../types/transition.types';
import { unwrapRefs } from '../lib/unwrapRefs';
import { useTransitionController } from './useTransitionController';

gsap.registerPlugin(ScrollTrigger);

export function useScrollTransition<T, V>(
  triggerRef: TransitionRef<HTMLElement>,
  scrollTriggerOptions: Omit<ScrollTrigger.Vars, 'trigger'>,
  setupOptions: Omit<SetupTransitionOptions<T, V>, 'setupTransitionOutTimeline'>,
): TransitionController {
  const mergedSetupOptions = useMemo(
    () => ({
      ...setupOptions,
      // eslint-disable-next-line unicorn/prevent-abbreviations
      timelineVariables: () => {
        const { trigger } = unwrapRefs({ trigger: triggerRef });

        return {
          ...setupOptions.timelineVariables?.(),
          scrollTrigger: {
            trigger,
            markers: true,
            ...scrollTriggerOptions,
          },
        };
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const transitionController = useTransitionController(mergedSetupOptions);

  useIsomorphicLayoutEffect(() => {
    transitionController.setupTimeline({ direction: 'in' });
  }, []);

  return transitionController;
}
