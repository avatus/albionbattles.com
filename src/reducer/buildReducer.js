import { createSlice } from '@reduxjs/toolkit'

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
        setHead: (state, action) => {
            state.head = action.payload
        },
        setArmor: (state, action) => {
            state.armor = action.payload
        },
        setShoes: (state, action) => {
            state.shoes = action.payload
        },
        setCape: (state, action) => {
            state.cape = action.payload
        },
        setPotion: (state, action) => {
            state.potion = action.payload
        },
        setFood: (state, action) => {
            state.food = action.payload
        },
        setMainhand: (state, action) => {
            state.mainhand = action.payload
        },
        setOffhand: (state, action) => {
            state.offhand = action.payload
        },
    },
});

export default slice.reducer

export const getBuild = state => state.build

export const { 
    setHead,
    setArmor,
    setShoes,
    setCape,
    setPotion,
    setFood,
    setMainhand,
    setOffhand,
} = slice.actions