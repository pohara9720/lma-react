import { LOAD_USERS, GET_ACTIVE_USER } from '../types'

export const userReducer = (state = null, { type, payload }) => {
    switch (type) {
        case LOAD_USERS:
            return payload.users
        default:
            return state
    }
}


export const activeUserReducer = (state = null, { type, payload }) => {
    switch (type) {
        case GET_ACTIVE_USER:
            return payload.user
        default:
            return state
    }
}