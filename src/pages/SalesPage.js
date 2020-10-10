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
import { compare, readDate } from '../helpers/index'
import { PageWrapper } from '../components/atoms/PageWrapper'

export const SalesPageRaw = ({ history, match, sales, loadSales }) => {
    const columns = [
        {
            label: 'Invoice #',
            name: 'number'
        },
        {
            label: 'Amount due (USD)',
            name: 'total',
            render: (({ total }) => total.toFixed(2))
        },
        {
            label: 'Date',
            name: 'due_date',
            render: (({ due_date }) => readDate(due_date))
        },
        {
            label: 'Customer',
            name: 'bill_to_name',
        },
        {
            label: '# of Items',
            name: 'items',
            render: (({ items }) => items.length)
        },
        {
            label: 'Status',
            name: 'status',
            render: (({ status }) => <StatusBubble status={status} />)
        },
    ]
    const { Table, selected } = useTable(sales, columns)

    const searchConfig = {
        entity: 'sale',
        keys: ['bill_to_name'],
        setter: loadSales
    }

    useEffect(() => {
        const fetch = async () => {
            const { data: init } = await api.get('sale')
            console.log('INIT', init)
            loadSales(init)
        }
        fetch()
    }, [])

    return (
        <PageWrapper>
            <BreadCrumbs />
            <div className="content-body">
                <section className="invoice-list-wrapper">
                    <PageHeaderActions title='Create Sale' onAdd={() => history.push(`${match.url}/manage-invoice`)} onExport='sale' />
                    <TableHeaderActions searchConfig={searchConfig} options={invoiceOptions} filters={invoiceFilters} />
                    <Table />
                </section>
            </div>
        </PageWrapper>
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