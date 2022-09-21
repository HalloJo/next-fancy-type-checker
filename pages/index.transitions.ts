import type {
  SetupTransitionSignature,
  TransitionRef,
} from "../transition-component/types/transition.types";
import { unwrapRefs } from "../transition-component/lib/unwrapRefs";

type TransitionRefs = {
  elementRef: TransitionRef<HTMLDivElement>;
};

export const setupTransitionInTimeline: SetupTransitionSignature<
  TransitionRefs
> = () => {};

export const setupTransitionOutTimeline: SetupTransitionSignature<
  TransitionRefs
> = () => {
  // TODO: add a timeline here
};
