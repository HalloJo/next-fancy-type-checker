import React, { forwardRef, ReactElement } from 'react'
import Logo from '../Logo/Logo'
import styles from './OutputOptions.module.scss'

const OutputOptions = forwardRef<HTMLMenuElement>((props, ref): ReactElement => {
    return (
        <menu className={styles.outputOptions}>
            <Logo />
        </menu>
    )
})

export default OutputOptions