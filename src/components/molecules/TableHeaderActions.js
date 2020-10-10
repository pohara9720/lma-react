import React from 'react'
import { ActionDropdown } from '../atoms/ActionDropdown'
import { useSearch } from '../../hooks/useSearch'

export const TableHeaderActions = ({ filters, options, searchConfig }) => {
    const width = options || filters ? '80%' : '100%'
    const { entity, keys, setter } = searchConfig
    const { onChange, value } = useSearch(entity, keys, setter, width)
    return (
        <div className="action-dropdown-btn th-actions">
            <input className="form-control" value={value} style={{ width }} type='search' placeholder='Search' onChange={onChange} />
            {options &&
                <>
                    {filters && <ActionDropdown options={filters} />}
                    {options && <ActionDropdown options={options} />}
                </>
            }
        </div>
    )
}