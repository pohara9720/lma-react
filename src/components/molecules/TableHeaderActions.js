import React from 'react'
import { ActionDropdown } from '../atoms/ActionDropdown'
import { useSearch } from '../../hooks/useSearch'

export const TableHeaderActions = ({ filters, options, searchConfig, closeOnly }) => {
    const width = options || filters ? '80%' : '100%'
    const { entity, setter } = searchConfig
    const { onChange, value } = useSearch(entity, setter)
    return (
        <div className="action-dropdown-btn th-actions">
            <input className="form-control" value={value} style={{ width }} type='search' placeholder='Search' onChange={onChange} />
            {options &&
                <>
                    {filters && <ActionDropdown options={filters} />}
                    {options && <ActionDropdown options={options} closeOnly={closeOnly} />}
                </>
            }
        </div>
    )
}