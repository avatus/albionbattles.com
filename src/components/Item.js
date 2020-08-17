import React, { useState } from 'react'
import FlexboxGrid from 'rsuite/lib/FlexboxGrid'
import Button from 'rsuite/lib/Button'
import { ITEM_ICON_URL } from '../utils/constants'
import { unwrapResult } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import * as ACTIONS from '../reducer/buildReducer'
import Container from 'rsuite/lib/Container'

const Item = ({ item, style, setError, slot, handleClose }) => {
    const [fetchingItem, setFetchingItem] = useState("cheese")
    const [selecting, setSelecting] = useState(false)
    const dispatch = useDispatch()
    const selectItem = () => {
        setFetchingItem(item.uniqueName)
        setSelecting(true)
        setError("")
        dispatch(ACTIONS.fetchItemData({ item, itemType: slot })).then(unwrapResult)
        .then(res => {
            handleClose()
        })
        .catch(err => {
            setError("Error selecting item.")
        })
        // dispatch(ACTIONS.fetchItemData({ item, itemType: slot })).then(unwrapResult)
        //     .then(res => {
        //         setFetchingItem("")
        //         setSelecting(false)
        //         // handleClose()
        //     })
        //     .catch(err => {
        //         setFetchingItem("")
        //         setSelecting(false)
        //         setError("Error selecting item.")
        //     })
    }

    return (
        <Container
            className='rs-list-item rs-list-item-md rs-list-item-bordered'
            style={{...style}}
            // key={item.uniqueName}
        >
            <FlexboxGrid align="middle">
                <FlexboxGrid.Item style={{ marginRight: "1rem", minWidth: 42, minHeight: 42 }}>
                    <img
                        src={`${ITEM_ICON_URL}${item.uniqueName}?size=42`}
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
        </Container>
    )
}

export default Item