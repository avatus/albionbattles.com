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
        spells: [],
        currentSlot: null,
        currentSpellIndex: null,
        currentSlotType: null,
        head: null,
        armor: null,
        shoes: null,
        cape: null,
        potion: null,
        food: null,
        mainhand: null,
        offhand: null,
        head_active_spells: {},
        armor_active_spells: {},
        shoes_active_spells: {},
        cape_active_spells: {},
        potion_active_spells: {},
        food_active_spells: {},
        mainhand_active_spells: {},
        offhand_active_spells: {},
        head_passive_spells: {},
        armor_passive_spells: {},
        shoes_passive_spells: {},
        cape_passive_spells: {},
        potion_passive_spells: {},
        food_passive_spells: {},
        mainhand_passive_spells: {},
        offhand_passive_spells: {},
    },
    reducers: {
        removeItem: (state, action) => {
            state[action.payload] = null
        },
        setSpells: (state, action) => {
            state.spells = action.payload.spells
            state.currentSlot = action.payload.currentSlot
            state.currentSpellIndex = action.payload.currentSpellIndex
            state.currentSlotType = action.payload.currentSlotType
        },
        selectSpell: (state, action) => {
            const slot = `${state.currentSlot}_${state.currentSlotType}_spells`
            state[slot][state.currentSpellIndex] = action.payload
            // state.spells = []
            state.currentSlot = null
            state.currentSpellIndex = null
            state.currentSlotType = null
        }
    },
    extraReducers: {
        [fetchItemData.fulfilled]: (state, action) => {
            state[action.payload.itemType] = action.payload.data
        }
    }
});

export default slice.reducer

export const getBuild = state => state.build
export const getSpells = state => state.build.spells

export const { 
    removeItem,
    setSpells,
    selectSpell,
} = slice.actions
