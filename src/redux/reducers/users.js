import { LOAD_USERS } from '../types'

export const userReducer = (state = null, { type, payload }) => {
    switch (type) {
        case LOAD_USERS:
            return payload.users
        default:
            return state
    }
}
