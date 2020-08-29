import React from 'react'
import List from 'rsuite/lib/List'
import { Link } from 'react-router-dom'
import FlexboxGrid from 'rsuite/lib/FlexboxGrid'
import moment from 'moment'
import Col from 'rsuite/lib/Col'
import abbreviate from 'number-abbreviate'

const intToString = (value, prec) => {
    return (abbreviate(value, prec || 1));
}

const formatName = (alliances) => {
    if (alliances.length < 1) {
        return "Unallied"
    }
    if (alliances.length > 4) {
        return `${alliances.slice(0, 3).join(', ')} and ${alliances.slice(4, alliances.length).length} more`
    }
    return alliances.join(', ')
}


const RenderBattle = ({ battle }) => {
    const alliances = battle.alliances.list
    let nameDisplay = formatName(alliances)
    const dateDispaly = moment(battle.startTime).add(7, 'hours').format('MM-DD: HH:mm')
    return (
        <Link
            style={{ textDecoration: 'none' }}
            to={`/battles/${battle.id}`}
        >
            <List.Item >
                <FlexboxGrid style={{ color: battle.totalKills < 20 ? "#999999" : "#EEEEEE", paddingLeft: "0.5rem" }}>
                    <FlexboxGrid.Item componentClass={Col} md={5}>
                        <p style={{ color: "#999999" }}>{dateDispaly}</p>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} md={8}>
                        <p>{`${nameDisplay}`}</p>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} md={3}>
                        <p style={{ textAlign: "right", color: battle.totalFame > 999999 ? "#29e09d" : null }}>{intToString(battle.totalFame)}</p>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} md={3}>
                        <p style={{ textAlign: "right", color: battle.players.list.length > 19 ? "#29cee0" : null }}>{battle.players.list.length}</p>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} md={2}>
                        <p style={{ textAlign: "right", color: battle.totalKills > 19 ? "rgba(224,41,131,1)" : null }}>{battle.totalKills}</p>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} md={3}>
                        <p style={{ textAlign: "right", color: "rgb(133, 97, 197)" }}>{battle.id}</p>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </List.Item>
        </Link>

    )
}

export default RenderBattle