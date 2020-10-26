import React, { useState } from 'react'
import { FEED, BREEDING, OTHER, HEALTH, REPRODUCTION } from '../../dictionary'
import { StatusBubble } from './StatusBubble'
import { api } from '../../helpers/api'
import { connect } from 'react-redux'
import { loadTasks } from '../../redux/actions/tasks'
import { displayToast } from '../../helpers/index'

export const TodoItemRaw = ({ item, tasks, loadTasks, onEditTask }) => {
    const { title, category, completed, id } = item

    const colors = {
        [FEED]: 'primary',
        [BREEDING]: 'warning',
        [OTHER]: 'info',
        [HEALTH]: 'success',
        [REPRODUCTION]: 'danger'
    }

    const onClick = async () => {
        try {
            const { data } = await api.post(`task/${id}/change_status/`)
            const update = tasks.filter(({ id: taskId }) => taskId !== id)
            loadTasks([data, ...update])
            displayToast({ success: true })
        } catch (error) {
            displayToast({ error: true })
        }
    }
    return (
        <li className="todo-item task-item" data-name="David Smith">
            <div className="todo-title-wrapper d-flex justify-content-sm-between justify-content-end align-items-center">
                <div className="todo-title-area d-flex">
                    <div onClick={onClick} className="checkbox">
                        <input disabled={completed} type="checkbox" className="checkbox-input" checked={completed} onChange={onClick} />
                        <label htmlFor="checkbox1"></label>
                    </div>
                    <a href='#' onClick={() => onEditTask(item)} className="todo-title mx-50 m-0 truncate">{title}</a>
                </div>
                <div className="todo-item-action d-flex align-items-center">
                    <div style={{ marginRight: 8 }}>
                        <span className={`bullet bullet-sm bullet-${colors[category]}`} style={{ marginRight: 8 }}></span>
                        <span>{category}</span>
                    </div>
                    <StatusBubble color={completed ? colors.HEALTH : colors[REPRODUCTION]} status={completed ? 'Completed' : 'Not completed'} />
                    <a className='todo-item-delete ml-75'><i className="bx bx-trash"></i></a>
                </div>
            </div>
        </li>
    )
}

const mapStateToProps = ({ tasks }) => ({ tasks })
const mapDispatchToProps = dispatch => ({
    loadTasks: (tasks) => dispatch(loadTasks({ tasks }))
})

export const TodoItem = connect(mapStateToProps, mapDispatchToProps)(TodoItemRaw)