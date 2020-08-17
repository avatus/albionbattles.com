import React from 'react'
import FlexboxGrid from 'rsuite/lib/FlexboxGrid'
import { ITEM_ICON_URL } from '../utils/constants'
import IconButton from 'rsuite/lib/IconButton'
import Icon from 'rsuite/lib/Icon'
import List from 'rsuite/lib/List'

const SelectedItem = ({ onClick, item, itemType }) => {
    return (
        <List.Item 
        >
            <FlexboxGrid align="middle">
                <FlexboxGrid.Item onClick={onClick} style={{ marginRight: "1rem", cursor: 'pointer' }}>
                    {
                        item ?
                            <img
                                src={`${ITEM_ICON_URL}${item?.uniqueName}?size=50`}
                                alt={item.localizedNames['EN-US']}
                            />
                            :
                            <Icon icon="plus" />
                    }
                </FlexboxGrid.Item>
                <FlexboxGrid.Item onClick={onClick} style={{cursor: 'pointer'}}>
                    {item?.localizedNames['EN-US'] || `Select ${itemType}`}
                </FlexboxGrid.Item>
                {
                    item &&
                    <FlexboxGrid.Item style={{marginLeft: "auto"}}>
                        <IconButton 
                            size="sm"
                            appearance="subtle"
                            onClick={() => console.log('removed')}
                            icon={<Icon icon="close" />} />
                    </FlexboxGrid.Item>
                }
            </FlexboxGrid>
        </List.Item>
    )
}

export default SelectedItem