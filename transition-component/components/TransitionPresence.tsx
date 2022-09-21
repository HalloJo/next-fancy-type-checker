import type { PropsWithChildren, ReactElement, ReactNode } from 'react';
import { useMemo, useState, cloneElement, useRef, Children, Fragment } from 'react';
import { useIsomorphicLayoutEffect } from 'react-use';
import { noop } from 'lodash-es';
import { useIsMounted } from '../../hooks/useIsMounted';
import { killTransitionControllersTimelines } from '../lib/killTransitionControllersTimelines';
import { createTransitionControllerContext } from '../context/TransitionControllersContext';
import { TransitionController } from '../types/transition.types';

// eslint-disable-next-line @typescript-eslint/naming-convention
const { TransitionControllersContext, useTransitionControllers } =
  createTransitionControllerContext();

export const useTransitionPresenceTransitionControllers = useTransitionControllers;

const addKeyToChildren = (children: ReactNode, key: number) => {
  const count = Children.count(children);

  if (!children || count === 0) return children;

  if (Children.count(children) === 1) {
    return cloneElement(children as ReactElement, { key });
  }

  return <Fragment key={key}>{children}</Fragment>;
};

export interface TransitionPresenceProps {
  fragment: string | number;
  crossFlow?: boolean;
}

/**
 * Will transition out old children before replacing with new children
 */
export function TransitionPresence({
  children,
  fragment,
  crossFlow,
}: PropsWithChildren<TransitionPresenceProps>): ReactElement {
  const keyRef = useRef(1);
  const transitionControllers = useMemo(() => new Set<TransitionController>(), []);
  const [delayedChildren, setDelayedChildren] = useState<ReactNode>(children);
  const [transitionInProgress, setTransitionInProgress] = useState(false);
  const [currentFragment, setCurrentFragment] = useState(fragment);
  const [crossFlowChildren, setCrossFlowChildren] = useState<ReactNode>(null);

  const isMounted = useIsMounted();

  useIsomorphicLayoutEffect(() => {
    if (fragment === currentFragment) {
      if (!transitionInProgress) {
        setDelayedChildren(children);
        setCrossFlowChildren(null);
      }

      return noop;
    }

    const outTransitionControllers = new Set<TransitionController>(transitionControllers);

    let isTransitionFinished = false;

    setTransitionInProgress(true);

    const finishTransition = () => {
      if (!isTransitionFinished) {
        isTransitionFinished = true;

        killTransitionControllersTimelines(outTransitionControllers);

        // Only update children when component is still mounted. Component can
        // unmount while async function is awaiting the transition promise.
        if (isMounted.current) {
          keyRef.current += 1;
          setCurrentFragment(fragment);
          setTransitionInProgress(false);
          setDelayedChildren(children);
          setCrossFlowChildren(null);
        }
      }
    };

    (async () => {
      const timelines = Array.from(transitionControllers).map((leaveTransitionController) =>
        leaveTransitionController.transitionOut(),
      );

      if (crossFlow) {
        setCrossFlowChildren(children);
      }

      await Promise.all(timelines);

      if (!isTransitionFinished) {
        finishTransition();
      }
    })();

    return finishTransition;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, delayedChildren, fragment, currentFragment]);

  return (
    <TransitionControllersContext.Provider value={transitionControllers}>
      {addKeyToChildren(delayedChildren, keyRef.current)}
      {addKeyToChildren(crossFlowChildren, keyRef.current + 1)}
    </TransitionControllersContext.Provider>
  );
}
