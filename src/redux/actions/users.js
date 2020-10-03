import { LOAD_USERS, GET_ACTIVE_USER } from '../types'

export const listUsers = ({ users }) => ({
    type: LOAD_USERS,
    payload: { users }
});

export const setActiveUser = ({ user }) => ({
    type: GET_ACTIVE_USER,
    payload: { user }
})