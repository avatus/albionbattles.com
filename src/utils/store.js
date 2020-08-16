import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import build from '../reducer/buildReducer'
const reducer = combineReducers({
    build,
})

const store = configureStore({
    reducer,
})

export default store;