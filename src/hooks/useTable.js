import React, { useState } from 'react'
import { Table as TableComponent } from '../components/organisms/Table'


export const useTable = (data, columns) => {
    const [checked, setChecked] = useState([])
    const [page, setPage] = useState(1)
    const { previous, next, results } = data || {}
    const pagination = { previous, next, page, setPage }
    const [all, setAll] = useState(false)
    const onAll = data => {
        const ids = data.map(({ id }) => id)
        setAll(!all)
        if (!all) {
            setChecked(ids)
        } else {
            setChecked([])
        }
    }

    const clear = () => setChecked([])

    const Table = () =>
        <TableComponent
            data={results}
            columns={columns}
            setChecked={setChecked}
            checked={checked}
            all={all}
            onAll={onAll}
            pagination={pagination}
        />

    return { selected: checked, Table, page, clear }
}

