import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FlexboxGrid from 'rsuite/lib/FlexboxGrid'
import { ITEM_ICON_URL, SPELL_ICON_URL } from '../utils/constants'
import IconButton from 'rsuite/lib/IconButton'
import Icon from 'rsuite/lib/Icon'
import List from 'rsuite/lib/List'
import * as ACTIONS from '../reducer/buildReducer'


const imageSize = 42

const SelectedItem = ({ onClick, item, itemType, selectSpells }) => {
    const build = useSelector(ACTIONS.getBuild)
    const dispatch = useDispatch()

    const handleRemove = () => {
        dispatch(ACTIONS.removeItem(itemType))
    }

    const openSpellDialog = (spells, index, type) => _ => {
        selectSpells(spells, itemType, index, type)
    }

    const renderAbilitySlot = (slot, slotIndex, type) => {
        const selected = build[`${itemType}_${type}_spells`][slotIndex]
        if (slot.length < 2) {
            return (
                <div key={slotIndex}>
                    <FlexboxGrid.Item style={{ marginLeft: "1rem" }}>
                        <img
                            alt={slot[0].uniqueName}
                            src={`${SPELL_ICON_URL}${slot[0].uniqueName}?size=${imageSize}`} />
                    </FlexboxGrid.Item>
                </div>
            )
        }
        return (
            <div key={slotIndex}>
                <FlexboxGrid.Item
                    onClick={openSpellDialog(slot, slotIndex, type)}
                    style={{ minHeight: 42, minWidth: 42, display: 'flex', alignItems: 'center', justifyContent: "center", marginLeft: "1rem", cursor: 'pointer' }}
                    >
                        {
                            selected ?
                                <img
                                    alt={selected.name}
                                    src={`${SPELL_ICON_URL}${selected.uniqueName}?size=${imageSize}`} />
                                :
                                <Icon size="lg" icon="plus-circle" style={{ color: "#666" }} />
                        }
                </FlexboxGrid.Item>
            </div>
        )
    }

    const noneSelected = () => {
        if (itemType === "offhand" && build?.mainhand?.uniqueName?.includes('2H')) {
            const mhand = build.mainhand
            return (
                <FlexboxGrid align="middle">
                    <FlexboxGrid.Item>
                        <img
                            style={{ opacity: 0.2 }}
                            src={`${ITEM_ICON_URL}${mhand?.uniqueName}?size=50`}
                            alt={mhand.name}
                        />
                    </FlexboxGrid.Item>
                </FlexboxGrid>

            )
        }
        return (
            <FlexboxGrid align="middle">
                <FlexboxGrid.Item onClick={onClick} style={{ marginRight: "1rem", cursor: 'pointer' }}>
                    <Icon style={{color: "#999"}} icon="plus-circle" />
                </FlexboxGrid.Item>
                <FlexboxGrid.Item onClick={onClick} style={{ cursor: 'pointer' }}>
                    <p style={{color: "#999"}}>{`Select ${itemType}`}</p>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        )
    }

    const itemSelected = () => {
        if (itemType === "offhand" && build?.mainhand?.uniqueName?.includes('2H')) {
            const mhand = build.mainhand
            return (
                <FlexboxGrid align="middle">
                    <FlexboxGrid.Item>
                        <img
                            style={{ opacity: 0.2 }}
                            src={`${ITEM_ICON_URL}${mhand?.uniqueName}?size=50`}
                            alt={mhand.localizedNames['EN-US']}
                        />
                    </FlexboxGrid.Item>
                </FlexboxGrid>

            )
        }
        return (
            <div>
                <p>{item.name}</p>
                <FlexboxGrid align="middle">
                    <FlexboxGrid.Item onClick={onClick} style={{ cursor: 'pointer' }}>
                        <img
                            src={`${ITEM_ICON_URL}${item?.uniqueName}?size=50`}
                            alt={item.name}
                        />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item>
                        <div>
                            <FlexboxGrid align="middle">
                                {Object.keys(item.activeSlots).map((slot, index) => renderAbilitySlot(item.activeSlots[slot], index, "active"))}
                                {Object.keys(item.passiveSlots).map((slot, index) => renderAbilitySlot(item.passiveSlots[slot], index, "passive"))}
                            </FlexboxGrid>
                        </div>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item style={{ marginLeft: "auto" }}>
                        <IconButton
                            size="sm"
                            appearance="subtle"
                            onClick={handleRemove}
                            icon={<Icon icon="close" />} />
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </div>
        )
    }
    return (
        <List.Item>
            {item ? itemSelected() : noneSelected()}
        </List.Item >
    )
}

export default SelectedItem