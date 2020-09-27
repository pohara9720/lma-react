import React from 'react'

export const withSales = WrappedComp => {
    const animals = [
        {
            id: 1,
            invoice: '902',
            customer: 'Martha',
            date: '12-12-1992',
            tags: '1872',
            status: '3',
            amount: '$20.00'
        },
        {
            id: 2,
            invoice: '463',
            customer: 'Martha',
            date: '12-12-1992',
            tags: '31',
            status: '3',
            amount: '$20.00'
        },
        {
            id: 3,
            invoice: '747',
            customer: 'Martha',
            date: '12-12-1992',
            tags: '42',
            status: '3',
            amount: '$20.00'
        },
        {
            id: 4,
            invoice: '64',
            customer: 'Martha',
            date: '12-12-1992',
            tags: '432',
            status: '3',
            amount: '$20.00'
        },
        {
            id: 5,
            invoice: '454',
            customer: 'Martha',
            date: '12-12-1992',
            tags: 'CATTLE',
            status: '3',
            amount: '$20.00'
        },
        {
            id: 6,
            invoice: '123123',
            customer: 'Martha',
            date: '12-12-1992',
            tags: 'CATTLE',
            status: '3',
            amount: '$20.00'
        },
        {
            id: 8,
            invoice: '312',
            customer: 'Martha',
            date: '12-12-1992',
            tags: 'CATTLE',
            status: '3',
            amount: '$20.00'
        },
        {
            id: 7,
            invoice: '12',
            customer: 'Martha',
            date: '12-12-1992',
            tags: 'CATTLE',
            status: '3',
            amount: '$20.00'
        },

    ]
    return props => {
        return <WrappedComp sales={animals} {...props} />
    }
}