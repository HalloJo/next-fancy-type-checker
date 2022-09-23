import React, { forwardRef, ReactElement } from 'react'
import InputElement from '../InputElement/InputElement'
import Logo from '../Logo/Logo'
import styles from './OutputOptions.module.scss'

type OutputOptionsProps = {
    output: string,
    onChange: (value: string) => void
}

const OutputOptions = forwardRef<HTMLMenuElement, OutputOptionsProps>((props, ref): ReactElement => {

    const {output, onChange} = props

    return (
        <menu className={styles.outputOptions}>
            <Logo />
            <InputElement label='Demo text' forLabel='Demo text' value={output} onChange={(output)=>onChange(output)}/>
        </menu>
    )
})

export default OutputOptions