import {
  Attributes,
  ForwardedRef,
  forwardRef,
  ForwardRefExoticComponent,
  MutableRefObject,
  PropsWithChildren,
  PropsWithoutRef,
  ReactElement,
  RefObject,
  useRef,
} from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
interface ForwardRefRenderFunction<T, P = {}> {
  (props: P, ref: RefObject<T> | MutableRefObject<T>): ReactElement | null;
  displayName?: string | undefined;
  // explicit rejected with `never` required due to
  // https://github.com/microsoft/TypeScript/issues/36826
  /**
   * defaultProps are not supported on render functions
   */
  defaultProps?: never | undefined;
  /**
   * propTypes are not supported on render functions
   */
  propTypes?: never | undefined;
}

export default function useEnsuredForwardedRef<T>(
  ref?: ForwardedRef<T>,
): MutableRefObject<T> | RefObject<T> {
  const ensuredRef = useRef<T>(null);

  return ref && 'current' in ref ? ref : ensuredRef;
}

interface RefAttributes<T> extends Attributes {
  ref?: RefObject<T> | MutableRefObject<T> | null | undefined;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function ensuredForwardRef<T, P = {}>(
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Component: ForwardRefRenderFunction<T, P>,
): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>> {
  return forwardRef((props: PropsWithChildren<P>, ref) => {
    const ensuredRef = useEnsuredForwardedRef(ref);
    return Component(props, ensuredRef);
  }) as ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>;
}
