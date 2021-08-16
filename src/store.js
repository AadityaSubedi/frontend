import { createStore,combineReducers,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension' 
import { programListReducer , programDetailReducer } from './reducers/programReducers'

const reducer = combineReducers({

    programList: programListReducer,
    programDetail: programDetailReducer,
})

const initialState ={}

const middleware = [thunk]

const store= createStore(reducer, initialState,
     composeWithDevTools(applyMiddleware(...middleware)))

export default store

