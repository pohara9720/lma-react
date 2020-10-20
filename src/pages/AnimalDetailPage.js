import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { BreadCrumbs } from '../components/molecules/BreadCrumbs'
import { AnimalInfo } from '../components/molecules/AnimalInfo'
import { BreedingTab } from '../components/organisms/BreedingTab'
import { HealthTab } from '../components/organisms/HealthTab'
import { OffspringTab } from '../components/organisms/OffspringTab'
import { ProfitTab } from '../components/organisms/ProfitTab'
import { Tabs } from '../components/molecules/Tabs'
import { api } from '../helpers/api'
import { HEALTH } from '../dictionary'

export const AnimalDetailPageRaw = ({ match, ...rest }) => {
    const [active, setActive] = useState('Breeding')
    const [animal, setAnimal] = useState(null)
    const [tasks, setTasks] = useState([])
    const [children, setChildren] = useState([])
    const [breeding, setBreeding] = useState(null)
    const [sales, setSales] = useState(null)

    useEffect(() => {
        const fetch = async () => {
            const { data: animal } = await api.get(`animal/${match.params.animalId}`)
            const { data: tasks } = await api.post(`animal/${animal.id}/get_tasks/`)
            const { data: breedData } = await api.post(`animal/${animal.id}/bred_info/`)
            const { data: children } = await api.post(`animal/get_offspring/`, { id: animal.id, sub_type: animal.sub_type })
            const { data: items } = await api.get(`invoiceitem/${match.params.animalId}/get_sales_for_animal/`)
            setAnimal(animal)
            setTasks(tasks)
            setChildren(children)
            setBreeding(breedData)
            setSales(items)
        }
        fetch()
    }, [match.params.animalId])

    const tabs = [
        {
            title: 'Breeding',
            icon: 'bx bx-show'
        },
        {
            title: 'Health',
            icon: 'bx bx-plus-circle'
        },
        {
            title: 'Offspring',
            icon: 'bx bxs-group'
        },
        {
            title: 'Profitability',
            icon: 'bx bx-bar-chart-square'
        }
    ]

    const { expenses, id } = animal || {}

    const healthTasks = tasks.filter(({ category }) => category === HEALTH)
    const otherTasks = tasks.filter(({ category }) => category !== HEALTH)

    const renderPage = (active) => {
        switch (active) {
            case 'Profitability': return <ProfitTab expenses={expenses} sales={sales} />
            case 'Offspring': return <OffspringTab offspring={children} setActive={setActive} />
            case 'Health': return <HealthTab tasks={healthTasks} />
            case 'Breeding': return <BreedingTab tasks={otherTasks} breeding={breeding} id={id} />
            default: return <BreedingTab tasks={otherTasks} />
        }
    }

    const page = renderPage(active)


    return (
        <div className="app-content content">
            <div className="content-overlay"></div>
            <div className="content-wrapper">
                <BreadCrumbs />
                <div className="content-body">
                    <section className="invoice-list-wrapper">
                        <div className='row'>
                            <AnimalInfo animal={animal} />
                            <div className="col-md-8 animal-detail-info">
                                <div className="card widget-overlay">
                                    <div className="card widget-overlay-card mb-0">
                                        <div className="card-content">
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                <Tabs tabs={tabs} active={active} setActive={setActive} />
                                            </div>
                                            <div style={{ padding: 16 }}>
                                                {page}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export const AnimalDetailPage = withRouter(AnimalDetailPageRaw)