import React, { useEffect } from 'react'
import { Select } from '../atoms/Select'
import { states } from '../../dictionary'
import { Input } from '../atoms/Input'
import { reduxForm, reset } from 'redux-form'
import * as yup from 'yup'
import { validator } from '../../helpers/validator'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { api } from '../../helpers/api'
import { displayToast } from '../../helpers'

const passwordSchema = yup.object().shape({
    password: yup.string().required('New password is required'),
    password_confirm: yup
        .string()
        .test('match',
            'Passwords do not match',
            function (password_confirm) {
                return password_confirm === this.parent.password;
            })
})


const PasswordComp = ({ handleSubmit, clearFields, dispatch, ...rest }) => {
    console.log(rest)

    const onSubmit = async (values) => {
        const { password } = values
        try {
            await api.post('user/change_password/', { password })
            dispatch(reset('passwordForm'))
            displayToast({ success: true })
        } catch (error) {
            displayToast({ error: true })
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='row' style={{ marginTop: 32 }}>
                <div className="col-md-6">
                    <div className="form-group">
                        <Input label='New Password' placeholder='Password' name='password' type='password' />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <Input label='Confirm New Password' placeholder='Confirm Password' name='password_confirm' type='password' />
                    </div>
                </div>
            </div>
            <div className="d-flex flex-sm-row flex-column justify-content-end mt-1">
                <button type="submit" className="btn btn-primary glow mb-1 mb-sm-0 mr-0 mr-sm-1">Change Password</button>
            </div>
        </form>
    )
}

export const PasswordForm = reduxForm({ form: 'passwordForm', asyncValidate: validator(passwordSchema) })(PasswordComp)

const profileSchema = yup.object().shape({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    email: yup.string().email().required('Email is required'),
    street: yup.string().required('Street is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    zipcode: yup.number().test('len', 'Zipcode must be 5 characters', val => val.toString().length === 5).required('Zipcode is required'),
})

const ProfileFormRaw = ({ handleSubmit, initialize, activeUser }) => {
    const { id, email, first_name, last_name, address } = activeUser || {}
    const { street, city, state, zipcode } = address || {}

    useEffect(() => {
        initialize({ email, first_name, last_name, street, city, state, zipcode })
    }, [email, first_name, last_name, address])

    const onSubmit = async (values) => {
        try {
            await api.patch(`user/${id}/`, values)
            displayToast({ success: true })
        } catch (error) {
            displayToast({ error: true })
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                <button type="submit" className="btn btn-primary glow mb-1 mb-sm-0 mr-0 mr-sm-1">Save Changes</button>
            </div>
        </form>
    )
}

const mapStateToProps = ({ activeUser }) => ({ activeUser })
const ProfileForm = compose(
    connect(mapStateToProps, null),
    reduxForm({ form: 'userForm', asyncValidate: validator(profileSchema) }))(ProfileFormRaw)

export const UserInfoTab = () => {
    return (
        <div className="tab-pane active fade show" id="profile" aria-labelledby="profile-tab" role="tabpanel">
            <ProfileForm />
            <PasswordForm />
        </div>
    )
}



// export const UserInfoTab = connect(mapStateToProps, null)(UserInfoTabRaw)