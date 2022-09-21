import { useIsomorphicLayoutEffect } from 'react-use';
import { noop } from 'lodash-es';
import { useTransitionPresenceTransitionControllers } from '../components/TransitionPresence';
import { TransitionController } from '../types/transition.types';

/**
 * Creates gsap.core.Timeline that will start before component is unmounted
 *
 * @example
 * const myRef = useRef<HTMLDivElement>(null);
 *
 * const controller = useTransitionController({
 *   ref: myRef,
 *   refs: {
 *     myRef,
 *   },
 *   setupTransitionInTimeline(timeline, { myRef }) { ... },
 *   setupTransitionInTimeline(timeline, { myRef }) { ... },
 * });
 *
 * // Connect the transitionController to the lifecycle
 * useLeaveTransition(transitionController);
 */
export function useLeaveTransition(transitionController: TransitionController | undefined): void {
  const leaveTransitions = useTransitionPresenceTransitionControllers();

  if (!leaveTransitions) {
    throw new Error(
      'Cannot find leaveTransitions context! Did you forget to wrap the component in a <TransitionPresence />?',
    );
  }

  useIsomorphicLayoutEffect(() => {
    if (!transitionController) {
      return noop;
    }

    leaveTransitions.add(transitionController);

    return () => {
      leaveTransitions.delete(transitionController);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transitionController]);
}
