import type { ForwardedRef, MutableRefObject, RefObject } from 'react';
import { TransitionRef, TransitionRefArray } from '../types/transition.types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TransitionRefRecord = Record<string, TransitionRef | TransitionRefArray>;

type TransitionRefRecordValues<T extends TransitionRefRecord> = {
  [P in keyof T]: TransitionRefValue<T[P]>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MutableRefObjectValue<T extends MutableRefObject<any>> = T extends MutableRefObject<infer A>
  ? A
  : never;

type TransitionRefValue<T extends TransitionRef | TransitionRefArray> =
  T extends TransitionRefArray<infer A>
    ? Array<A>
    : T extends RefObject<infer A>
    ? A
    : T extends MutableRefObject<infer A>
    ? A
    : // eslint-disable-next-line @typescript-eslint/no-explicit-any
    T extends ForwardedRef<any>
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      MutableRefObjectValue<Extract<T, MutableRefObject<any>>>
    : never;

/**
 * Unwraps react refs in object
 * @param refs
 * @returns
 */
export function unwrapRefs<T extends TransitionRefRecord>(refs: T): TransitionRefRecordValues<T> {
  return Object.keys(refs).reduce((accumulator, key: keyof T) => {
    const value = refs[key];

    if (typeof value === 'object' && value !== null && 'current' in value) {
      const typedValue = value as
        | MutableRefObject<Element | Array<MutableRefObject<Element>>>
        | RefObject<Element | Array<MutableRefObject<Element>>>;

      if (Array.isArray(typedValue.current)) {
        accumulator[key] = typedValue.current.map((ref) => ref.current);
      } else {
        accumulator[key] = typedValue.current as Element;
      }
    }

    return accumulator;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {} as TransitionRefRecordValues<any>);
}
