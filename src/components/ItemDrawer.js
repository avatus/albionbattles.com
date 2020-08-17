import React, { useState } from 'react'
import Drawer from 'rsuite/lib/Drawer'
import Button from 'rsuite/lib/Button'
import { ITEM_ICON_URL } from '../utils/constants'
import { unwrapResult } from '@reduxjs/toolkit'
import List from 'rsuite/lib/List'
import SelectPicker from 'rsuite/lib/SelectPicker'
import { useDispatch } from 'react-redux'
import FlexboxGrid from 'rsuite/lib/FlexboxGrid'
// import Placeholder from 'rsuite/lib/Placeholder'
import Input from 'rsuite/lib/Input'
import InputGroup from 'rsuite/lib/InputGroup'
import Icon from 'rsuite/lib/Icon'
import * as ACTIONS from '../reducer/buildReducer'

const tiers = [
    { value: 'T1', label: 'Tier I' },
    { value: 'T2', label: 'Tier II' },
    { value: 'T3', label: 'Tier III' },
    { value: 'T4', label: 'Tier IV' },
    { value: 'T5', label: 'Tier V' },
    { value: 'T6', label: 'Tier VI' },
    { value: 'T7', label: 'Tier VII' },
    { value: 'T8', label: 'Tier VIII' },
]

const ItemDrawer = ({ open, name, handleClose }) => {
    const [search, setSearch] = useState("")
    const [fetchingItem, setFetchingItem] = useState("cheese")
    const [selecting, setSelecting] = useState(false)
    const [error, setError] = useState("")
    const [tier, setTier] = useState("T4")
    const items = require(`../utils/${name}_small.json`).filter(i => tier !== null ? i.uniqueName.includes(tier) : true).filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
    const dispatch = useDispatch()

    const renderListItem = item => {

        const selectItem = () => {
            setFetchingItem(item.uniqueName)
            setSelecting(true)
            setError("")
            dispatch(ACTIONS.fetchItemData({item, itemType: name})).then(unwrapResult)
                .then(res => {
                    setFetchingItem("")
                    setSelecting(false)
                    handleClose()
                })
                .catch(err => {
                    setFetchingItem("")
                    setSelecting(false)
                    setError("Error selecting item.")
                })
        }

        return (
            <List.Item
                key={item.uniqueName}
            >
                <FlexboxGrid align="middle">
                    <FlexboxGrid.Item style={{ marginRight: "1rem" }}>
                        <img
                            src={`${ITEM_ICON_URL}${item.uniqueName}?size=50`}
                            alt={item.name}
                        />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item>
                        {item.name}
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item style={{ marginLeft: "auto" }}>
                        <Button 
                            loading={item.uniqueName === fetchingItem}
                            disabled={selecting}
                            onClick={selectItem}>Select</Button>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </List.Item>
        )
    }
    return (
        <Drawer
            // TODO: set width 100% and maxwidth for rs-drawer css
            placement="right"
            show={open === name}
            onHide={handleClose}
        >
            <Drawer.Header>
                <Drawer.Title>
                    {`Select ${name.charAt(0).toUpperCase() + name.slice(1)} Item`}
                </Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
                <FlexboxGrid align="middle">
                    <FlexboxGrid.Item>
                        <SelectPicker
                            style={{ width: 150, marginRight: "1rem" }}
                            data={tiers}
                            onChange={setTier}
                            value={tier}
                            searchable={false}
                        />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item>
                        <InputGroup inside>
                            <Input
                                value={search}
                                onChange={setSearch}
                            />
                            <InputGroup.Button onClick={() => setSearch("")}>
                                <Icon icon="close" />
                            </InputGroup.Button>
                        </InputGroup>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
                <div style={{color: "#f44336", marginTop: "1rem"}}>
                    {error}
                </div>
                <div style={{ marginTop: "1rem" }}>
                    <List bordered>
                        {items.map(renderListItem)}
                    </List>
                </div>
            </Drawer.Body>
            <Drawer.Footer style={{ padding: "1rem" }}>
                <Button onClick={handleClose} appearance="subtle">Cancel</Button>
                <Button appearance="primary">Confirm</Button>
            </Drawer.Footer>
        </Drawer>
    )
}

export default ItemDrawer