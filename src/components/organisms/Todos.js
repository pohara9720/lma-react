import React from 'react'
import { TodoItem } from '../atoms/TodoItem'
// import { ActionDropdown } from '../atoms/ActionDropdown'
import { FEED, BREEDING, OTHER, HEALTH, REPRODUCTION } from '../../dictionary'
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

export const mapForCalendar = data => {
    const colors = {
        [FEED]: '#5A8DEE',
        [BREEDING]: '#FDAC41',
        [OTHER]: '#00CFDD',
        [HEALTH]: '#39DA8A',
        [REPRODUCTION]: '#FF5B5C'
    }
    return data.map(({ task_due_date, due_date, title, category }) =>
        ({ title, start: task_due_date, end: task_due_date, color: colors[category] }))
}

const Calendar = ({ tasks }) =>
    <BigCalendar
        localizer={localizer}
        events={mapForCalendar(tasks)}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={event => ({ style: { backgroundColor: event.color } })}
    />


const NoResults = () => (
    <div className="no-results" style={{ padding: 8 }}>
        <h6>No Tasks Found</h6>
    </div>
)

const TodoList = ({ tasks }) => {
    return (
        <ul className="todo-task-list-wrapper list-unstyled task-list" id="todo-task-list-drag">
            {!tasks.length ? <NoResults /> : tasks.map((item, i) => <TodoItem key={i} item={item} />)}
        </ul>
    )
}

export const Todos = ({ tasks }) => {
    return (
        <div className="content-right">
            <div className="content-wrapper">
                <div className="content-header row"></div>
                <div className="content-body">
                    <div className="todo-app-area">
                        <div className="todo-app-list-wrapper">
                            <div className="todo-app-list">
                                <Calendar tasks={tasks} />
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
                                    <TodoList tasks={tasks} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
