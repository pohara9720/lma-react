import React from 'react'
import { Field } from 'redux-form'

export const custom = ({
    input,
    type = 'text',
    placeholder,
    id,
    label,
    meta: { touched, error },
    className = "form-group",
    manualErrors,
    ...rest
}) => {
    const message = manualErrors && manualErrors.find(x => x.name === input.name)
    return (
        <div className={className}>
            {label && <label htmlFor={id}>{label}</label>}
            <input {...input} placeholder={placeholder} type={type} id={id} className="form-control" {...rest} />
            {touched && error && <p style={{ color: 'red' }}>{error}</p>}
            {message && message.message && <p style={{ color: 'red' }}>{message.message}</p>}
        </div>
    );
};

export const Input = (props) => <Field component={custom} {...props} />