import React, { useState, useEffect } from 'react'
import cattle from '../../../app-assets/images/ocattle.png'
import horses from '../../../app-assets/images/ohorse.png'
import pigs from '../../../app-assets/images/opig.png'
import goats from '../../../app-assets/images/ogoat.png'
import sheep from '../../../app-assets/images/osheep.png'


export const AnimalsStep = ({ setQuantity }) => {
    const [c, setCattle] = useState('')
    const [p, setPig] = useState('')
    const [s, setSheep] = useState('')
    const [h, setHorse] = useState('')
    const [g, setGoats] = useState('')

    useEffect(() => {
        const cn = Number.isNaN(parseFloat(c)) ? 0 : parseFloat(c)
        const pn = Number.isNaN(parseFloat(p)) ? 0 : parseFloat(p)
        const sn = Number.isNaN(parseFloat(s)) ? 0 : parseFloat(s)
        const hn = Number.isNaN(parseFloat(h)) ? 0 : parseFloat(h)
        const gn = Number.isNaN(parseFloat(g)) ? 0 : parseFloat(g)
        const reducer = (accumulator, currentValue) => accumulator + currentValue
        const sum = [cn, pn, sn, hn, gn].reduce(reducer, 0)
        setQuantity(sum)
    }, [c, p, s, h, g])

    return (
        <fieldset>
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-content">
                            <img className="card-img img-fluid" src={cattle} alt="Card image" />
                            <div className="card-img-overlay overlay-dark d-flex justify-content-between flex-column">
                                <div className="overlay-content">
                                    <label htmlFor="checkbox1"><p>Cattle</p></label>
                                </div>
                                <div className="overlay-status d-flex justify-content-center">
                                    <div className="form-group">
                                        <input onChange={(e) => setCattle(e.target.value)} type="number" placeholder="Quantity" className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-content">
                            <img className="card-img img-fluid" src={horses} alt="Card image" />
                            <div className="card-img-overlay overlay-dark d-flex justify-content-between flex-column">
                                <div className="overlay-content">
                                    <label htmlFor="checkbox2"><p>Horses</p></label>
                                </div>
                                <div className="overlay-status d-flex justify-content-center">
                                    <div className="form-group">
                                        <input onChange={(e) => setHorse(e.target.value)} type="number" placeholder="Quantity" className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-content">
                            <img className="card-img img-fluid" src={pigs} alt="Card image" />
                            <div className="card-img-overlay overlay-dark d-flex justify-content-between flex-column">
                                <div className="overlay-content">
                                    <label htmlFor="checkbox3"><p>Pigs</p></label>
                                </div>
                                <div className="overlay-status d-flex justify-content-center">
                                    <div className="form-group">
                                        <input type="number" onChange={(e) => setPig(e.target.value)} placeholder="Quantity" className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-content">
                            <img className="card-img img-fluid" src={goats} alt="Card image" />
                            <div className="card-img-overlay overlay-dark d-flex justify-content-between flex-column">
                                <div className="overlay-content">
                                    <label htmlFor="checkbox4"><p>Goats</p></label>
                                </div>
                                <div className="overlay-status d-flex justify-content-center">
                                    <div className="form-group">
                                        <input type="number" onChange={(e) => setGoats(e.target.value)} placeholder="Quantity" className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-content">
                            <img className="card-img img-fluid" src={sheep} alt="Card image" />
                            <div className="card-img-overlay overlay-dark d-flex justify-content-between flex-column">
                                <div className="overlay-content">
                                    <label htmlFor="checkbox5"><p>Sheep</p></label>
                                </div>
                                <div className="overlay-status d-flex justify-content-center">
                                    <div className="form-group">
                                        <input type="number" onChange={(e) => setSheep(e.target.value)} placeholder="Quantity" className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </fieldset>
    )
}