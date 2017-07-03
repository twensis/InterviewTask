import {GET_GRID_DATA} from '../constants/employees'
import axios from 'axios';
import {employeesDataApi} from '../services/employeesServices'

export function getEmployeesData(params={}) {
    return function (dispatch) {
        axios.get(employeesDataApi.url, {
                params: {...employeesDataApi.defaultProps, ...params}
            })
            .then((response)=> {
                dispatch({type: GET_GRID_DATA, data: response.data})
                console.log(response);
            })
            .catch((error) => {console.log(error);
            });
    }
}