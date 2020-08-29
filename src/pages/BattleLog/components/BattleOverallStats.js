import React from 'react'
import moment from 'moment'
import Panel from 'rsuite/lib/Panel'
import { formatDistance } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSkull, faUsers, faClock, faCrown, faHourglassHalf } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import * as ACTIONS from '../../../reducers/battleReducer'
import abbreviate from 'number-abbreviate'

const intToString = (value, prec) => {
    return (abbreviate(value, prec || 1));
}

const OverallStats = props => {
    const battle = useSelector(ACTIONS.getBattle)
    const { players } = battle.players
    return (
        <Panel
            header={<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p>Battle Report</p>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#8561c5" }}
                    href={`https://albiononline.com/en/killboard/battles/${battle.id}`}>{battle.id}</a>
            </div>}
            style={{
                minHeight: 172,
                backgroundColor: "#0f131a",
            }}
        >
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FontAwesomeIcon
                        style={{ minWidth: 25, marginRight: '0.3rem' }}
                        icon={faClock}
                    />
                    <p style={{ color: "#AAA" }}>Duration:</p>
                </div>
                <p style={{ color: "#AAA" }}>{moment(battle.startTime).add(7, 'hours').format('MM-DD: H:mm')}</p>
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FontAwesomeIcon
                        style={{ minWidth: 25, color: "rgb(133, 97, 197)", marginRight: '0.3rem' }}
                        icon={faHourglassHalf}
                    />
                    <p style={{ color: "#AAA" }}>Duration:</p>
                </div>
                <p style={{ color: "#AAA" }}>{formatDistance(new Date(battle.endTime), new Date(battle.startTime))}</p>
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FontAwesomeIcon
                        style={{ minWidth: 25, marginRight: '0.3rem' }}
                        icon={faUsers}
                        color="#29cee0"
                    />
                    <p style={{ color: "#AAA" }}>Total Players:</p>
                </div>
                <p style={{ color: "#AAA" }}>{players.length}</p>
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FontAwesomeIcon
                        style={{ minWidth: 25, marginRight: '0.3rem' }}
                        icon={faSkull}
                        color="#e02983"
                    />
                    <p style={{ color: "#AAA" }}>Total Kills:</p>
                </div>
                <p style={{ color: "#AAA" }}>{battle.totalKills}</p>
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FontAwesomeIcon
                        style={{ minWidth: 25, marginRight: '0.3rem' }}
                        icon={faCrown}
                        color="#29e09d"
                    />
                    <p style={{ color: "#AAA" }}>Total Fame:</p>
                </div>
                <p style={{ color: "#AAA" }}>{intToString(battle.totalFame)}</p>
            </div>
        </Panel>
    )
}

export default OverallStats