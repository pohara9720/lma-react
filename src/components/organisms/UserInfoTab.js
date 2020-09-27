import React from 'react'
import { Select } from '../atoms/Select'
import { states } from '../../dictionary'
import { Input } from '../atoms/Input'
import { reduxForm } from 'redux-form'
import * as yup from 'yup'
import { validator } from '../../helpers/validator'

const schema = yup.object().shape({
    email: yup.string().email().required()
})


export const UserInfoTabRaw = ({ handleSubmit, ...rest }) => {

    const submit = (values) => {
        console.log(values, rest)
    }
    return (
        <form onSubmit={handleSubmit(submit)}>
            <div className="tab-pane active fade show" id="profile" aria-labelledby="profile-tab"
                role="tabpanel">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <Input label='Email' type='email' placeholder='Email' name='email' />
                        </div>
                        <div className="form-group">
                            <Input label='First Name' placeholder='First Name' name='firstName' />
                        </div>
                        <div className="form-group">
                            <Input label='Last Name' placeholder='Last Name' name='lastName' />
                        </div>
                        <div className="form-group">
                            <Input label='Password' placeholder='Password' name='password' type='password' />
                        </div>
                        <div className="form-group">
                            <Input label='Confirm Password' placeholder='Confirm Password' name='passwordConfirm' type='password' />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <Input label='Address' placeholder='Address' name='address' />
                        </div>
                        <div className="form-group">
                            <Input label='City' placeholder='City' name='city' />
                        </div>
                        <div className="form-group">
                            <Select options={states} label='State' name='state' />
                        </div>
                        <div className="form-group">
                            <Input label='Zip Code' placeholder='Zip Code' name='zipcode' />
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-sm-row flex-column justify-content-end mt-1">
                    <button type="submit"
                        className="btn btn-primary glow mb-1 mb-sm-0 mr-0 mr-sm-1">Save Changes</button>
                </div>
            </div>
        </form>
    )
}

export const UserInfoTab = reduxForm({ form: 'userForm', asyncValidate: validator(schema) })(UserInfoTabRaw)