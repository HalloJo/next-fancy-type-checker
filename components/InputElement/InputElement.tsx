import React, { forwardRef, ReactElement } from 'react'
import styles from './InputElement.module.scss'

type InputProps = {
    label: string,
    forLabel: string,
    value: string,
    onChange: (value: string) => void
}

const InputElement = forwardRef<HTMLDivElement, InputProps>((props, ref): ReactElement => {

    const {forLabel, label, value, onChange} = props

    return (
        <div className={styles.inputElement}>
            <label className={styles.inputElement__label} htmlFor={forLabel}>{label}</label>
            <input type="text" placeholder='Type something here..' value={value} maxLength={90} onChange={(event) => onChange(event.target.value)}/>
        </div>
    )
})

export default InputElement