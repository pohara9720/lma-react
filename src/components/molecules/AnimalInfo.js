import React from 'react'
import cow from '../../app-assets/images/slider/cow.jpg'

export const AnimalInfo = ({ animal }) => {
    const {
        registration_number,
        type,
        dob,
        father,
        mother,
        attachment,
        header_image = cow,
        profile_image = cow
    } = animal || {}
    return (
        <div className="col-md-4 animal-detail-profile">
            <div className="card mb-100" style={{ marginBottom: '9rem' }}>
                <div className="card-content" style={{ backgroundColor: 'transparent', color: 'transparent' }}>
                    <img className="card-img-top img-fluid" src={cow} alt="Card image cap" />
                    <img className="animal-info-p justify-content-center" src={cow} alt="avatar" height="180" width="180" />
                </div>
            </div>
            <div className="card">
                <div className="card-content">
                    <div className="card-content">
                        <div className="card-body">
                            <h4 className="card-title">Details</h4>
                            <div className="d-flex justify-content-between mb-1">
                                <span>Registration #</span>
                                <span>{registration_number}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-1">
                                <span>Breed</span>
                                <span>{type}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-1">
                                <span>DOB</span>
                                <span>{dob}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-1">
                                <span>Sire</span>
                                <span>{father}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-1">
                                <span>Dam</span>
                                <span>{mother}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-1">
                                <span><i className="bx bxs-file-pdf"></i></span>
                                <span>{attachment}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}