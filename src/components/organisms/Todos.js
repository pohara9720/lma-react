import React from 'react'
import { TodoItem } from '../atoms/TodoItem'
import { withTasks } from '../../hoc/withTasks'
import { ActionDropdown } from '../atoms/ActionDropdown'
import { taskFilters } from '../../dictionary'
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

const Calendar = () =>
    <BigCalendar
        localizer={localizer}
        events={[{
            title: 'Title',
            start: '2020-09-01',
            end: '2020-09-11'
        }]}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
    />




const NoResults = () => (
    <div className="no-results">
        <h5>No Items Found</h5>
    </div>
)

const TodoList = ({ tasks }) => {
    return (
        <ul className="todo-task-list-wrapper list-unstyled task-list" id="todo-task-list-drag">
            {!tasks.length ? <NoResults /> : tasks.map((item, i) => <TodoItem key={i} item={item} />)}
        </ul>
    )
}

export const TodosRaw = ({ tasks }) => {
    return (
        <div className="content-right">
            <div className="content-wrapper">
                <div className="content-header row"></div>
                <div className="content-body">
                    <div className="todo-app-area">
                        <div className="todo-app-list-wrapper">
                            <div className="todo-app-list">
                                <Calendar />
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
                                    <ActionDropdown options={taskFilters} />
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

export const Todos = withTasks(TodosRaw)