import React from 'react'
import img from '../app-assets/images/pages/sheep.jpg'

export const withTasks = WrappedComp => {
    const tasks = [
        {
            title: 'Need to complete task',
            completed: false,
            img,
            label: {
                name: 'Reproduction',
                color: 'bullet-danger'
            }
        }, {
            title: 'Need to complete task 2',
            img,
            completed: true,
            label: {
                name: 'Reproduction',
                color: 'bullet-danger'
            }
        }, {
            title: 'Need to complete task 3',
            img,
            completed: false,
            label: {
                name: 'Reproduction',
                color: 'bullet-danger'
            }
        }, {
            title: 'Need to complete task 4',
            img,
            completed: true,
            label: {
                name: 'Reproduction',
                color: 'bullet-danger'
            }
        },
        {
            title: 'Need to complete task',
            completed: false,
            img,
            label: {
                name: 'Reproduction',
                color: 'bullet-danger'
            }
        }, {
            title: 'Need to complete task 2',
            img,
            completed: true,
            label: {
                name: 'Reproduction',
                color: 'bullet-danger'
            }
        }, {
            title: 'Need to complete task 3',
            img,
            completed: false,
            label: {
                name: 'Reproduction',
                color: 'bullet-danger'
            }
        }, {
            title: 'Need to complete task 4',
            img,
            completed: true,
            label: {
                name: 'Reproduction',
                color: 'bullet-danger'
            }
        }
    ]
    return props => {
        return <WrappedComp tasks={tasks} {...props} />
    }
}