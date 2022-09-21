import * as React from 'react';
import { forwardRef, ReactElement } from "react"
import styles from './Output.module.scss'

type OutputProps = {
    output: string
}

const Output = forwardRef<HTMLDivElement, OutputProps>(({output}, ref):ReactElement => {
    

    return (
        <div className={styles.output} ref={ref}>
            <h1 className={styles.outputText}>{output}</h1>
        </div>
    )
})

export default Output