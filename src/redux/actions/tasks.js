import { LOAD_TASKS } from '../types'

export const loadTasks = ({ tasks }) => ({
    type: LOAD_TASKS,
    payload: { tasks }
});