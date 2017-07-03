import { createStore, applyMiddleware, compose} from 'redux'
import rootReducer from '../reducers'
import createLogger from 'redux-logger'
import ReduxThunk from 'redux-thunk'

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(ReduxThunk),
            applyMiddleware(createLogger),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    )

    // if (module.hot) {
    //     module.hot.accept('../reducers', () => {
    //         const nextRootReducer = require('../reducers')
    //         store.replaceReducer(nextRootReducer)
    //     })
    // }
    //
 
    return store
}


