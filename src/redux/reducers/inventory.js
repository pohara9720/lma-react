import { LOAD_INVENTORY, EDIT_INVENTORY } from '../types'

export const inventoryReducer = (state = [], { type, payload }) => {
    switch (type) {
        case LOAD_INVENTORY:
            return payload.inventory || state
        default:
            return state
    }
}

export const editInventoryReducer = (state = [], { type, payload }) => {
    switch (type) {
        case EDIT_INVENTORY:
            return payload.inventory
        default:
            return state
    }
}
