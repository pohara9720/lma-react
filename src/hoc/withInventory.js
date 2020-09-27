import React from 'react'
export const withInventory = WrappedComp => {
    const animals = [
        {
            id: 1,
            top_id: '902',
            sire: 'Martha',
            dam: '12-12-1992',
            tank: '1872',
            canister: '3'
        },
        {
            id: 2,
            top_id: '463',
            sire: 'Martha',
            dam: '12-12-1992',
            tank: '31',
            canister: '3'
        },
        {
            id: 3,
            top_id: '747',
            sire: 'Martha',
            dam: '12-12-1992',
            tank: '42',
            canister: '3'
        },
        {
            id: 4,
            top_id: '64',
            sire: 'Martha',
            dam: '12-12-1992',
            tank: '432',
            canister: '3'
        },
        {
            id: 5,
            top_id: '454',
            sire: 'Martha',
            dam: '12-12-1992',
            tank: 'CATTLE',
            canister: '3'
        },
        {
            id: 6,
            top_id: '123123',
            sire: 'Martha',
            dam: '12-12-1992',
            tank: 'CATTLE',
            canister: '3'
        },
        {
            id: 8,
            top_id: '312',
            sire: 'Martha',
            dam: '12-12-1992',
            tank: 'CATTLE',
            canister: '3'
        },
        {
            id: 7,
            top_id: '12',
            sire: 'Martha',
            dam: '12-12-1992',
            tank: 'CATTLE',
            canister: '3'
        },

    ]
    return props => {
        return <WrappedComp inventory={animals} {...props} />
    }
}