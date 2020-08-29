import React from 'react'
import Panel from 'rsuite/lib/Panel'
// import { } from '@fortawesome/free-solid-svg-icons'

const thousands_separators = (num) => {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
}

// const imageUrl = 'https://ao2d.fra1.digitaloceanspaces.com/images/'

// const random_prefix = () => {
//     return ["HUMAN_MALE_", "HUMAN_FEMALE_"][Math.round(Math.random())]
// }

// const imageSize = 85

const HighestDamagePlayer = ({ players }) => {
    const player = players[0]
    return (
        <Panel
            bodyFill
            style={{
                padding: "10px",
                borderLeft: "3px solid rgb(224, 41, 78)",
                backgroundColor: "#0f131a",
            }}>
                <div
                    style={{
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginBottom: "1rem"
                    }}>
                    <span>Most Damage</span>
                    <span style={{color: "rgb(224, 41, 78)"}}>{thousands_separators(player.totalDamage)}</span>
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

export default HighestDamagePlayer