import React from 'react'
import { Link } from 'react-router-dom'


export const ErrorPage = () => {
    return (

        <div className='error-page-container'>
            Something happened!
            <Link style={{ marginLeft: 10 }} to='/animals'>Return Home</Link>
        </div>


    )
}