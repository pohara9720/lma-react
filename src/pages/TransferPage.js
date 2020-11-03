import React, { useEffect, useState } from 'react'
import { api } from '../helpers/api'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { displayToast } from '../helpers/index'

const Container = styled.div`
    padding:64px;
`

const Header = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
    margin-bottom:16px;
    overflow:auto;
`

const Buttons = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:flex-end;
    margin-top:32px;
    button {
        margin:16px;
    }
`

export const TransferPageRaw = ({ history, match }) => {
    const { transferId } = match.params
    const [data, setData] = useState()

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data: init } = await api.post(`transfer/${transferId}/retrieve_transfer/`)
                if (init) {
                    setData(init)
                }
                else {
                    history.push('/animals')
                }
            } catch (error) {
                history.push('/animals')
            }
        }
        fetch()
    }, [])

    const { sale, id } = data || {}
    const { items, title, total } = sale || {}

    const onAccept = async () => {
        try {
            await api.post('transfer/accept/', { id })
            displayToast({ success: true })
            history.push('/animals')
        } catch (error) {
            console.log(error)
            displayToast({ error: true })
        }
    }

    const onDeny = async () => {
        try {
            await api.post('transfer/deny/', { id })
            displayToast({ success: true })
            history.push('/animals')
        } catch (error) {
            displayToast({ error: true })
        }
    }

    return (
        <Container>
            <section className="invoice-list-wrapper">
                <Header>
                    <h1>Invoice: {title}</h1>
                    <h4 className="text-primary text-right font-weight-bold">Total: {total?.toFixed(2)} USD</h4>
                </Header>
                <div className="invoice-product-details table-responsive mx-md-25">
                    <table className="table table-borderless mb-0">
                        <thead>
                            <tr>
                                <th scope="col">Type</th>
                                <th scope="col">Item</th>
                                <th scope="col">Description</th>
                                <th scope="col">Cost</th>
                                <th scope="col">Qty</th>
                                <th scope="col" className="text-right">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items && items.map(({ type, cost, description, inventory, animal, quantity }, i) =>
                                    <tr key={i}>
                                        <td>{type}</td>
                                        <td>{animal ? `${animal.name} (${animal.tag_number})` : `Tank# ${inventory.tank_number}`}</td>
                                        <td>{description}</td>
                                        <td>${cost.toFixed(2)}</td>
                                        <td>{quantity}</td>
                                        <td className="text-primary text-right font-weight-bold">${(quantity * cost).toFixed(2)}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <Buttons>
                    <button onClick={onAccept} className='btn btn-primary invoice-send-btn'>Accept</button>
                    <button onClick={onDeny} style={{ border: "1px solid #ececec" }} className='btn invoice-send-btn'>Deny</button>
                </Buttons>
            </section>
        </Container>
    )
}

export const TransferPage = withRouter(TransferPageRaw)