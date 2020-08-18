import React, { useState } from 'react';
import ThemeProvider from './utils/ThemeProvider'
// import Avatar from 'rsuite/lib/Avatar'
import { SPELL_ICON_URL } from './utils/constants'
import Editor from './components/Editor'
import TagPicker from 'rsuite/lib/TagPicker'
import Input from 'rsuite/lib/Input'
import Container from 'rsuite/lib/Container'
import ItemDrawer from './components/ItemDrawer'
import Panel from 'rsuite/lib/Panel'
import Button from 'rsuite/lib/Button'
import SelectedItem from './components/SelectedItem'
import FlexboxGrid from 'rsuite/lib/FlexboxGrid'
import List from 'rsuite/lib/List'
import Modal from 'rsuite/lib/Modal'
import { useSelector, useDispatch } from 'react-redux'
import { getBuild, getSpells, setSpells, selectSpell } from './reducer/buildReducer'
import './App.css';

const tagData = [
    {value: "pve", label: "PvE"},
    {value: "pvp", label: "PvP"},
    {value: "zvz", label: "ZvZ"},
    {value: "hce", label: "HCE"},
    {value: "solo", label: "Solo"},
    {value: "ganking", label: "Ganking"},
]

const itemTypes = [
    "mainhand",
    "offhand",
    "head",
    "armor",
    "shoes",
    "cape",
    "food",
    "potion",
]

const App = () => {
    const [theme] = useState(window.localStorage.getItem('theme') || 'light')
    const [itemDrawer, setItemDrawer] = useState("")
    const [name, setName] = useState("")
    const [tags, setTags] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const build = useSelector(getBuild)
    const spells = useSelector(getSpells)
    const dispatch = useDispatch()

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

    const handleModalClose = () => {
        setModalOpen(false)
    }

    const handleSelectSpell = (spell) => {
        dispatch(selectSpell(spell))
        setModalOpen(false)
    }

    const renderModal = () => {
        const theme = window.localStorage.getItem('theme')
        return (
            <Modal
                show={modalOpen}
                onHide={handleModalClose}>
                <Modal.Header>
                    <Modal.Title>Select Ability</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {spells.map((a) => (
                        <Panel
                            key={a.uniqueName}
                            onClick={() => handleSelectSpell({ name: a.localizedNames['EN-US'], uniqueName: a.uniqueName })}
                            style={{
                                cursor: "pointer",
                                margin: "auto",
                                marginBottom: "1rem",
                                width: "95%",
                                backgroundColor: theme === 'dark' ? "#0f131a" : "#FFF"
                            }}
                            shaded
                        >
                            <FlexboxGrid style={{ width: "100%" }} align="middle">
                                <FlexboxGrid.Item colSpan={4} style={{ marginRight: "1rem" }}>
                                    <img alt={a.localizedNames['EN-US']} src={`${SPELL_ICON_URL}${a.uniqueName}?size=64`} />
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item colspan={20}>
                                    <p style={{ fontWeight: 'bold' }}>{a.localizedNames['EN-US']}</p>
                                    <p>{a.localizedDescriptions['EN-US']}</p>
                                </FlexboxGrid.Item>
                            </FlexboxGrid>
                        </Panel>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleModalClose} appearance="subtle">Cancel</Button>
                    <Button onClick={handleModalClose} appearance="primary">Save</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    const openSpellModal = (spells, slot, index, type) => {
        dispatch(setSpells({
            spells,
            currentSlot: slot,
            currentSpellIndex: index,
            currentSlotType: type
        }))
        setModalOpen(true)
    }

    const renderItemSelector = itemType => {
        return (
            <SelectedItem
                selectSpells={openSpellModal}
                key={itemType}
                item={build[itemType]}
                itemType={itemType}
                onClick={handleOpenDrawer(itemType)}
            />
        )
    }

    const renderItemSelectors = () => {
        return (
            <div style={{ width: "100%", maxWidth: 500, marginBottom: "1rem" }}>
                <p>Select Items</p>
                <List bordered size="lg" >
                    {itemTypes.map(renderItemSelector)}
                </List>
            </div>
        )
    }

    const renderNameInput = () => {
        return (
            <div style={{ width: "100%", maxWidth: 500, marginBottom: "1rem" }}>
                <p>Enter Build Name</p>
                <Input
                    value={name}
                    onChange={setName}
                />
            </div>
        )
    }

    const renderDescriptionEditor = () => {
        return (
            <div style={{ width: "100%", maxWidth: 500, marginBottom: "1rem" }}>
                <Editor />
            </div>
        )
    }

    const renderTagPicker = () => {
        return (
            <div style={{width: "100%", marginBottom: "1rem", maxWidth: 500}}>
                <p>Select Tags</p>
                <TagPicker 
                    block
                    value={tags}
                    onChange={setTags}
                    data={tagData} 
                />
            </div>
        )
    }

    // const renderMannequin = () => {
    //     return (
    //         <div>
    //             <FlexboxGrid align="middle">
    //                 <FlexboxGrid.Item>
    //                     <div>
    //                         <Avatar size="lg" src={build.mainhand ? `${ITEM_ICON_URL}/${build?.mainhand?.uniqueName}` : null} alt="MH" />
    //                     </div>
    //                     <div>
    //                         <Avatar size="lg">F</Avatar>
    //                     </div>
    //                 </FlexboxGrid.Item>
    //                 <FlexboxGrid.Item>
    //                     <div>
    //                         <Avatar size="lg">H</Avatar>
    //                     </div>
    //                     <div>
    //                         <Avatar size="lg">A</Avatar>
    //                     </div>
    //                     <div>
    //                         <Avatar size="lg">S</Avatar>
    //                     </div>
    //                 </FlexboxGrid.Item>
    //                 <FlexboxGrid.Item>
    //                     <div>
    //                         <Avatar size="lg">OH</Avatar>
    //                     </div>
    //                     <div>
    //                         <Avatar size="lg">P</Avatar>
    //                     </div>
    //                 </FlexboxGrid.Item>
    //             </FlexboxGrid>
    //         </div>
    //     )
    // }

    return (
        <ThemeProvider theme={theme}>
            <Container style={{ padding: "1rem" }}>
                {renderNameInput()}
                {renderTagPicker()}
                {renderItemSelectors()}
                {renderDescriptionEditor()}
            </Container>
            {itemTypes.map(renderItemDrawer)}
            {renderModal()}
        </ThemeProvider>
    )
}

export default App