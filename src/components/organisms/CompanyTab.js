import React from 'react'
import { Select } from '../atoms/Select'
import { states } from '../../dictionary'
import cow from '../../app-assets/images/slider/cow.jpg'
import { Input } from '../atoms/Input'
import { reduxForm } from 'redux-form'
import * as yup from 'yup'
import { validator } from '../../helpers/validator'

const schema = yup.object().shape({

})

export const CompanyTabRaw = () => {
    return (
        <div className="tab-pane active fade show" id="company" aria-labelledby="company-tab"
            role="tabpanel">
            <div className="media mb-2">
                <a className="mr-2" href="#">
                    <img src={cow} alt="users avatar" className="users-avatar-shadow rounded-circle" height="64" width="64" />
                </a>
                <div className="media-body">
                    <h4 className="media-heading">Logo</h4>
                    <div className="col-12 px-0 d-flex">
                        <a href="#" className="btn btn-sm btn-primary mr-25">Change</a>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <Input label='Name' name="name" id="company-form-name" placeholder="Name" />
                    </div>
                    <div className="form-group">
                        <Input label='Email' name="email" id="company-form-email" placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <Input label='Address' name="address" id="company-form-address" placeholder="Address" />
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

export const CompanyTab = reduxForm({ form: 'companyForm', asyncValidate: validator(schema) })(CompanyTabRaw)