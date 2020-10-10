import { LOAD_SALES } from '../types'

export const saleReducer = (state = [], { type, payload }) => {
    switch (type) {
        case LOAD_SALES:
            return payload.sales
        default:
            return state
    }
}
