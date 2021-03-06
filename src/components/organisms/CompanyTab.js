import React, { useEffect } from 'react'
import { Select } from '../atoms/Select'
import { states } from '../../dictionary'
import { api } from '../../helpers/api'
import { Input } from '../atoms/Input'
import { reduxForm } from 'redux-form'
import * as yup from 'yup'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { validator, fileSchema } from '../../helpers/validator'
import { FileInput } from '../atoms/FileInput'
import { displayToast } from '../../helpers'

const schema = yup.object().shape({
    name: yup.string().required('Company name is required'),
    logo: fileSchema,
    email: yup.string().email().required('Email is required'),
    street: yup.string().required('Company name is required'),
    city: yup.string().required('Company name is required'),
    state: yup.string().required('Company name is required'),
    zipcode: yup.number().test('len', 'Zipcode must be 5 characters', val => val.toString().length === 5).required('Zipcode is required'),
})

export const CompanyTabRaw = ({ company, initialize, handleSubmit, ...rest }) => {

    const { id, name, email, address, logo } = company
    const { street, city, state, zipcode } = address

    useEffect(() => {
        initialize({ name, email, street, city, state, zipcode })
    }, [name, email, street, city, state, zipcode])

    const onSubmit = async values => {
        try {
            const { logo, street, city, state, zipcode, name } = values
            let formData = new FormData();
            formData.append("logo", logo);
            formData.append("street", street);
            formData.append("city", city);
            formData.append("state", state);
            formData.append("zipcode", zipcode);
            formData.append("name", name);
            await api.patch(`company/${id}/`, formData)
            displayToast({ success: true })
        } catch (error) {
            displayToast({ error: true })
        }

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="tab-pane active fade show" id="company" aria-labelledby="company-tab"
                role="tabpanel">
                <FileInput name='logo' label='Logo' init={logo} />
                <div className="row" style={{ marginTop: 32 }}>
                    <div className="col-md-6">
                        <div className="form-group">
                            <Input label='Name' name="name" id="company-form-name" placeholder="Name" />
                        </div>
                        <div className="form-group">
                            <Input label='Email' name="email" id="company-form-email" placeholder="Email" disabled />
                        </div>
                        <div className="form-group">
                            <Input label='Street' name="street" id="company-form-address" placeholder="Address" />
                        </div>
                        <div className="form-group">
                            <Input label='City' name="city" id="company-form-city" placeholder="City" />
                        </div>
                        <div className="form-group">
                            <Select options={states} label='State' name='state' />
                        </div>
                        <div className="form-group">
                            <Input label='Zip' name="zipcode" id="company-form-zip" placeholder="Zip" />
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-sm-row flex-column justify-content-start mt-1">
                    <button type="submit" className="btn btn-primary glow mb-1 mb-sm-0 mr-0 mr-sm-1">Save Changes</button>
                </div>
            </div>
        </form>
    )
}

const mapStateToProps = ({ company }) => ({ company })

export const CompanyTab = compose(
    connect(mapStateToProps, null),
    reduxForm({ form: 'companyForm', asyncValidate: validator(schema) })
)(CompanyTabRaw)