import { ForwardedRef, MutableRefObject, RefObject } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TransitionRef<T extends Element = any> =
  | RefObject<T>
  | MutableRefObject<T>
  | ForwardedRef<T>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TransitionRefArray<T extends Element = any> = RefObject<Array<TransitionRef<T>>>;

export type SetupTransitionSignature<
  T extends Record<string, TransitionRef>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  V extends Record<string, unknown> = any,
> = (timeline: gsap.core.Timeline, refs: T, variables: V) => void;

export type TransitionDirection = 'in' | 'out';

export interface SetupTimelineOptions {
  direction: TransitionDirection;
  reset?: boolean;
}

export interface TransitionOptionEventHandlers<T = TransitionDirection> {
  onStart?: (direction: T) => void;
  onComplete?: (direction: T) => void;
  onUpdate?: (timeline: gsap.core.Timeline) => void;
}

export interface TransitionOptions extends TransitionOptionEventHandlers {
  reset?: boolean;
}

export interface TransitionOptionsWithDirection extends TransitionOptions {
  direction: TransitionDirection;
}

export interface TransitionController {
  ref: TransitionRef;
  getTimeline(
    direction: TransitionDirection,
    setupIfNeeded?: boolean,
    fallbackToInTimeline?: boolean,
  ): gsap.core.Timeline | undefined;
  setupTimeline(options?: SetupTimelineOptions): gsap.core.Timeline;
  transition(options: TransitionOptionsWithDirection): Promise<void>;
  transitionIn(options?: TransitionOptions): Promise<void>;
  transitionOut(options?: TransitionOptions): Promise<void>;
}

export interface SetupTransitionOptions<T, V> extends TransitionOptionEventHandlers {
  ref: TransitionRef;
  refs?: T;
  timelineVariables?: () => gsap.TimelineVars;
  setupVariables?: V;
  setupTransitionInTimeline?: (timeline: gsap.core.Timeline, refs: T, variables: V) => void;
  setupTransitionOutTimeline?: (timeline: gsap.core.Timeline, refs: T, variables: V) => void;
}
