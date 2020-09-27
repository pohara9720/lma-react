import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { capitalize } from '../../helpers'

export const BreadCrumbsRaw = ({ match, title }) => {
    const [string, ...links] = match.url.split('/')
    const format = string => string.split('-').map(capitalize).join(' ')

    const renderCrumbs = () => links.map((link, i) => {
        const isActive = i === links.length - 1
        const className = isActive ? "breadcrumb-item active" : "breadcrumb-item"
        // const getPath = index => links.slice(0, index).join('/') // NOTE Need to work on function for sub routes
        const activeStyle = isActive ? { color: '#5A8DEE' } : {}
        const to = isActive ? '#' : `/${link}`
        return (
            <li key={i} className={className}>
                <Link style={activeStyle} to={to}>{format(link)}</Link>
            </li>
        )
    })
    return (
        <div className="content-header row">
            <div className="content-header-left col-12 mb-2 mt-1">
                <div className="row breadcrumbs-top">
                    <div className="col-12">
                        <h5 className="content-header-title float-left pr-1 mb-0">{title || ''}</h5>
                        <div className="breadcrumb-wrapper col-12">
                            <ol className="breadcrumb p-0 mb-0">
                                <li className="breadcrumb-item">
                                    <Link to="/animals">
                                        <i className="bx bx-home-alt"></i>
                                    </Link>
                                </li>
                                {renderCrumbs()}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const BreadCrumbs = withRouter(BreadCrumbsRaw)