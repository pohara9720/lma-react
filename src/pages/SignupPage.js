import React, { useState } from 'react'
import logo from '../app-assets/images/logo/logo.png'
import { Link, withRouter } from 'react-router-dom'
import { Wizard } from '../components/organisms/Wizard'
import { reduxForm, change } from 'redux-form'
import { validator } from '../helpers/validator'
import * as yup from 'yup'
import { connect } from 'react-redux'
import { AccountStep } from '../components/molecules/signup/AccountStep'
import { AnimalsStep } from '../components/molecules/signup/AnimalsStep'
import { CompanyStep } from '../components/molecules/signup/CompanyStep'
import { MembershipStep } from '../components/molecules/signup/MembershipStep'
import { PaymentStep } from '../components/molecules/signup/PaymentStep'
import { compose } from 'recompose'

const schema = yup.object().shape({
    firstName: yup
        .string()
        .required('First name is required')
})

const StepRaw = ({ wizard: { next, prev }, children, last, history }) => {
    const onClick = last ? () => history.push('/animals') : next
    return (
        <div>
            {children}
            <div className='wizard-buttons'>
                <div className='invoice-create-btn mb-1 pr-1 flex-grow-1'>
                    <div className='btn btn-primary glow invoice-create' onClick={prev}>Prev</div>
                </div>
                {<div className='btn btn-primary glow invoice-create' onClick={onClick}>{last ? 'Submit' : 'Next'}</div>}
            </div>
        </div>
    )
}

const Step = withRouter(StepRaw)

export const SignupPageRaw = ({ changeFieldValue }) => {
    const [quantity, setQuantity] = useState(0)
    return (
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
                                                <form className="wizard-horizontal">
                                                    <Wizard headerBreakpoint={600} progressStepsWidth={635} showHeader>
                                                        <Step title='Account'>
                                                            <AccountStep />
                                                        </Step>
                                                        <Step title='Animals'>
                                                            <AnimalsStep setQuantity={setQuantity} />
                                                        </Step>
                                                        <Step title='Company'>
                                                            <CompanyStep />
                                                        </Step>
                                                        <Step title='Membership'>
                                                            <MembershipStep quantity={quantity} onChange={changeFieldValue} />
                                                        </Step>
                                                        <Step title='Payment' last>
                                                            <PaymentStep />
                                                        </Step>
                                                    </Wizard>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div >
    )
}

const mapDispatchToProps = (dispatch) => ({ changeFieldValue: (value) => dispatch(change('signup', 'subscription', value)) })


export const SignupPage = compose(
    connect(null, mapDispatchToProps),
    reduxForm({
        form: 'signup',
        asyncValidate: validator(schema)
    })
)(SignupPageRaw)