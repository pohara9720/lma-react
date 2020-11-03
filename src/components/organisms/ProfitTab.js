import React from 'react'
import {
    RadialChart,
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalBarSeries,
} from 'react-vis'
import { BulletLabel } from '../atoms/BulletLabel'
import styled from 'styled-components'
import { FEED, REPRODUCTION, BREEDING, OTHER, HEALTH, colors } from '../../dictionary'
import { readDate, unique } from '../../helpers/index'
import moment from 'moment'

const Key = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    margin-bottom:16px;
    div {
        margin-right:16px;
    }
`
const PieContainer = styled.div`
    display:flex;
    align-items:center;
    flex-direction:row;
    justify-content:space-between;
    svg {
        overflow:visible;
    }
`

const BarContainer = styled.div`
    margin: 16px 0;
    padding:16px;
    svg {
        overflow:visible;
    }
`

export const ProfitTab = ({ expenses, sales }) => {

    const { offspring, inventory, bar_data } = sales || {}

    const noSaleData = !offspring?.length && !inventory?.length

    const labels = {
        [FEED]: 'Feed',
        [REPRODUCTION]: 'Reproduction',
        [OTHER]: 'Other',
        [HEALTH]: 'Health'
    }

    let mapped = [];

    expenses && expenses.reduce((res, value) => {
        if (!res[value.task_type]) {
            res[value.task_type] = { task_type: value.task_type, cost: 0 };
            mapped.push(res[value.task_type])
        }
        res[value.task_type].cost += value.cost;
        return res;
    }, {});

    const mappedExpenses = mapped?.map(({ task_type, cost }) => ({
        angle: cost,
        label: `${labels[task_type]}`,
        subLabel: `$${(cost / 100).toFixed(2)}`,
        style: { stroke: '#fff', fill: colors[task_type] }
    })) || [{ angle: 1, label: 'No Data' }]

    const reducer = (a, c) => a + c.cost
    const amount = array => array?.reduce(reducer, 0)
    const ov = {
        angle: amount(offspring),
        label: 'Offspring',
        subLabel: `$${amount(offspring)?.toFixed(2)}`,
        style: { stroke: '#fff', fill: colors[BREEDING] }
    }
    const iv = {
        angle: amount(inventory),
        label: 'Inventory',
        subLabel: `$${amount(inventory)?.toFixed(2)}`,
        style: { stroke: '#fff', fill: colors[FEED] }
    }

    const [livestock, stock] = bar_data || []
    const isPastMonth = (date) => {
        const pastMonthFromDate = moment(date).subtract(1, 'M')
        return moment(date).isAfter(pastMonthFromDate)
    }
    const lsData = livestock?.filter(({ sale }) => isPastMonth(sale.due_date)).map(({ cost, sale }) => ({ x: readDate(sale.due_date), y: cost })) || []
    const invData = stock?.filter(({ sale }) => isPastMonth(sale.due_date)).map(({ cost, sale }) => ({ x: readDate(sale.due_date), y: cost })) || []
    // const greenData = [{ x: 'A', y: 10 }, { x: 'B', y: 5 }, { x: 'C', y: 15 }];

    // const blueData = [{ x: 'A', y: 12 }, { x: 'B', y: 2 }, { x: 'C', y: 11 }];

    return (
        <div className="tab-pane pl-0" id="profitability" aria-labelledby="profitability-tab" role="tabpanel">
            <BarContainer>
                <Key>
                    <BulletLabel label='Inventory' color='info' />
                    <BulletLabel label='Offspring' color='primary' />
                </Key>
                {!lsData.length && !invData.length ? <div>No Data</div> :
                    <XYPlot xType="ordinal" width={800} height={300} xDistance={100}>
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis />
                        <YAxis />
                        <VerticalBarSeries data={lsData} stroke='#fff' fill={colors[FEED]} animation />
                        <VerticalBarSeries data={invData} stroke='#fff' fill={colors[OTHER]} animation />
                    </XYPlot>}
            </BarContainer>

            <PieContainer>
                <div>
                    <h4>Sales</h4>
                    {
                        !noSaleData
                            ?
                            <RadialChart
                                data={[ov, iv]}
                                width={300}
                                height={300}
                                showLabels
                                animation
                            />
                            : <div>No Data</div>
                    }
                </div>
                <div>
                    <h4>Expenses</h4>
                    {
                        expenses?.length
                            ?
                            <RadialChart
                                data={mappedExpenses}
                                width={300}
                                height={300}
                                showLabels
                                animation
                            />
                            : <div>No data</div>}
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