import React, { useEffect } from 'react'
import { BreadCrumbs } from '../components/molecules/BreadCrumbs'
import { PageHeaderActions } from '../components/molecules/PageHeaderActions'
import { withRouter } from 'react-router-dom'
import { TableHeaderActions } from '../components/molecules/TableHeaderActions'
import { invoiceFilters, invoiceOptions } from '../dictionary'
import { compose } from 'recompose'
import { withSales } from '../hoc/withSales'
import { useTable } from '../hooks/useTable'
import { StatusBubble } from '../components/atoms/StatusBubble'
import { api } from '../helpers/api'
import { loadSales } from '../redux/actions/sales'
import { connect } from 'react-redux'
import { compare } from '../helpers/index'

export const SalesPageRaw = ({ history, match, sales, loadSales }) => {
    const columns = [
        {
            label: 'Invoice #',
            name: 'invoice'
        },
        {
            label: 'Amount',
            name: 'amount',
        },
        {
            label: 'Date',
            name: 'date'
        },
        {
            label: 'Customer',
            name: 'customer',

        },
        {
            label: 'Tags',
            name: 'tags',
        },
        {
            label: 'Status',
            name: 'status',
            render: (({ status }) => <StatusBubble status={status} />)
        },
    ]
    const { Table, selected } = useTable(sales, columns)

    useEffect(() => {
        const fetch = async () => {
            const { data: init } = await api.get('sale')
            console.log('INIT', init)
            loadSales(init)
        }
        fetch()
    }, [])


    return (
        <div className="app-content content">
            <div className="content-overlay"></div>
            <div className="content-wrapper">
                <BreadCrumbs />
                <div className="content-body">
                    <section className="invoice-list-wrapper">
                        <PageHeaderActions title='Create Sale' onAdd={() => history.push(`${match.url}/manage-invoice`)} onExport='sale' />
                        <TableHeaderActions options={invoiceOptions} filters={invoiceFilters} />
                        <Table />
                    </section>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ sales }) => ({ sales })

const mapDispatchToProps = dispatch => ({
    loadSales: (sales) => dispatch(loadSales({ sales }))
})

export const SalesPage = compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(SalesPageRaw)