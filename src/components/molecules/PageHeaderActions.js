import React from 'react'
import { getPdf } from '../../helpers/api'
import { ImportCSVFile } from '../atoms/FileInput'

export const PageHeaderActions = ({ title, onAdd, onExport, onImport, refetch }) => {
    const [action, entity] = title.split(' ')
    return (
        <div className="d-flex">
            <div className="invoice-create-btn mb-1 pr-1 flex-grow-1">
                <a href="#" onClick={onAdd} className="btn btn-primary glow invoice-create" id="add-animal" role="button"
                    aria-pressed="true">{action}<span className="d-none d-lg-inline"> {entity}</span></a>
            </div>
            {onExport &&
                <div className="csv-btn mb-1 pr-1">
                    <a href={getPdf(onExport)} target="_blank" className="btn border glow invoice-create" role="button" aria-pressed="true">Export</a>
                </div>
            }
            {onImport &&
                <ImportCSVFile entity={onImport} refetch={refetch} />
            }
        </div>
    )
}