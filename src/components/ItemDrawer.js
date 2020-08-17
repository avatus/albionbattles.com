import React, { useState } from 'react'
import Drawer from 'rsuite/lib/Drawer'
import Item from './Item'
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import SelectPicker from 'rsuite/lib/SelectPicker'
import FlexboxGrid from 'rsuite/lib/FlexboxGrid'
import Input from 'rsuite/lib/Input'
import InputGroup from 'rsuite/lib/InputGroup'
import Icon from 'rsuite/lib/Icon'

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
    const [error, setError] = useState("")
    const [tier, setTier] = useState("T7")
    const items = require(`../utils/${name}_small.json`).filter(i => tier !== null ? i.uniqueName.includes(tier) : true).filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
    // TODO: app category type to all my json files with the api to add filter by category

    const renderListItem = ({ index, style }) => {
        const item = items[index]
        return <Item 
            item={item} 
            style={style} 
            slot={name}
            setError={setError}
            handleClose={handleClose}
        />
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
                        <p>Select Tier</p>
                        <SelectPicker
                            style={{ width: 150, marginRight: "1rem" }}
                            data={tiers}
                            onChange={setTier}
                            value={tier}
                            searchable={false}
                        />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item>
                        <p>Search by name</p>
                        <InputGroup inside>
                            <Input
                                placeholder="Type..."
                                value={search}
                                onChange={setSearch}
                            />
                            <InputGroup.Button appearance="subtle" onClick={() => setSearch("")}>
                                <Icon icon="close" />
                            </InputGroup.Button>
                        </InputGroup>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
                <div style={{ color: "#f44336", marginTop: "1rem" }}>
                    {error}
                </div>
                    <AutoSizer>
                        {({ height, width }) => (
                            <List
                                className="List"
                                height={height-100}
                                itemCount={items.length}
                                itemSize={70}
                                width={width}
                            >
                                {renderListItem}
                            </List>
                        )}
                    </AutoSizer>
            </Drawer.Body>
        </Drawer>
    )
}

export default ItemDrawer