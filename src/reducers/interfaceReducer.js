import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'ui',
    initialState: {
        expanded: true,
    },
    reducers: {
        setExpanded: (state, action) => {
            state.expanded = action.payload
        },
    }
});

export default slice.reducer

export const getExpanded = state => state.expanded

export const {
    setExpanded,
} = slice.actions
