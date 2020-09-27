import React from 'react'
import { BreadCrumbs } from '../components/molecules/BreadCrumbs'
import { PageHeaderActions } from '../components/molecules/PageHeaderActions'
import { withRouter } from 'react-router-dom'
import { TableHeaderActions } from '../components/molecules/TableHeaderActions'
import { invoiceFilters, invoiceOptions } from '../dictionary'
import { compose } from 'recompose'
import { withSales } from '../hoc/withSales'
import { useTable } from '../hooks/useTable'
import { StatusBubble } from '../components/atoms/StatusBubble'

export const SalesPageRaw = ({ history, match, sales }) => {
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

export const SalesPage = compose(
    withRouter,
    withSales
)(SalesPageRaw)