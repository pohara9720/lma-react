import React from 'react'
import { TodoItem } from '../atoms/TodoItem'
// import { ActionDropdown } from '../atoms/ActionDropdown'
import { colors } from '../../dictionary'
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

export const mapForCalendar = data => {

    return data.map(({ task_due_date, title, category, ...rest }) =>
        ({ title, start: task_due_date, end: task_due_date, color: colors[category], category, ...rest }))
}

const Calendar = ({ tasks, onEditTask }) =>
    <BigCalendar
        localizer={localizer}
        events={mapForCalendar(tasks)}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable={false}
        onDrillDown={() => { }}
        onSelectEvent={item => item.completed ? null : onEditTask({ task_due_date: item.start, ...item })}
        popup
        eventPropGetter={event => ({ style: { backgroundColor: event.color } })}
    />


const NoResults = () => (
    <div className="no-results" style={{ padding: 8 }}>
        <h6>No Tasks Found</h6>
    </div>
)

const TodoList = ({ tasks, ...rest }) => {
    return (
        <ul className="todo-task-list-wrapper list-unstyled task-list" id="todo-task-list-drag">
            {!tasks.length ? <NoResults /> : tasks.map((item, i) => <TodoItem key={i} item={item} {...rest} />)}
        </ul>
    )
}

export const Todos = ({ tasks, ...rest }) => {
    return (
        <div className="content-right">
            <div className="content-wrapper">
                <div className="content-header row"></div>
                <div className="content-body">
                    <div className="todo-app-area">
                        <div className="todo-app-list-wrapper">
                            <div className="todo-app-list">
                                <Calendar tasks={tasks} {...rest} />
                                <div style={{ marginBottom: 32 }} />
                                <div className="todo-fixed-search d-flex justify-content-between align-items-center">
                                    <div className="sidebar-toggle d-block d-lg-none">
                                        <i className="bx bx-menu"></i>
                                    </div>
                                    <fieldset className="form-group position-relative has-icon-left m-0 flex-grow-1">
                                        <input type="text" className="form-control todo-search" id="todo-search" placeholder="Search Task" />
                                        <div className="form-control-position">
                                            <i className="bx bx-search"></i>
                                        </div>
                                    </fieldset>
                                    {/* <ActionDropdown options={taskFilters} /> */}
                                </div>
                                <div className="todo-task-list list-group">
                                    <TodoList tasks={tasks} {...rest} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
