import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { BreadCrumbs } from '../components/molecules/BreadCrumbs'
import { AnimalInfo } from '../components/molecules/AnimalInfo'
import { BreedingTab } from '../components/organisms/BreedingTab'
import { HealthTab } from '../components/organisms/HealthTab'
import { OffspringTab } from '../components/organisms/OffspringTab'
import { ProfitTab } from '../components/organisms/ProfitTab'
import { Tabs } from '../components/molecules/Tabs'
import { useFetch } from '../hooks/useFetch'
import { Loading } from '../components/atoms/Loading'

export const AnimalDetailPageRaw = ({ match }) => {
    const [active, setActive] = useState('Breeding')

    const { data, loading, error } = useFetch(`/animal/${match.params.animalId}`)

    if (loading) return <Loading />
    if (error) throw error

    console.log(data)

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

    const renderPage = (active) => {
        switch (active) {
            case 'Profitability': return <ProfitTab />
            case 'Offspring': return <OffspringTab />
            case 'Health': return <HealthTab />
            case 'Breeding': return <BreedingTab />
            default: return <BreedingTab />
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
                            <AnimalInfo animal={data} />
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