import React, { useState, useEffect } from 'react'
import logo from '../app-assets/images/logo/logo.png'
import { Link, withRouter } from 'react-router-dom'
import { Wizard } from '../components/organisms/Wizard'
import { reduxForm, change, getFormValues } from 'redux-form'
import * as yup from 'yup'
import { connect } from 'react-redux'
import { AccountStep } from '../components/molecules/signup/AccountStep'
import { AnimalsStep } from '../components/molecules/signup/AnimalsStep'
import { CompanyStep } from '../components/molecules/signup/CompanyStep'
import { MembershipStep } from '../components/molecules/signup/MembershipStep'
import { PaymentStep } from '../components/molecules/signup/PaymentStep'
import { compose } from 'recompose'
import { api } from '../helpers/api'
import { setRegistered } from '../redux/actions/users'

const schema = yup.object().shape({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Lastt name is required'),
    password: yup.string().required('Password is required'),
    email: yup.string().email().required('Email is required'),
    confirm_password: yup
        .string()
        .test('match',
            'emails do not match',
            function (confirm_password) {
                return confirm_password === this.parent.password;
            }).required('Must confirm password'),
    street: yup.string().required('Street is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    zipcode: yup.number().test('len', 'Zipcode must be 5 characters', val => val && val.toString().length === 5),
    company_name: yup.string().required('Name is required'),
    company_street: yup.string().required('Street is required'),
    company_city: yup.string().required('City is required'),
    company_state: yup.string().required('State is required'),
    company_zipcode: yup.number().test('len', 'Zipcode must be 5 characters', val => val && val.toString().length === 5),
    // company_logo: yup.,
    subscription: yup.string().required('State is required'),
    payment_name: yup.string().required('Name is required'),
    payment_card: yup.string().required('Card number is required'),
    payment_expiration: yup.date().required('Expiration date is required'),
    payment_cvc: yup.number().required('CVC is required'),
    payment_street: yup.string().required('Street is required'),
    payment_city: yup.string().required('City is required'),
    payment_state: yup.string().required('State is required'),
    payment_zipcode: yup.number().test('len', 'Zipcode must be 5 characters', val => val && val.toString().length === 5),
})

const Step = ({ wizard: { next, prev }, children, last }) => {
    return (
        <div>
            {children}
            <div className='wizard-buttons'>
                <div className='invoice-create-btn mb-1 pr-1 flex-grow-1'>
                    <div className='btn btn-primary glow invoice-create' onClick={prev}>Prev</div>
                </div>
                {!last && <div className='btn btn-primary glow invoice-create' onClick={next}>Next</div>}
                {last && <button type='submit' className='btn btn-primary glow invoice-create'>Submit</button>}
            </div>
        </div>
    )
}

export const SignupPageRaw = ({ changeFieldValue, handleSubmit, initialize, formValues, history, setRegisteredUser, ...rest }) => {
    const [quantity, setQuantity] = useState(0)
    const [errors, setErrors] = useState([])
    const [tier, setTier] = useState(null)

    const validate = (values) => {
        schema.validate(values, { abortEarly: false }).catch(({ inner }) => {
            if (inner && inner.length) {
                const fieldErrors = inner.map(({ message, path }) => ({ message, name: path }))
                setErrors(fieldErrors)
            }
        })
    }

    const onSubmit = async values => {
        validate(values)
        try {
            if (!errors.length) {
                let formData = new FormData();
                Object.entries(values).map(entry => {
                    const [key, value] = entry
                    formData.append(key, value)
                })
                const { data } = await api.post('user/1/register/', formData)
                setRegisteredUser(data)
                history.push('/resend-email')
            }
        } catch (error) {
            console.log(error)
        }

    };

    console.log(errors)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="vertical-layout vertical-menu-modern no-card-shadow signup navbar-static footer-static" data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
                <div className="header-navbar-shadow"></div>
                <nav className="header-navbar main-header-navbar navbar-expand-lg navbar navbar-with-menu navbar-static-top">
                    <div className="navbar-wrapper">
                        <div className="navbar-container content">
                            <div className="navbar-collapse" id="navbar-mobile">
                                <ul className="nav navbar-nav float-right">
                                    <li className="dropdown dropdown-user nav-item">
                                        <a className="dropdown-toggle nav-link dropdown-user-link" href="#" data-toggle="dropdown">

                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="main-menu menu-fixed menu-light border-none" data-scroll-to-active="true">
                    <div className="main-menu-content d-flex justify-content-center mt-5 pt-5 pl-5">
                        <Link to='/login'>
                            <div className="brand-logo">
                                <img src={logo} style={{ height: "75px" }} alt="" />
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="app-content content">
                    <div className="content-overlay"></div>
                    <div className="content-wrapper">
                        <div className="content-header row">
                        </div>
                        <div className="content-body">
                            <section id="info-tabs-">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card icon-tab">
                                            <div className="card-content mt-2">
                                                <div className="card-body">
                                                    <div className="wizard-horizontal">
                                                        <Wizard error={!!errors.length} headerBreakpoint={600} progressStepsWidth={635} showHeader>
                                                            <Step title='Account'>
                                                                <AccountStep errors={errors} />
                                                            </Step>
                                                            <Step title='Animals'>
                                                                <AnimalsStep setQuantity={setQuantity} />
                                                            </Step>
                                                            <Step title='Company'>
                                                                <CompanyStep errors={errors} />
                                                            </Step>
                                                            <Step title='Membership'>
                                                                <MembershipStep quantity={quantity} onChange={changeFieldValue} setTier={setTier} />
                                                            </Step>
                                                            <Step title='Payment' last>
                                                                <PaymentStep errors={errors} tier={tier} values={formValues} />
                                                            </Step>
                                                        </Wizard>
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

const mapDispatchToProps = (dispatch) => ({
    changeFieldValue: (value) => dispatch(change('signup', 'subscription', value)),
    setRegisteredUser: (user) => dispatch(setRegistered({ user }))
})

const mapStateToProps = state => ({
    formValues: getFormValues('signup')(state)
})

export const SignupPage = compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: 'signup',
        // asyncValidate: validator(schema)
    })
)(SignupPageRaw)