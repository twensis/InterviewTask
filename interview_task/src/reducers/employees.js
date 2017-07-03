import { GET_GRID_DATA } from '../constants/employees'

const initialState = {
    employeesData: {}
}

export default function employees(state = initialState, action) {
    switch (action.type) {
        case GET_GRID_DATA:
            return { ...state, employeesData : {gridData: action.data.Employees, totalCount: action.data.TotalCount}}
        default:
            return state;
    }
}

