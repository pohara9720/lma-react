import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { setActiveUser, listUsers } from '../../redux/actions/users'
import { loadCompany } from '../../redux/actions/company'
import { loadInventory } from '../../redux/actions/inventory'
import { listAnimals } from '../../redux/actions/animals'
import { api } from '../../helpers/api'
import { loadTasks } from '../../redux/actions/tasks'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'

const mapDispathToProps = dispatch => ({
    setActiveUser: (user) => dispatch(setActiveUser({ user })),
    loadCompany: (company) => dispatch(loadCompany({ company })),
    loadInventory: (inventory) => dispatch(loadInventory({ inventory })),
    listAnimals: (animals) => dispatch(listAnimals({ animals })),
    loadTasks: (tasks) => dispatch(loadTasks({ tasks })),
    loadUsers: (users) => dispatch(listUsers({ users })),
})

const mapStateToProps = ({ activeUser }) => ({ activeUser })

const AuthProviderRaw = ({
    children,
    setActiveUser,
    activeUser,
    loadCompany,
    history,
    loadInventory,
    listAnimals,
    loadTasks,
    loadUsers,
    ...rest
}) => {
    const [trans, setTrans] = useState()
    useEffect(() => {
        if (!activeUser) {
            const fetch = async () => {
                try {
                    const { data } = await api.post('user/get_active_user/')
                    const { company, ...user } = data
                    const { email } = company || {}
                    const { data: transfer } = await api.post('transfer/check_for_transfer/', { email })
                    setTrans(transfer)
                    setActiveUser(user)
                    loadCompany(company)
                    loadInventory({ results: company.inventory })
                    listAnimals({ results: company.animals })
                    loadUsers({ results: company.users })
                    loadTasks(company.tasks)
                } catch (error) {
                    throw error
                }
            }
            fetch()
        }
    }, [activeUser])

    useEffect(() => {
        if (trans && trans.id) {
            history.push(`/transfer/${trans.id}`)
        }
    }, [trans])

    return (
        <div>{children}</div>
    )
}

export const AuthProvider = compose(
    withRouter,
    connect(mapStateToProps, mapDispathToProps)
)(AuthProviderRaw)

export const withAuthProvider = WrappedComp => {
    return props => {
        return (
            <AuthProvider>
                <WrappedComp {...props} />
            </AuthProvider>
        )
    }
}
