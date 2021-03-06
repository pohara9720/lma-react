import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import logo from '../app-assets/images/logo/logo.png'
import { validator } from '../helpers/validator'
import * as yup from 'yup'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { Input } from '../components/atoms/Input'
import { api } from '../helpers/api'
import { compose } from 'recompose'
import { setActiveUser } from '../redux/actions/users'
import { LMA_AUTH_TOKEN } from '../dictionary'
import { loadCompany } from '../redux/actions/company'

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required()
})

export const LoginPageRaw = ({ handleSubmit, setActiveUser, history, loadCompany }) => {
    const [error, setError] = useState(false)

    const onSubmit = async values => {
        try {
            const { data: { user, token } } = await api.post('api-token-auth/', values)
            if (user && token) {
                const { company, ...rest } = user
                localStorage.setItem(LMA_AUTH_TOKEN, token)
                setActiveUser(rest)
                loadCompany(company)
                history.push(`/animals`)
            }

        } catch (error) {
            if (error) {
                setError(true)
            }
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
                                                            <div>
                                                                <Input label='Email' name='email' className='form-group text-left' />
                                                                <Input label='Password' type='password' name='password' className='form-group text-left' />
                                                                <div className="form-group d-flex flex-md-row flex-column justify-content-between align-items-center">
                                                                    <Link to='/forgot-password'>
                                                                        <div className="text-right">
                                                                            <div className="card-link"><small>Forgot your username or password?</small></div>
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                                <br />
                                                                {error && <p style={{ color: 'red' }}>Credentials are invalid</p>}
                                                                <div className="form-group text-left">
                                                                    <button type="submit" className="btn btn-primary glow w-45">Log In</button>
                                                                </div>
                                                            </div>
                                                            <div className="text-left"><small className="mr-25">Don't have an account?</small>
                                                                <Link to="/signup"><small>Sign up</small></Link>
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

const mapDispatchToProps = dispatch => ({
    setActiveUser: (user) => dispatch(setActiveUser({ user })),
    loadCompany: (company) => dispatch(loadCompany({ company }))
})

export const LoginPage = compose(
    withRouter,
    connect(null, mapDispatchToProps),
    reduxForm({ form: 'loginForm', asyncValidate: validator(schema) })
)(LoginPageRaw)