import classNames from "classnames"
import { unwrapRefs } from '../../transition-component/lib/unwrapRefs';
import { forwardRef, ReactElement } from "react"
import styles from './Logo.module.scss'

import { useRef} from 'react';
import { useTransitionController } from '../../transition-component/hooks/useTransitionController';
import { useEnterTransition } from '../../transition-component/hooks/useEnterTransition';
import { setupTransitionInTimeline } from './Logo.transitions';


const Logo = forwardRef<HTMLDivElement>((props, ref):ReactElement => {
  const elementRef = useRef<HTMLDivElement>(null)

  const transitionController = useTransitionController(({
    ref: elementRef,
    refs: {
      elementRef,
    },
    setupTransitionInTimeline,
  }));

  useEnterTransition(transitionController)
    
    return (
        <div className={styles.logo} ref={elementRef}>
            <p className={classNames(styles.logoPart)}>Next</p>
            <p className={classNames(styles.logoPart)}>Fancy</p>
            <p className={classNames(styles.logoPart)}>Type</p>
            <p className={classNames(styles.logoPart)}>Checker</p>
        </div>
    )
})

export default Logo