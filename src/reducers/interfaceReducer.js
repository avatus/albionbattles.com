import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'ui',
    initialState: {
        expanded: true,
        searchTerm: null
    },
    reducers: {
        setSearch: (state, action) => {
            state.searchTerm = action.payload
        },
        setExpanded: (state, action) => {
            state.expanded = action.payload
        },
    }
});

export default slice.reducer

export const getExpanded = state => state.expanded
export const getSearchTerm = state => state.searchTerm

export const {
    setExpanded,
    setSearch,
} = slice.actions
