import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../styles/employees.less'

export default class Grid extends Component {
    constructor(props){
        super(props)
        this.state = {orderedColumn: ''}
        this.order = this.order.bind(this)
    }

    order(e) {
        let orderType = 0
        let targetColumn = e.target
        let orderedColumn = this.state.orderedColumn
        if (orderedColumn && orderedColumn.textContent === targetColumn.textContent) {
            if (targetColumn.classList.contains('order-ask')) { //desc
                targetColumn.classList.remove('order-ask')
                targetColumn.classList.add('order-desc')
                orderType = 1
            }
            else if (targetColumn.classList.contains('order-desc')) { //asc
                targetColumn.classList.remove('order-desc')
                targetColumn.classList.add('order-ask')
                orderType = 0
            }
        }
        else {
            if (orderedColumn) {
                orderedColumn.classList.remove('order-ask', 'order-desc') //non
                orderedColumn.classList.add('not-order')
            }
            targetColumn.classList.remove('not-order')
            targetColumn.classList.add('order-ask')
            this.setState({orderedColumn: e.target})
        }
        this.props.getOrderedData(targetColumn.textContent, orderType)
    }

    render() {
        const {id, gridData} = this.props
        if (!gridData || gridData.length === 0) {
            return <div id="noData">NoData</div>
        }
        return (
            <table id={id}>
                <tbody>
                <tr onClick={this.order}>
                    {Object.keys(gridData[0]).map((cell, i) => {
                        return <th key={i} className="not-order">{cell}</th>
                    })}
                </tr>
                {gridData.map((row, i) => {
                    return (
                        <tr key={i}>
                            {Object.values(row).map((cell, i) => {
                                return <td key={i}>{cell}</td>
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        )
    }
}
Grid.propTypes = {
    id: PropTypes.string.isRequired,
    gridData: PropTypes.array
}