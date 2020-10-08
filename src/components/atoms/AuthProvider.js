import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setActiveUser, listUsers } from '../../redux/actions/users'
import { loadCompany } from '../../redux/actions/company'
import { loadInventory } from '../../redux/actions/inventory'
import { listAnimals } from '../../redux/actions/animals'
import { api } from '../../helpers/api'
import { loadTasks } from '../../redux/actions/tasks'

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

    useEffect(() => {
        if (!activeUser) {
            const fetch = async () => {
                try {
                    const { data } = await api.post('user/get_active_user/')
                    const { company, ...user } = data
                    setActiveUser(user)
                    loadCompany(company)
                    loadInventory(company.inventory)
                    listAnimals(company.animals)
                    loadUsers(company.users)
                    loadTasks(company.tasks)
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
