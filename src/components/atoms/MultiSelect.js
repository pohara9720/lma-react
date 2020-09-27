import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { Field } from 'redux-form'

export const MultiSelectInputRaw = ({
    input,
    options,
    displayField,
    label,
    meta: { touched, error },
    ...rest
}) => {
    const [state, setState] = useState([])

    const onChange = (option) => {
        setState(option)
        input.onChange(option, state)
    }

    return (
        <>
            {label && <label>{label}</label>}
            <Select
                {...input}
                value={state}
                defaultValue={[]}
                options={options}
                onChange={onChange}
                onBlur={() => state}
                isMulti
                {...rest}
            />
            {touched && error && <p style={{ color: 'red' }}>{error}</p>}
        </>
    )
}


export const MultiSelect = props => <Field component={MultiSelectInputRaw} {...props} />