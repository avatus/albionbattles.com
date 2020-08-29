import React from 'react'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import Panel from 'rsuite/lib/Panel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { getBattle } from '../../../reducers/battleReducer'
import TotalBar from './TotalBar'

const TotalPlayerStats = () => {
    const { alliances: a } = useSelector(getBattle)
    const alliances = [...a.alliances].sort((a,b) => b.totalPlayers-a.totalPlayers)
    const top = alliances[0]
    return (
        <Panel
            header={<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p>Most Players</p>
                <FontAwesomeIcon
                    style={{ minWidth: 25 }}
                    icon={faUsers}
                    color="#29cee0"
                    size="lg"
                />
            </div>}
            style={{
                minHeight: 190,
                backgroundColor: "#0f131a",
            }}
        >
            {alliances.slice(0, 4).map(a => (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} key={a.name}>
                    <TotalBar
                        a={a.totalPlayers}
                        t={top.totalPlayers}
                        background="linear-gradient(90deg, rgba(41,175,224,1) 0%, rgba(41,206,224,1) 100%)"
                    />
                    <p style={{ color: "#AAA" }}>{a.name !== "" ? a.name : "Unalligned"}</p>
                </div>
            ))}
        </Panel>
    )
}

export default TotalPlayerStats