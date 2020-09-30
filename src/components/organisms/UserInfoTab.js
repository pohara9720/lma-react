import React from 'react'
import { Select } from '../atoms/Select'
import { states } from '../../dictionary'
import { Input } from '../atoms/Input'
import { reduxForm } from 'redux-form'
import * as yup from 'yup'
import { validator } from '../../helpers/validator'

const passwordSchema = yup.object().shape({
    new_password: yup.string().required('new password is required'),
    old_password: yup.string().required('old password is required'),
    new_password_confirm: yup
        .string()
        .test('match',
            'emails do not match',
            function (new_password_confirm) {
                return new_password_confirm === this.parent.new_password;
            }),
    old_password_confirm: yup
        .string()
        .test('match',
            'emails do not match',
            function (old_password_confirm) {
                return old_password_confirm === this.parent.old_password;
            }),
})

const PasswordComp = ({ handleSubmit }) => {

    const submit = (values) => {
        console.log(values)
    }

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div className='row' style={{ marginTop: 32 }}>
                <div className="col-md-6">
                    <div className="form-group">
                        <Input label='Old Password' placeholder='Password' name='old_password' type='password' />
                    </div>
                    <div className="form-group">
                        <Input label='Confirm Old Password' placeholder='Confirm Password' name='old_password_confirm' type='password' />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <Input label='New Password' placeholder='Password' name='new_password' type='password' />
                    </div>
                    <div className="form-group">
                        <Input label='Confirm New Password' placeholder='Confirm Password' name='new_password_confirm' type='password' />
                    </div>
                </div>
            </div>
            <div className="d-flex flex-sm-row flex-column justify-content-end mt-1">
                <button type="submit"
                    className="btn btn-primary glow mb-1 mb-sm-0 mr-0 mr-sm-1">Change Password</button>
            </div>
        </form>
    )
}

export const PasswordForm = reduxForm({ form: 'passwordForm', asyncValidate: validator(passwordSchema) })(PasswordComp)

const profileSchema = yup.object().shape({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    email: yup.string().email().required(),
    street: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zipcode: yup.number().test('len', 'Zipcode must be 5 characters', val => val.toString().length === 5),
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
                            <Input label='Email' type='email' placeholder='Email' name='email' disabled />
                        </div>
                        <div className="form-group">
                            <Input label='First Name' placeholder='First Name' name='first_name' />
                        </div>
                        <div className="form-group">
                            <Input label='Last Name' placeholder='Last Name' name='last_name' />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <Input label='Address' placeholder='Street' name='street' />
                        </div>
                        <div className="form-group">
                            <Input label='City' placeholder='City' name='city' />
                        </div>
                        <div className="form-group">
                            <Select options={states} label='State' name='state' />
                        </div>
                        <div className="form-group">
                            <Input type='number' label='Zip Code' placeholder='Zip Code' name='zipcode' />
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-sm-row flex-column justify-content-end mt-1">
                    <button type="submit"
                        className="btn btn-primary glow mb-1 mb-sm-0 mr-0 mr-sm-1">Save Changes</button>
                </div>
                <PasswordForm />
            </div>
        </form>
    )
}

export const UserInfoTab = reduxForm({ form: 'userForm', asyncValidate: validator(profileSchema) })(UserInfoTabRaw)