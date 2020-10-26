import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import logo from '../app-assets/images/logo/logo.png'
import { useFetch } from '../hooks/useFetch'
import { displayToast } from '../helpers/index'

export const VerifyEmailPageRaw = ({ match }) => {
    const { token } = match.params
    const { error, data } = useFetch(`/verify-email/?token=${token}`)
    console.log(data)
    if (error) {
        console.log(error)
        displayToast({ error: true })
    }

    return (
        <form>
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
                                                            <h3 className="text-left mb-2">Email Verified</h3>
                                                        </div>
                                                    </div>
                                                    <div className="card-content">
                                                        <div className="card-body">
                                                            <div>
                                                                <div className="form-group text-left">
                                                                    <Link to='/login' className="btn btn-primary glow w-45">Login</Link>
                                                                </div>
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

export const VerifyEmailPage = withRouter(VerifyEmailPageRaw)

