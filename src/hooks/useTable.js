import React, { useState } from 'react'
import { Table as TableComponent } from '../components/organisms/Table'


export const useTable = (data, columns) => {
    const [checked, setChecked] = useState([])
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
    const Table = () => {
        return <TableComponent data={data} columns={columns} setChecked={setChecked} checked={checked} all={all} onAll={onAll} />
    }
    return { selected: checked, Table }
}