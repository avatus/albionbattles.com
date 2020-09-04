import React, { useState, useEffect } from 'react';
import ThemeProvider from './utils/ThemeProvider'
import Container from 'rsuite/lib/Container'
import Footer from 'rsuite/lib/Footer'
import reactga from 'react-ga'
// import SideNavigation from './components/SideNavigation'
// import Header from './components/Header'
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom'

// import Home from './pages/Home/Home'
import BattleLog from './pages/BattleLog/BattleLog'
import BattleSearch from './pages/SearchBattles/BattleSearch'

const App = props => {
    useEffect(() => {
        reactga.initialize('UA-174250715-2')
    },[])
    const [theme] = useState(window.localStorage.getItem('theme') || 'light')
    return (
        <ThemeProvider theme={theme}>
            <Router>
                {/* <Header /> */}
                <Container style={{

                }}>
                    <div style={{
                        width: "100%", 
                        display: 'flex', 
                        backgroundSize: "cover",
                        backgroundImage: `url(https://res.cloudinary.com/synaptics/image/upload/v1598945915/rsz_sinyatt_recovered_-01_qgzzeg_fvvwjt.jpg)`,
                        // background: '#444444',
                        backgroundAttachment: 'fixed',
                        padding: 0
                    }}>
                        {/* <SideNavigation /> */}
                        <div style={{
                            minHeight: "100vh",
                            width: "100%", 
                            maxWidth: 1600, 
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}>
                            <Switch>
                                {/* <Route exact path="/" component={Home} /> */}
                                <Route exact path="/battles" component={BattleSearch} />
                                <Route exact path="/battles/:id" component={BattleLog} />
                                <Redirect to="/battles" />
                            </Switch>
                        </div>
                    </div>
                        <Footer style={{
                            width: "100%", 
                            maxWidth: 1600, 
                            color: "#666666",
                            padding: 20,
                            margin: 'auto'}}>
                                <div style={{paddingLeft: 20, paddingRight: 20}}>This killboard is in beta. I have a google analytics tag running but it's only tracking page views, no data is stored. If you find any bugs or have any suggestions please contact me on discord: Alienz#5725</div>
                            </Footer>
                </Container>
            </Router>
        </ThemeProvider>
    )
}

export default App
// import ThemeProvider from './utils/ThemeProvider'
// import { SPELL_ICON_URL } from './utils/constants'
// import Editor from './components/Editor'
// import TagPicker from 'rsuite/lib/TagPicker'
// import Input from 'rsuite/lib/Input'
// import Container from 'rsuite/lib/Container'
// import ItemDrawer from './components/ItemDrawer'
// import Panel from 'rsuite/lib/Panel'
// import Button from 'rsuite/lib/Button'
// import SelectedItem from './components/SelectedItem'
// import FlexboxGrid from 'rsuite/lib/FlexboxGrid'
// import List from 'rsuite/lib/List'
// import Modal from 'rsuite/lib/Modal'
// import { useSelector, useDispatch } from 'react-redux'
// import { getBuild, getSpells, setSpells, selectSpell, saveBuild } from './reducer/buildReducer'
// import './App.css';

// const tagData = [
//     {value: "pve", label: "PvE"},
//     {value: "pvp", label: "PvP"},
//     {value: "zvz", label: "ZvZ"},
//     {value: "hce", label: "HCE"},
//     {value: "solo", label: "Solo"},
//     {value: "ganking", label: "Ganking"},
// ]

// const itemTypes = [
//     "mainhand",
//     "offhand",
//     "head",
//     "armor",
//     "shoes",
//     "cape",
//     "food",
//     "potion",
// ]

// const App = () => {
//     const [theme] = useState(window.localStorage.getItem('theme') || 'light')
//     const [itemDrawer, setItemDrawer] = useState("")
//     const [name, setName] = useState("")
//     const [tags, setTags] = useState([])
//     const [modalOpen, setModalOpen] = useState(false)
//     const build = useSelector(getBuild)
//     const spells = useSelector(getSpells)
//     const dispatch = useDispatch()

//     const handleCloseDrawer = () => {
//         setItemDrawer("")
//     }

//     const handleOpenDrawer = name => _ => {
//         setItemDrawer(name)
//     }

//     const handleSaveBuild = () => {
//         dispatch(saveBuild())
//     }

//     const renderItemDrawer = itemType => {
//         return (
//             <ItemDrawer
//                 key={itemType}
//                 open={itemDrawer}
//                 name={itemType}
//                 handleClose={handleCloseDrawer}
//             />
//         )
//     }

//     const handleModalClose = () => {
//         setModalOpen(false)
//     }

//     const handleSelectSpell = (spell) => {
//         dispatch(selectSpell(spell))
//         setModalOpen(false)
//     }

//     const renderModal = () => {
//         const theme = window.localStorage.getItem('theme')
//         return (
//             <Modal
//                 show={modalOpen}
//                 onHide={handleModalClose}>
//                 <Modal.Header>
//                     <Modal.Title>Select Ability</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {spells.map((a) => (
//                         <Panel
//                             key={a.uniqueName}
//                             onClick={() => handleSelectSpell({ name: a.name, uniqueName: a.uniqueName })}
//                             style={{
//                                 cursor: "pointer",
//                                 margin: "auto",
//                                 marginBottom: "1rem",
//                                 width: "95%",
//                                 backgroundColor: theme === 'dark' ? "#0f131a" : "#FFF"
//                             }}
//                             shaded
//                         >
//                             <FlexboxGrid style={{ width: "100%" }} align="middle">
//                                 <FlexboxGrid.Item colSpan={4} style={{ marginRight: "1rem" }}>
//                                     <img alt={a.name} src={`${SPELL_ICON_URL}${a.uniqueName}?size=64`} />
//                                 </FlexboxGrid.Item>
//                                 <FlexboxGrid.Item colspan={20}>
//                                     <p style={{ fontWeight: 'bold' }}>{a.name}</p>
//                                     <p>{a.description}</p>
//                                 </FlexboxGrid.Item>
//                             </FlexboxGrid>
//                         </Panel>
//                     ))}
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button onClick={handleModalClose} appearance="subtle">Cancel</Button>
//                     <Button onClick={handleModalClose} appearance="primary">Save</Button>
//                 </Modal.Footer>
//             </Modal>
//         )
//     }

//     const openSpellModal = (spells, slot, index, type) => {
//         dispatch(setSpells({
//             spells,
//             currentSlot: slot,
//             currentSpellIndex: index,
//             currentSlotType: type
//         }))
//         setModalOpen(true)
//     }

//     const renderItemSelector = itemType => {
//         return (
//             <SelectedItem
//                 selectSpells={openSpellModal}
//                 key={itemType}
//                 item={build[itemType]}
//                 itemType={itemType}
//                 onClick={handleOpenDrawer(itemType)}
//             />
//         )
//     }

//     const renderItemSelectors = () => {
//         return (
//             <div style={{ width: "100%", marginBottom: "1rem" }}>
//                 <p>Select Items</p>
//                 <List bordered size="lg" >
//                     {itemTypes.map(renderItemSelector)}
//                 </List>
//             </div>
//         )
//     }

//     const renderNameInput = () => {
//         return (
//             <div style={{ width: "100%", marginBottom: "1rem" }}>
//                 <p>Enter Build Name</p>
//                 <Input
//                     value={name}
//                     onChange={setName}
//                 />
//             </div>
//         )
//     }

//     const renderDescriptionEditor = () => {
//         return (
//             <div style={{ width: "100%", marginBottom: "1rem" }}>
//                 <Editor />
//             </div>
//         )
//     }

//     const renderTagPicker = () => {
//         return (
//             <div style={{width: "100%", marginBottom: "1rem"}}>
//                 <p>Select Tags</p>
//                 <TagPicker 
//                     block
//                     value={tags}
//                     onChange={setTags}
//                     data={tagData} 
//                 />
//             </div>
//         )
//     }

//     return (
//         <ThemeProvider theme={theme}>
//             <Container style={{ width: "100%", margin: "auto", maxWidth: 900, padding: "1rem" }}>
//                 <FlexboxGrid>
//                     <FlexboxGrid.Item colspan={12} style={{padding: "1rem"}}>
//                         {renderItemSelectors()}
//                     </FlexboxGrid.Item>
//                     <FlexboxGrid.Item colspan={12} style={{padding: "1rem"}}>
//                         <div style={{textAlign: "right", marginBottom: "1rem"}}>
//                             <Button appearance="primary" onClick={handleSaveBuild}>Save</Button>
//                         </div>
//                         {renderNameInput()}
//                         {renderTagPicker()}
//                         {renderDescriptionEditor()}
//                     </FlexboxGrid.Item>
//                 </FlexboxGrid>
//             </Container>
//             {itemTypes.map(renderItemDrawer)}
//             {renderModal()}
//         </ThemeProvider>
//     )
// }

// export default App