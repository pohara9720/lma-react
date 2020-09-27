import React from 'react'
import { Link, withRouter } from 'react-router-dom'
export const InvoiceActionsRaw = ({ match, onDownload, onSend, onSave }) => {
    return (
        <div className="col-xl-3 col-md-4 col-12">
            <div className="card invoice-action-wrapper shadow-none border">
                <div className="card-body">
                    {onSave ?
                        <div className="invoice-action-btn">
                            <button onClick={onSave} className="btn btn-light-primary btn-block">
                                <span>Save Invoice</span>
                            </button>
                        </div>
                        :
                        <div>
                            <div className="invoice-action-btn">
                                <button onClick={onSend} className="btn btn-light-primary btn-block">
                                    <span>Send Invoice</span>
                                </button>
                            </div>
                            <div className="invoice-action-btn">
                                <button onClick={onDownload} className="btn btn-light-primary btn-block">
                                    <span>Download</span>
                                </button>
                            </div>
                            <div className="invoice-action-btn">
                                <Link to={`/sales/manage-invoice`} href="invoice-edit.html" className="btn btn-light-primary btn-block">
                                    <span>Edit Invoice</span>
                                </Link>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export const InvoiceActions = withRouter(InvoiceActionsRaw)