import { forwardRef, ReactElement } from "react"
import styles from './Logo.module.scss'

const Logo = forwardRef<HTMLDivElement>((props, ref):ReactElement => {
    
    return (
        <div className={styles.logo} ref={ref}>
            <p className={styles.logoPart}>Next</p>
            <p className={styles.logoPart}>Fancy</p>
            <p className={styles.logoPart}>Type</p>
            <p className={styles.logoPart}>Checker</p>
        </div>
    )
})

export default Logo