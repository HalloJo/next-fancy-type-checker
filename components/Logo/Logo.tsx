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
  const firstLineRef = useRef<HTMLParagraphElement>(null)
  const secondLineRef = useRef<HTMLParagraphElement>(null)
  const thirdLineRef = useRef<HTMLParagraphElement>(null)
  const fourthLineRef = useRef<HTMLParagraphElement>(null)

  const transitionController = useTransitionController(({
    ref: elementRef,
    refs: {
      elementRef,
      firstLineRef,
      secondLineRef,
      thirdLineRef,
      fourthLineRef
    },
    setupTransitionInTimeline,
  }));

  useEnterTransition(transitionController)
    
    return (
        <div className={styles.logo} ref={elementRef}>
            <p className={classNames(styles.logoPart)} ref={firstLineRef}>Next</p>
            <p className={classNames(styles.logoPart)} ref={secondLineRef}>Fancy</p>
            <p className={classNames(styles.logoPart)} ref={thirdLineRef}>Type</p>
            <p className={classNames(styles.logoPart)} ref={fourthLineRef}>Checker</p>
        </div>
    )
})

export default Logo