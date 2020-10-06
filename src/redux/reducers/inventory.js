import { LOAD_INVENTORY } from '../types'

export const inventoryReducer = (state = [], { type, payload }) => {
    switch (type) {
        case LOAD_INVENTORY:
            return payload.inventory || state
        default:
            return state
    }
}
