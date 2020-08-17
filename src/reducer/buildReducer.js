import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchItemData = createAsyncThunk('build/fetchItemData', async ({item, itemType}, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`http://localhost:5000/data/${item.uniqueName}`)
        return {data, itemType}
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})

const slice = createSlice({
    name: 'build',
    initialState: {
        head: null,
        armor: null,
        shoes: null,
        cape: null,
        potion: null,
        food: null,
        mainhand: null,
        offhand: null,
    },
    reducers: {
        
    },
    extraReducers: {
        [fetchItemData.fulfilled]: (state, action) => {
            state[action.payload.itemType] = action.payload.data
        }
    }
});

export default slice.reducer

export const getBuild = state => state.build