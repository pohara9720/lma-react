import React from 'react'
import { RadialChart, XYPlot, XAxis, YAxis, VerticalGridLines, LineSeries } from 'react-vis'
import styled from 'styled-components'

const PieContainer = styled.div`
    display:flex;
    align-items:center;
    flex-direction:row;
    justify-content:space-between;
`


export const ProfitTab = () => {
    const myData = [{ angle: 1, label: 'Label', color: 'yellow' }, { angle: 2, label: 'Label', color: 'blue' }, { angle: 3, label: 'Label', color: 'red' }]
    return (
        <div className="tab-pane pl-0" id="profitability" aria-labelledby="profitability-tab" role="tabpanel">
            {/* <XYPlot width={500} height={300}>
                <XAxis />
                <YAxis />
                <LineSeries data={[{ x: 1, y: 10 }, { x: 2, y: 5 }, { x: 3, y: 15 }]} />
            </XYPlot> */}
            <PieContainer>
                <div>
                    <h4>Sales</h4>
                    <RadialChart
                        data={myData}
                        width={300}
                        height={300}
                        label='Sales'
                        labelsAboveChildren
                        showLabels
                    />
                </div>
                <div>
                    <h4>Expenses</h4>
                    <RadialChart
                        data={myData}
                        width={300}
                        height={300}
                        label='Sales'
                        labelsAboveChildren
                        showLabels
                    />
                </div>
            </PieContainer>
            {/* <div className="card widget-order-activity">
                <div className="card-header d-md-flex justify-content-between align-items-center">
                    <h4 className="card-title">Sales</h4>
                    <div className="header-right mt-md-0 mt-50">
                        <fieldset className="d-inline-block form-group position-relative has-icon-left mb-50">
                            <input type="text" className="form-control daterange" />
                            <div className="form-control-position">
                                <i className='bx bx-calendar'></i>
                            </div>
                        </fieldset>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn active">Monthly</button>
                            <button type="button" className="btn">Annually</button>
                        </div>
                    </div>
                </div>
                <div className="card-content">
                    <div className="card-body">
                        <div id="order-activity-line-chart"></div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h4 className="card-title">Sales</h4>
                            <a href="">View</a>
                        </div>
                        <div className="card-content">
                            <div id="radial-chart-multi"></div>
                            <ul className="list-inline text-center">
                                <li className="mr-2"> <span className="bullet bullet-xs bullet-primary mr-50"></span>Steers</li>
                                <li className="mr-2"> <span className="bullet bullet-xs bullet-warning mr-50"></span>Embryos</li>
                                <li> <i className="bullet bullet-xs bullet-danger mr-50"></i>Heifers</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h4 className="card-title">Expenses</h4>
                            <a href="">View</a>
                        </div>
                        <div className="card-content">
                            <div id="radial-chart-multi2"></div>
                            <ul className="list-inline text-center">
                                <li className="mr-2"> <span className="bullet bullet-xs bullet-primary mr-50"></span>Steers</li>
                                <li className="mr-2"> <span className="bullet bullet-xs bullet-warning mr-50"></span>Embryos</li>
                                <li> <i className="bullet bullet-xs bullet-danger mr-50"></i>Heifers</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}