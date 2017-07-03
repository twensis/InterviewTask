import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Grid from '../components/Grid'
import SearchBox from '../components/SearchBox'
import * as employeesActions from '../actions/employeesActions'
import { bindActionCreators } from 'redux'
import Pager from 'react-pager';

class Employees extends Component {
    constructor(props){
        super(props)
        this.state = {currentPage: 0, pageSize: 5, searchValue: ''}
        this.search = this.search.bind(this)
        this.changePage = this.changePage.bind(this)
        this.getOrderedData = this.getOrderedData.bind(this)
    }
    componentDidMount() {
        this.props.employeesActions.getEmployeesData({pageSize: this.state.pageSize})
    }

    search(e) {
        this.props.employeesActions.getEmployeesData({searchValue: e.target.value, orderColumnName: this.state.orderColumnName, orderType: this.state.orderType})
        this.setState(() => {return {searchValue: e.target.value, currentPage: 0}})
    }
    changePage(pageNumber) {
        if (pageNumber === this.state.currentPage) return
        this.props.employeesActions.getEmployeesData({pageNumber: pageNumber, orderColumnName: this.state.orderColumnName, orderType: this.state.orderType})
        this.setState(() => {
            return {currentPage: pageNumber}
        })
    }
    getOrderedData(orderColumnName, orderType) {
        this.props.employeesActions.getEmployeesData({orderColumnName: orderColumnName, orderType: orderType, searchValue: this.state.searchValue})
        this.setState(() => {return {orderColumnName: orderColumnName, orderType: orderType, currentPage: 0}})
    }
    render() {
        const { employeesData } = this.props
        return (
            <div id="employees">
                <SearchBox
                    id = "searchBox"
                    placeHolder = "Search employees"
                    onChange = {this.search}
                    size = {50}
                    debounceTime = {750}
                 />
                <Grid 
                    id = "dataGrid"
                    gridData = {employeesData.gridData}
                    getOrderedData = {this.getOrderedData}//props.employeesActions.getEmployeesData}
                />
                <Pager
                    total= {Math.ceil(employeesData.totalCount / this.state.pageSize)}
                    current={this.state.currentPage}
                    visiblePages={6}
                    titles={{ first: 'First', last: 'Last' }}
                    className="pagination-sm pull-right"
                    onPageChanged={this.changePage}
                />
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        employeesData: state.employees.employeesData
    }
}

function mapDispatchToProps(dispatch) {
    return {
        employeesActions: bindActionCreators(employeesActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Employees)