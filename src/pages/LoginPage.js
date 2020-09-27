import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../app-assets/images/logo/logo.png'
export const LoginPage = () => {
    return (

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
                                                            <div className="form-group mb-50 text-left">
                                                                <label className="text-bold-600" htmlFor="exampleInputEmail1">Email address</label>
                                                                <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email address" />
                                                            </div>
                                                            <div className="form-group text-left">
                                                                <label className="text-bold-600" htmlFor="exampleInputPassword1">Password</label>
                                                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                                            </div>
                                                            <div className="form-group d-flex flex-md-row flex-column justify-content-between align-items-center">
                                                                <Link to='/forgot-password'>
                                                                    <div className="text-right">
                                                                        <a href="#" className="card-link"><small>Forgot your username or password?</small></a>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                            <br />
                                                            <Link to='/animals'>
                                                                <div className="form-group text-left">
                                                                    <button type="submit" className="btn btn-primary glow w-45">Log In</button>
                                                                </div>
                                                            </Link>
                                                        </form>
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
    )
}