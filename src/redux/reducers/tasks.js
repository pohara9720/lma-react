import { LOAD_TASKS, SET_TASK_MODAL, SET_TASK_ITEMS } from '../types'

export const taskReducer = (state = [], { type, payload }) => {
    switch (type) {
        case LOAD_TASKS:
            return payload.tasks || state
        default:
            return state
    }
}

export const taskModalReducer = (state = false, { type, payload }) => {
    switch (type) {
        case SET_TASK_MODAL:
            return payload
        default:
            return state
    }
}

export const taskItemReducer = (state = [], { type, payload }) => {
    switch (type) {
        case SET_TASK_ITEMS:
            return payload.taskItems
        default:
            return state
    }
}
