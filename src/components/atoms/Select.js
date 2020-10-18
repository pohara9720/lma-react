import React, { useState, useEffect } from 'react'
import { Field } from 'redux-form'
import { api } from '../../helpers/api'
import { Input } from './Input'

export const SelectRaw = ({
    input,
    options,
    label: selectLabel,
    defaultValue,
    meta: { touched, error },
    manualErrors,
    render,
    ...rest
}) => {
    const message = manualErrors && manualErrors.find(x => x.name === input.name)
    return (
        <>
            {selectLabel && <label>{selectLabel}</label>}
            <select className="form-control" {...input} {...rest}>
                {render ?
                    options && options.length && options.map(item => render(item))
                    :
                    options.length && options.map(({ id, label }, i) => <option defaultValue={defaultValue || options[0].id} key={i} value={id}>{label}</option>)
                }
            </select>
            {touched && error && <p style={{ color: 'red' }}>{error}</p>}
            {message && message.message && <p style={{ color: 'red' }}>{message.message}</p>}
        </>
    )
}

export const Select = (props) => <Field component={SelectRaw} {...props} />

export const ParentSelect = ({ parent, type, notInSystem, noneOption, ...rest }) => {
    const [options, setOptions] = useState([])
    const isFather = parent === 'father'
    const label = isFather ? 'Sire' : 'Dam'
    const payload = type ? { type } : { type: 'N/A' }
    useEffect(() => {
        const fetch = async () => {
            const nis = { id: 'N/A', label: 'No in system' }
            const { data } = await api.post('animal/get_parents/', payload)
            const state = noneOption ? [nis, ...data[parent]] : data[parent]
            setOptions(state)
        }
        if (!notInSystem) {
            fetch()
        }
    }, [type])

    const format = options && options.map(({ id, label, tag_number, name }) => {
        const val = label ? label : `${name} (#${tag_number})`
        return { id, label: val }
    })

    return (
        notInSystem
            ? <Input label={label} name={isFather ? 'father_placeholder' : 'mother_placeholder'} {...rest} />
            : <Select options={format} label={label} name={parent} {...rest} />

    )
}