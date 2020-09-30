import React from 'react'
import { withRouter } from 'react-router-dom'

export const TableRaw = ({ data, checked, setChecked, columns, all, onAll, history, match }) => {
    const isChecked = key => checked.includes(key)

    const onCheck = key => checked.includes(key)
        ? setChecked(state => state.filter(x => x !== key))
        : setChecked(state => [...state, key])

    const headers = columns.map(({ label }, i) => <th key={i}>{label}</th>)

    const rows = data && data.map((item, i) => {
        return (
            <tr key={i}>
                <td className="dt-checkboxes-cell">
                    <input className="dt-checkboxes" type='checkbox' checked={isChecked(item.id)} onChange={() => onCheck(item.id)} />
                </td>
                {
                    columns.map(({ name, render }, j) => {
                        if (render) {
                            return <td key={j}>{render(item, { history, match })}</td>
                        }
                        return <td key={j}>{item[name] || 'N/A'}</td>
                    })
                }
            </tr>
        )
    })

    return (
        <div className="table-responsive table-p">
            <table className="table invoice-data-table dt-responsive nowrap" style={{ width: "100%" }}>
                <thead>
                    <tr>
                        <th className="dt-checkboxes-cell dt-checkboxes-select-all">
                            <input type='checkbox' checked={all} onChange={() => onAll(data)} />
                        </th>
                        {headers}
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    )
}

export const Table = withRouter(TableRaw)