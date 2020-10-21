import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../app-assets/images/logo/logo.png'
import { validator } from '../helpers/validator'
import * as yup from 'yup'
import { reduxForm } from 'redux-form'
import { Input } from '../components/atoms/Input'
import { displayToast } from '../helpers/index'
import { api } from '../helpers/api'

const schema = yup.object().shape({
    email: yup.string().email().required()
})

export const ForgotPasswordPageRaw = ({ handleSubmit }) => {

    const onSubmit = async values => {
        try {
            await api.post('user/forgot_password/', values)
            displayToast({ success: true })
        } catch (error) {
            displayToast({ error: true })
        }

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="boxicon-layout no-card-shadow blank-page login" data-open="click" data-menu="vertical-menu-modern" data-col="1-column">
                <div className="app-content content">
                    <div className="content-wrapper" style={{ padding: 0 }}>
                        <div className="content-body">
                            <section id="auth-login" className="row flexbox-container">
                                <div className="card bg-authentication shadow-none mb-0" style={{ height: '100vh' }}>
                                    <div className="row m-0">
                                        <div className="col-md-6 col-12 d-flex justify-content-center">
                                            <div className="d-md-block d-none align-self-center">
                                                <div className="card-content px-1">
                                                    <img className="img-fluid" src={logo} style={{ height: "150px" }} alt="branding logo" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12 text-center d-flex align-self-center h-100" style={{ boxShadow: "-8px 20px 25px 0 rgba(25, 42, 70, 0.3)" }}>
                                            <div className="col-md-8 pl-0">
                                                <div className="card disable-rounded-right mb-0 h-100 justify-content-center">
                                                    <div className="card-header pb-1">
                                                        <div className="card-title">
                                                            <h3 className="text-left mb-2">Welcome to Livestock Manager</h3>
                                                        </div>
                                                    </div>
                                                    <div className="card-content">
                                                        <div className="card-body">
                                                            <form action="index.html">
                                                                <Input label='Email' name='email' className='form-group text-left' />
                                                                <br />
                                                                <div className="form-group text-left">
                                                                    <button type="submit" className="btn btn-primary glow w-45">Send reset password link</button>
                                                                </div>
                                                            </form>
                                                            <div className="text-left"><small className="mr-25">Remember your password?</small>
                                                                <Link to="/login"><small>Login</small></Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export const ForgotPasswordPage = reduxForm({ form: 'forgotEmailForm', asyncValidate: validator(schema) })(ForgotPasswordPageRaw)