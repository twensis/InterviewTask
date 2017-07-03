import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Empoyees from './containers/Employees'
import configureStore from './store/configureStore'
//import './styles/app.css'

const store = configureStore();

render(
     <Provider store={store}>
        <Empoyees />
     </Provider>
,
    document.getElementById('root')
)