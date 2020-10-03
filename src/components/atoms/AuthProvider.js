import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setActiveUser } from '../../redux/actions/users'
import { loadCompany } from '../../redux/actions/company'
import { api } from '../../helpers/api'

const mapDispathToProps = dispatch => ({
    setActiveUser: (user) => dispatch(setActiveUser({ user })),
    loadCompany: (company) => dispatch(loadCompany({ company }))
})

const mapStateToProps = ({ activeUser }) => ({ activeUser })

const AuthProviderRaw = ({ children, setActiveUser, activeUser, loadCompany, history, ...rest }) => {

    useEffect(() => {
        if (!activeUser) {
            const fetch = async () => {
                try {
                    const { data } = await api.post('user/0/get_active_user/')
                    const { company, ...user } = data
                    setActiveUser(user)
                    loadCompany(company)
                } catch (error) {
                    throw error
                }
            }
            fetch()
        }
    }, [activeUser])

    return (
        <div>{children}</div>
    )
}

export const AuthProvider = connect(mapStateToProps, mapDispathToProps)(AuthProviderRaw)

export const withAuthProvider = WrappedComp => {
    return props => {
        return (
            <AuthProvider>
                <WrappedComp {...props} />
            </AuthProvider>
        )
    }
}
