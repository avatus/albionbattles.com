import React from 'react'
import Panel from 'rsuite/lib/Panel'

const HighestKills = ({ players }) => {
    const player = players[0]
    return (
        <Panel
            bodyFill
            style={{
                padding: "10px",
                // borderLeft: "3px solid rgb(224, 41, 131)",
                backgroundColor: "#0f131a",
            }}>
                <div
                    style={{
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginBottom: "1rem"
                    }}>
                    <span>Deadliest Player</span>
                    <span style={{color: "rgb(224, 41, 131)"}}>{`${player.kills} Kills`}</span>
                </div>
            <div style={{
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                fontSize: "1.2rem",
            }}>
                <span>{player.name}</span>
                <span style={{color: "#999999"}}>{`[${player.allianceName}]`}</span>
            </div>
            <p style={{color: "#999999"}}>{player.guildName}</p>
        </Panel>
    )
}

export default HighestKills