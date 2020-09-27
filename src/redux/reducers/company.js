import { LOAD_COMPANY } from '../types'

export const companyReducer = (state = null, { type, payload }) => {
    switch (type) {
        case LOAD_COMPANY:
            return payload
        default:
            return state
    }
}
