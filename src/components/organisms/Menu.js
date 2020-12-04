import React, { useState, useEffect } from 'react'
import image from '../../app-assets/images/logo/lma-logo.png'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { compose } from 'recompose'
import { connect } from 'react-redux'

const Avatar = styled.div`
    height:40px;
    width: 40px;
    background-position:center;
    background-size:contain;
    background-image: ${`url(${image})`};
    background-repeat: no-repeat;
    border-radius:50%;
    box-shadow:0 4px 8px 0 rgba(0,0,0,.12), 0 2px 4px 0 rgba(0,0,0,.08);
`

export const MenuRaw = ({ match, history, activeUser, company }) => {
    const { url } = match
    const [active, setActive] = useState(url)
    const [isOpen, setIsOpen] = useState(false)
    const { first_name, last_name } = activeUser || {}
    const { name } = company || {}

    useEffect(() => {
        setActive(url)
    }, [url])

    useEffect(() => {
        const listener = (event) => {
            const element = document.getElementById('profile-menu');
            const isInside = element.contains(event.target);
            if (!isInside) {
                setIsOpen(false)
            }
        }
        document.addEventListener('click', listener);
        return () => {
            document.removeEventListener('click', listener);
        }
    }, [])

    const activeStyle = path => path === active || url.includes(path) ? "active nav-item" : "nav-item"

    const iconStyle = { marginRight: 10 }

    const dropdownStyle = isOpen ? { display: 'block' } : {}

    const logout = () => {
        localStorage.clear()
        history.push('/login')

    }

    return (
        <div>
            <div className="header-navbar-shadow"></div>
            <nav className="header-navbar main-header-navbar navbar-expand-lg navbar navbar-with-menu navbar-static-top">
                <div className="navbar-wrapper">
                    <div className="navbar-container content">
                        <div className="navbar-collapse" id="navbar-mobile">
                            <div className="mr-auto float-left bookmark-wrapper d-flex align-items-center">
                                <ul className="nav navbar-nav">
                                    <li className="nav-item mobile-menu d-xl-none mr-auto">
                                        <a className="nav-link nav-menu-main menu-toggle hidden-xs" href="#">
                                            <i className="ficon bx bx-menu" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <ul id='profile-menu' className="nav navbar-nav float-right" onClick={() => setIsOpen(!isOpen)}>
                                <li className="dropdown dropdown-user nav-item">
                                    <a className="dropdown-toggle nav-link dropdown-user-link" data-toggle="dropdown">
                                        <div className="user-nav d-sm-flex d-none">
                                            <span className="user-name">{first_name} {last_name}</span>
                                            <span className="user-status text-muted">{name}</span>
                                        </div>
                                        <span>
                                            <Avatar />
                                        </span>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right pb-0" style={dropdownStyle}>
                                        <Link className="dropdown-item" to="/profile">
                                            <i className="bx bx-user mr-50"></i> Profile
                                        </Link>
                                        <div className="dropdown-divider mb-0"></div>
                                        <a onClick={logout} className="dropdown-item">
                                            <i className="bx bx-power-off mr-50"></i>
                                        Logout
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="main-menu menu-fixed menu-light menu-accordion menu-shadow menu-border-p" data-scroll-to-active="true">
                <div className="navbar-header">
                    <ul className="nav navbar-nav flex-row">
                        <li className="nav-item mr-auto">
                            <Link className="navbar-brand" to="/animals">
                                <Avatar />
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="shadow-bottom"></div>
                <div className="main-menu-content">
                    <ul className="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation" data-icon-style="lines">
                        <li className={activeStyle('/dashboard')}>
                            <Link to="/dashboard">
                                <i style={iconStyle} className='bx bx-desktop'></i>
                                <span className="menu-title" data-i18n="Dashboard">Dashboard</span>
                            </Link>
                        </li>
                        <li className=" navigation-header"><span>Apps</span>
                        </li>
                        <li className={activeStyle('/animals')}>
                            <Link to="/animals">
                                <i style={iconStyle} className='bx bx-user'></i>
                                <span className="menu-title" data-i18n="Animals">Animals</span>
                            </Link>
                        </li>
                        <li className={activeStyle('/inventory')}>
                            <Link to="/inventory">
                                <i style={iconStyle} className='bx bx-trash-alt'></i>
                                <span className="menu-title" data-i18n="Inventory">Inventory</span>
                            </Link>
                        </li>
                        <li className={activeStyle('/tasks')}>
                            <Link to="/tasks">
                                <i style={iconStyle} className='bx bx-task'></i>
                                <span className="menu-title" data-i18n="Tasks">Tasks</span>
                            </Link>
                        </li>
                        <li className={activeStyle('/sales')}>
                            <Link to="/sales">
                                <i style={iconStyle} className='bx bx-trending-up'></i>
                                <span className="menu-title" data-i18n="Sales">Sales</span>
                            </Link>
                        </li>
                        <li className=" navigation-header"><span>Support</span>
                        </li>
                        <li className={activeStyle('/faq')}>
                            <Link to="/faq">
                                <i style={iconStyle} className='bx bx-support'></i>
                                <span className="menu-title" data-i18n="FAQ">FAQ's</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div >
    )
}

const mapStateToProps = ({ activeUser, company }) => ({ activeUser, company })

export const Menu = compose(
    withRouter,
    connect(mapStateToProps, null)
)(MenuRaw)