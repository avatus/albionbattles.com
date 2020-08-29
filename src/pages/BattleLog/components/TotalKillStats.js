import React from 'react'
import { faSkull } from '@fortawesome/free-solid-svg-icons'
import Panel from 'rsuite/lib/Panel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { getBattle } from '../../../reducers/battleReducer'
import TotalBar from './TotalBar'

const TotalKillStats = () => {
    const { alliances: a } = useSelector(getBattle)
    const alliances = [...a.alliances].sort((a,b) => b.kills-a.kills)
    const top = alliances[0]
    return (
        <Panel
            header={<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p>Most Kills</p>
                <FontAwesomeIcon
                    style={{ minWidth: 25 }}
                    icon={faSkull}
                    color="#e02983"
                    size="lg"
                />
            </div>}
            style={{
                minHeight: 190,
                backgroundColor: "#0f131a",
            }}
        >
            {alliances.sort((a, b) => b.kills - a.kills).slice(0, 4).map(a => (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} key={a.name}>
                    <TotalBar 
                        a={a.kills} 
                        t={top.kills}
                        background="linear-gradient(90deg, rgba(224,41,78,1) 0%, rgba(224,41,131,1) 100%)"
                    />
                    <p style={{ color: "#AAA" }}>{a.name !== "" ? a.name : "Unalligned"}</p>
                </div>
            ))}
        </Panel>
    )
}

export default TotalKillStats