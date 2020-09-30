import React, { useEffect } from 'react'
import { Select } from '../atoms/Select'
import { states } from '../../dictionary'
import cow from '../../app-assets/images/slider/cow.jpg'
import { Input } from '../atoms/Input'
import { reduxForm } from 'redux-form'
import * as yup from 'yup'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { validator } from '../../helpers/validator'
import { FileInput } from '../atoms/FileInput'

const schema = yup.object().shape({

})

export const CompanyTabRaw = ({ company, initialize, ...rest }) => {

    const { name, email, address, logo } = company
    const { street, city, state, zipcode } = address

    useEffect(() => {
        initialize({ name, email, street, city, state, zipcode })
    }, [])

    return (
        <div className="tab-pane active fade show" id="company" aria-labelledby="company-tab"
            role="tabpanel">
            <FileInput name='logo' label='Logo' init="https://i.ytimg.com/vi/oygrmJFKYZY/maxresdefault.jpg" />
            <div className="row" style={{ marginTop: 32 }}>
                <div className="col-md-6">
                    <div className="form-group">
                        <Input label='Name' name="name" id="company-form-name" placeholder="Name" />
                    </div>
                    <div className="form-group">
                        <Input label='Email' name="email" id="company-form-email" placeholder="Email" />
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
    )
}

const mapStateToProps = ({ company }) => ({ company })

export const CompanyTab = compose(
    connect(mapStateToProps, null),
    reduxForm({ form: 'companyForm', asyncValidate: validator(schema) })
)(CompanyTabRaw)