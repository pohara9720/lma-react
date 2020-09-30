import React from 'react'
import { BreadCrumbs } from '../components/molecules/BreadCrumbs'
import { PageHeaderActions } from '../components/molecules/PageHeaderActions'
import { useModal } from '../hooks/useModal'
import { AddorEditTask } from '../components/organisms/AddorEditTask'
import { TodoSidebar } from '../components/molecules/TodoSidebar'
import { Todos } from '../components/organisms/Todos'

export const TasksPage = () => {
    const { toggle, Modal } = useModal()
    return (
        <div className="app-content content">
            <div className="content-overlay"></div>
            <div className="content-wrapper">
                <BreadCrumbs />
                <div className="content-body">
                    <section className="invoice-list-wrapper">
                        <PageHeaderActions title='New Task' onAdd={toggle} />
                        <div className='tasks-container-p'>
                            <TodoSidebar />
                            <Todos />
                        </div>
                    </section>
                    <Modal actionless title='New Task' onClose={toggle} onSubmit={() => console.log('implements')}>
                        <AddorEditTask onClose={toggle} />
                    </Modal>
                </div>
            </div>
        </div>
    )
}

