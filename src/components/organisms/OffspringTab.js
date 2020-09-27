import React from 'react'
import cow from '../../app-assets/images/slider/cow-face.jpg'


export const OffspringTab = () => {
    return (
        <div className="tab-pane pl-0" id="offspring" aria-labelledby="offspring-tab" role="tabpanel">
            <div className="card border">
                <div className="card-content">
                    <div className="card-body">
                        <h4 className="card-title">Offspring</h4>
                        <ul className="list-unstyled mb-0">
                            <li className="media my-50">
                                <a href="JavaScript:void(0);">
                                    <div className="avatar mr-1">
                                        <img src={cow} alt="avtar images" width="32" height="32" />
                                    </div>
                                </a>
                                <div className="media-body">
                                    <h6 className="media-heading mb-0"><a href="javaScript:void(0);">HSC Eva 5069 ET</a></h6>
                                    <small className="text-muted">Heiffer</small>
                                </div>
                            </li>
                            <li className="media my-50">
                                <a href="JavaScript:void(0);">
                                    <div className="avatar mr-1">
                                        <img src={cow} alt="avtar images" width="32" height="32" />
                                    </div>
                                </a>
                                <div className="media-body">
                                    <h6 className="media-heading mb-0"><a href="javaScript:void(0);">HSC Eva 5521 ET</a></h6>
                                    <small className="text-muted">Heiffer</small>
                                </div>
                            </li>
                            <li className="media my-50">
                                <a href="JavaScript:void(0);">
                                    <div className="avatar mr-1">
                                        <img src={cow} alt="avtar images" width="32" height="32" />
                                    </div>
                                </a>
                                <div className="media-body">
                                    <h6 className="media-heading mb-0"><a href="javaScript:void(0);">HSC Eva 6431 ET</a></h6>
                                    <small className="text-muted">Heiffer</small>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}