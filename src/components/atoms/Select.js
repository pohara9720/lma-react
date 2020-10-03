import React from 'react'
import { Field } from 'redux-form'


export const SelectRaw = ({
    input,
    options,
    label: selectLabel,
    defaultValue,
    meta: { touched, error },
    manualErrors,
    ...rest
}) => {
    const message = manualErrors && manualErrors.find(x => x.name === input.name)
    return (
        <>
            {selectLabel && <label>{selectLabel}</label>}
            <select className="form-control" {...input} {...rest}>
                {
                    options.map(({ id, label }, i) => <option defaultValue={defaultValue || options[0].id} key={i} value={id}>{label}</option>)
                }
            </select>
            {touched && error && <p style={{ color: 'red' }}>{error}</p>}
            {message && message.message && <p style={{ color: 'red' }}>{message.message}</p>}
        </>
    )
}

export const Select = (props) => <Field component={SelectRaw} {...props} />

