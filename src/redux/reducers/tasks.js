import { LOAD_TASKS } from '../types'

export const taskReducer = (state = [], { type, payload }) => {
    switch (type) {
        case LOAD_TASKS:
            return payload.tasks || state
        default:
            return state
    }
}
