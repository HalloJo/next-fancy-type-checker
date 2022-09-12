import classNames from "classnames"
import { forwardRef, ReactElement } from "react"
import styles from './Logo.module.scss'

const Logo = forwardRef<HTMLDivElement>((props, ref):ReactElement => {
    
    return (
        <div className={styles.logo} ref={ref}>
            <p className={classNames(styles.logoPart, "logoPart")}>Next</p>
            <p className={classNames(styles.logoPart, "logoPart")}>Fancy</p>
            <p className={classNames(styles.logoPart, "logoPart")}>Type</p>
            <p className={classNames(styles.logoPart, "logoPart")}>Checker</p>
        </div>
    )
})

export default Logo