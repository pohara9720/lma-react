import { EDIT_TASK, LOAD_TASKS, SET_TASK_ITEMS, SET_TASK_MODAL } from '../types'

export const loadTasks = ({ tasks }) => ({
    type: LOAD_TASKS,
    payload: { tasks }
});

export const setTaskModal = (boolean) => ({
    type: SET_TASK_MODAL,
    payload: boolean
});

export const setTaskItems = ({ taskItems }) => ({
    type: SET_TASK_ITEMS,
    payload: { taskItems }
});

export const setEditTask = ({ task }) => ({
    type: EDIT_TASK,
    payload: { task }
});