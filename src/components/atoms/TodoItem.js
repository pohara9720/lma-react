import React, { useState } from 'react'
import { FEED, BREEDING, OTHER, HEALTH, REPRODUCTION } from '../../dictionary'
import { StatusBubble } from './StatusBubble'

export const TodoItem = ({ item }) => {
    const [checked, setChecked] = useState(item.completed)
    const { title, category, completed } = item

    const colors = {
        [FEED]: 'primary',
        [BREEDING]: 'warning',
        [OTHER]: 'info',
        [HEALTH]: 'success',
        [REPRODUCTION]: 'danger'
    }

    const onClick = () => {
        setChecked(!checked)
        //API CALL TO MAKE TASK
    }
    return (
        <li className="todo-item task-item" data-name="David Smith">
            <div className="todo-title-wrapper d-flex justify-content-sm-between justify-content-end align-items-center">
                <div className="todo-title-area d-flex">
                    <div onClick={onClick} className="checkbox">
                        <input type="checkbox" className="checkbox-input" checked={checked} onChange={() => { }} />
                        <label htmlFor="checkbox1"></label>
                    </div>
                    <p className="todo-title mx-50 m-0 truncate">{title}</p>
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