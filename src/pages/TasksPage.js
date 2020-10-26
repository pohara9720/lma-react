import React, { useEffect, useState } from 'react'
import { BreadCrumbs } from '../components/molecules/BreadCrumbs'
import { PageHeaderActions } from '../components/molecules/PageHeaderActions'
import { useModal } from '../hooks/useModal'
import { AddorEditTask } from '../components/organisms/AddorEditTask'
import { TodoSidebar } from '../components/molecules/TodoSidebar'
import { Todos } from '../components/organisms/Todos'
import { connect } from 'react-redux'
import { loadTasks, setTaskModal, setEditTask, setTaskItems } from '../redux/actions/tasks'
import { api } from '../helpers/api'
import { displayToast, price } from '../helpers/index'
import { FEED, REPRODUCTION, BREEDING, OTHER, HEALTH } from '../dictionary'
import { PageWrapper } from '../components/atoms/PageWrapper'

export const TasksPageRaw = ({
    tasks,
    loadTasks,
    taskModalOpen,
    setTaskModal,
    setEditTask,
    resetTaskItems
}) => {
    const { toggle, Modal } = useModal(taskModalOpen)
    const [active, setActive] = useState('All Tasks')
    const [filtered, setFiltered] = useState(tasks)

    useEffect(() => {
        const value = () => {
            switch (active) {
                case 'Health': return tasks.filter(({ category }) => category === HEALTH)
                case 'Feed': return tasks.filter(({ category }) => category === FEED)
                case 'Reproduction': return tasks.filter(({ category }) => category === REPRODUCTION)
                case 'Breeding': return tasks.filter(({ category }) => category === BREEDING)
                case 'Other': return tasks.filter(({ category }) => category === OTHER)
                case 'Not Completed': return tasks.filter(({ completed }) => completed === false)
                case 'Completed': return tasks.filter(({ completed }) => completed === true)
                case 'All Tasks': return tasks
                default: return tasks
            }
        }
        const filter = value()
        setFiltered(filter)
    }, [active, tasks])

    const onFilterClick = item => setActive(item.name)

    const fetch = async () => {
        const { data: init } = await api.get('task')
        loadTasks(init.results)
    }

    useEffect(() => {
        fetch()
    }, [])

    const onSubmit = async values => {
        try {
            const { animals, users, cost, breeding, ...rest } = values
            const animalIds = animals && animals.map(({ value }) => value)
            const userIds = users.map(({ value }) => value)
            const breedingValue = !breeding ? null : breeding.map(({ breeding_selection, ...rest }) => ({ breeding_selection: JSON.parse(breeding_selection), ...rest }))
            const payload = {
                users: userIds,
                animals: animalIds,
                cost: cost ? price(cost) : 0,
                breeding: breedingValue,
                ...rest
            }
            const { data } = await api.post('task/', payload)
            loadTasks([data, ...filtered])
            toggle()
            displayToast({ success: true })
        } catch (error) {
            displayToast({ error: true })
        }

    }

    const onEdit = async (values, id) => {
        try {
            const { animals, users, cost, breeding, ...rest } = values
            const animalIds = animals && animals.map(animal => animal.value ? animal.value : animal)
            const userIds = users.map(user => user.value ? user.value : user)
            const breedingValue = !breeding ? null : breeding.map(({ breeding_selection, ...rest }) => ({ breeding_selection: JSON.parse(breeding_selection), ...rest }))
            const payload = {
                users: userIds,
                animals: animalIds,
                cost: cost ? price(cost) : 0,
                breeding: breedingValue,
                ...rest
            }
            const { data } = await api.patch(`task/${id}/`, payload)
            const updated = tasks.filter(x => x.id !== id)
            loadTasks([data, ...updated])
            toggle()
            displayToast({ success: true })
        } catch (error) {
            displayToast({ error: true })
        }
    }

    const onClose = () => {
        toggle()
        setTaskModal(false)
        setEditTask(null)
        resetTaskItems()
    }

    const onEditTask = item => {
        toggle()
        setTaskModal(false)
        setEditTask(item)
        resetTaskItems()
    }
    return (
        <PageWrapper fullScreen>
            <BreadCrumbs />
            <div className="content-body">
                <section className="invoice-list-wrapper">
                    <PageHeaderActions title='New Task' onAdd={toggle} />
                    <div className='tasks-container-p'>
                        <TodoSidebar active={active} onClick={onFilterClick} />
                        <Todos onEditTask={onEditTask} tasks={filtered} />
                    </div>
                </section>
                <Modal actionless title='New Task' onClose={onClose}>
                    <AddorEditTask onEdit={onEdit} onClose={onClose} onSubmit={onSubmit} />
                </Modal>
            </div>
        </PageWrapper>
    )
}

const mapStateToProps = ({ tasks, taskModalOpen }) => ({ tasks, taskModalOpen })

const mapDispathToProps = dispatch => ({
    loadTasks: (tasks) => dispatch(loadTasks({ tasks })),
    setTaskModal: (boolean) => dispatch(setTaskModal(boolean)),
    setEditTask: (task) => dispatch(setEditTask({ task })),
    resetTaskItems: () => dispatch(setTaskItems({ taskItems: [] }))
})

export const TasksPage = connect(mapStateToProps, mapDispathToProps)(TasksPageRaw)

