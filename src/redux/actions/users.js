import { LOAD_USERS } from '../types'

export const listUsers = ({ users }) => ({
    type: LOAD_USERS,
    payload: { users }
});