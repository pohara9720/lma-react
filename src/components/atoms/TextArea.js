import React from 'react'
import { Field } from 'redux-form'

const custom = ({
    input,
    label: selectLabel,
    className = "form-control",
    meta: { touched, error },
    ...rest
}) => {
    return (
        <>
            {selectLabel && <label>{selectLabel}</label>}
            <textarea {...input} className={className} {...rest} />
            {touched && error && <p style={{ color: 'red' }}>{error}</p>}
        </>
    )
}

export const TextArea = (props) => <Field component={custom} {...props} />