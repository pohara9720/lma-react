import React, { useEffect, useState } from 'react'
import cow from '../../app-assets/images/slider/cow.jpg'
import { Link } from 'react-router-dom'
import { define, animalSubTypes } from '../../dictionary'


export const OffspringTab = ({ offspring, setActive }) => (
    <div className="tab-pane pl-0" id="offspring" aria-labelledby="offspring-tab" role="tabpanel">
        <div className="card border">
            <div className="card-content">
                <div className="card-body">
                    <h4 className="card-title">Offspring</h4>
                    <ul className="list-unstyled mb-0">
                        {!offspring.length ? <div>No offspring</div> :
                            offspring.map(({ header_image, id, name, sub_type, tag_number, type }) =>
                                <li key={id} className="media my-50" style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="avatar mr-1">
                                        <img src={header_image || cow} alt="avtar images" width="32" height="32" />
                                    </div>
                                    <div className="media-body">
                                        <h6 className="media-heading mb-0">
                                            <Link to={`/animals/${id}`} onClick={() => setActive('Breeding')}>
                                                {`${name} (Tag # ${tag_number})`}
                                            </Link>
                                        </h6>
                                        <small className="text-muted">{define(animalSubTypes[type], sub_type)}</small>
                                    </div>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    </div >
)
