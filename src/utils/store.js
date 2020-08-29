import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import build from '../reducers/buildReducer'
import ui from '../reducers/interfaceReducer'
import battle from '../reducers/battleReducer'

const reducer = combineReducers({
    build,
    ui,
    battle,
})

const store = configureStore({
    reducer,
})

export default store;