import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'ui',
    initialState: {
        expanded: true,
        multi: false,
        multiIdList: []
    },
    reducers: {
        setMulti: (state, action) => {
            state.multi = action.payload
        },
        setExpanded: (state, action) => {
            state.expanded = action.payload
        },
        setMultiIdList: (state, action) => {
            state.multiIdList.includes(action.payload)
            ? state.multiIdList = state.multiIdList.filter(i => i !== action.payload)
            : state.multiIdList = state.multiIdList.concat([action.payload])
        }
    }
});

export default slice.reducer

export const getExpanded = state => state.expanded
export const getMulti = state => state.ui.multi
export const getMultiIdList = state => state.ui.multiIdList

export const {
    setExpanded,
    setMulti,
    setSearch,
    setMultiIdList,
} = slice.actions
