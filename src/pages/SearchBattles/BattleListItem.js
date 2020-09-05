import React from 'react'
import List from 'rsuite/lib/List'
import { Link } from 'react-router-dom'
import Checkbox from 'rsuite/lib/Checkbox'
import FlexboxGrid from 'rsuite/lib/FlexboxGrid'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import * as ACTIONS from '../../reducers/interfaceReducer'
import Col from 'rsuite/lib/Col'
import abbreviate from 'number-abbreviate'

const intToString = (value, prec) => {
    return (abbreviate(value, prec || 1));
}

const formatName = (alliances, toShow) => {
    if (alliances.length < 1) {
        return "Unallied"
    }
    if (alliances.length > toShow) {
        return `${alliances.slice(0, toShow).join(', ')} + ${alliances.slice(toShow, alliances.length).length}`
    }
    return alliances.join(', ')
}


const RenderBattle = ({ battle }) => {
    const dispatch = useDispatch()
    const alliances = battle.alliances.list
    const multiIds = useSelector(ACTIONS.getMultiIdList)
    const multi = useSelector(ACTIONS.getMulti)
    let nameDisplay = formatName(alliances, 3)
    let mobileNameDisplay = formatName(alliances, 2)
    const dateDispaly = moment.utc(battle.startTime).format('MM-DD: HH:mm')
    const mobileDateDisplay = moment(battle.startTime).add(7, 'hours').format('MM-DD')

    const handleAddMulti = id => {
        dispatch(ACTIONS.setMultiIdList(id))
    }

    const renderFields = () => {
        return (
            <List.Item >
                <FlexboxGrid align="middle" style={{ color: battle.totalKills < 20 ? "#999999" : "#EEEEEE", paddingLeft: "0.5rem" }}>
                    {
                        multi &&
                            <Checkbox
                                onChange={() => handleAddMulti(battle.id)}
                                checked={multiIds.includes(battle.id)}></Checkbox>
                    }
                    <FlexboxGrid.Item componentClass={Col} md={3} xs={4} smHidden xsHidden>
                        <p style={{ color: "#999999" }}>{dateDispaly}</p>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} md={3} xs={4} mdHidden lgHidden>
                        <p style={{ color: "#999999" }}>{mobileDateDisplay}</p>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} md={multi ? 8 : 10} xs={multi ? 9 : 11} smHidden xsHidden>
                        <p>{`${nameDisplay}`}</p>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} md={multi ? 8 : 10} xs={multi ? 9 : 11} mdHidden lgHidden>
                        <p>{`${mobileNameDisplay}`}</p>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} md={3} xs={3}>
                        <p style={{ textAlign: "right", color: battle.totalFame > 999999 ? "#29e09d" : null }}>{intToString(battle.totalFame)}</p>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} md={3} xs={3}>
                        <p style={{ textAlign: "right", color: battle.players.list.length > 19 ? "#29cee0" : null }}>{battle.players.list.length}</p>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} md={2} xs={3}>
                        <p style={{ textAlign: "right", color: battle.totalKills > 19 ? "rgba(224,41,131,1)" : null }}>{battle.totalKills}</p>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} md={3} xsHidden smHidden>
                        {
                            multi ?
                            <Link to={`/battles/${battle.id}`} style={{textDecoration: 'none'}}>
                                <p style={{ textAlign: "right", color: "rgb(133, 97, 197)" }}>{battle.id}</p>
                            </Link>
                            :
                            <p style={{ textAlign: "right", color: "rgb(133, 97, 197)" }}>{battle.id}</p>
                        }
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </List.Item>
        )
    }

    if (multi) {
        return (
            <div>
                {renderFields()}
            </div>
        )
    }
    return (
        <Link
            style={{ textDecoration: 'none' }}
            to={`/battles/${battle.id}`}
        >
            {renderFields()}
        </Link>

    )
}

export default RenderBattle