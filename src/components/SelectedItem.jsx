import React from 'react'
import FlexboxGrid from 'rsuite/lib/FlexboxGrid'
import { ITEM_ICON_URL } from '../utils/constants'
import Icon from 'rsuite/lib/Icon'
import List from 'rsuite/lib/List'

const SelectedItem = ({ onClick, item, itemType }) => {
    return (
        <List.Item onClick={onClick}>
            <FlexboxGrid align="middle">
                <FlexboxGrid.Item style={{ marginRight: "1rem" }}>
                    {
                        item ?
                            <img
                                src={`${ITEM_ICON_URL}${item?.uniqueName}?size=50`}
                                alt={item.name}
                            />
                            :
                            <Icon icon="plus" />
                    }
                </FlexboxGrid.Item>
                <FlexboxGrid.Item>
                    {item?.name || `Select ${itemType}`}
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </List.Item>
    )
}

export default SelectedItem