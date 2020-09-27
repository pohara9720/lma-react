import React, { useState } from 'react'
import { ActionDropdown } from '../atoms/ActionDropdown'


export const TableHeaderActions = ({ filters, options }) => {
    const width = options || filters ? '80%' : '100%'
    return (
        <div className="action-dropdown-btn th-actions">
            <input className="form-control" style={{ width }} type='search' placeholder='Search' />
            {options &&
                <>
                    <ActionDropdown options={filters} />
                    <ActionDropdown options={options} />
                </>
            }
        </div>
    )
}