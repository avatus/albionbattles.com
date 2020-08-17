import React, { useState } from 'react';
import ThemeProvider from './utils/ThemeProvider'
import Container from 'rsuite/lib/Container'
import ItemDrawer from './components/ItemDrawer'
import SelectedItem from './components/SelectedItem'
import List from 'rsuite/lib/List'
import { useSelector } from 'react-redux'
import { getBuild } from './reducer/buildReducer'
import './App.css';

const itemTypes = [
    "mainhand",
    "offhand",
    "armor",
    "head",
    "shoes",
    "cape",
    "potion",
    "food"
]

const App = () => {
    const [theme] = useState(window.localStorage.getItem('theme') || 'light')
    const [itemDrawer, setItemDrawer] = useState("")
    const build = useSelector(getBuild)

    const handleCloseDrawer = () => {
        setItemDrawer("")
    }

    const handleOpenDrawer = name => _ => {
        setItemDrawer(name)
    }

    const renderItemDrawer = itemType => {
        return (
            <ItemDrawer
                key={itemType}
                open={itemDrawer}
                name={itemType}
                handleClose={handleCloseDrawer}
            />
        )
    }

    const renderItemSelector = itemType => {
        return (
            <SelectedItem
                key={itemType}
                item={build[itemType]}
                itemType={itemType}
                onClick={handleOpenDrawer(itemType)}
            />
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <Container style={{ padding: "1rem" }}>
                {itemTypes.map(renderItemDrawer)}
                <List bordered size="lg">
                    {itemTypes.map(renderItemSelector)}
                </List>
                <div style={{marginTop: "1rem"}}>
                </div>
            </Container>
        </ThemeProvider>
    )
}

export default App