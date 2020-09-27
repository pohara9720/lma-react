import React, { useState, useEffect } from 'react'

export const ActionDropdown = ({ options }) => {
    const [active, setActive] = useState(options[0])
    const [open, setOpen] = useState(false)

    const onAction = (option) => {
        setActive(option)
        setOpen(false)
        option.onClick(option)
    }

    useEffect(() => {
        const listener = (event) => {
            const collection = document.getElementsByClassName('action-drop-p');
            const elements = Array.prototype.some.call(collection, (element) => {
                return element.contains(event.target);
            });
            if (!elements) {
                setOpen(false)
            }
        }
        document.addEventListener('click', listener);
        return () => {
            document.removeEventListener('click', listener);
        }
    }, [])

    return (
        <div className="dropdown invoice-filter-action action-drop-p">
            <button style={{ lineHeight: '1.4rem' }} onClick={() => setOpen(!open)} className="btn border dropdown-toggle mr-1" type="button" id="invoice-filter-btn"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {active.label}
            </button>
            <div className="dropdown-menu dropdown-menu-right" style={open ? { display: 'block' } : {}} aria-labelledby="invoice-filter-btn">
                {
                    options.map((option, i) =>
                        <div
                            key={i}
                            onClick={() => onAction(option)}
                            className={`dropdown-item ${option.isDelete ? 'danger' : ''}`}
                        >
                            {option.label}
                        </div>
                    )
                }
            </div>
        </div >
    )
}