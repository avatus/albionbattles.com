import React from 'react'
import Col from 'rsuite/lib/Col'
import FlexboxGrid from 'rsuite/lib/FlexboxGrid'
import HighestDamagePlayer from './HighestDamagePlayer'
import HighestKills from './HighestKills'
import HighestAssists from './HighestAssists'
import HighestHealingPlayer from './HighestHealingPlayer'
import MostExpensiveDeath from './MostExpensiveDeath'

const BattleMVPs = ({ battle }) => {
    return (
        <FlexboxGrid>
            <FlexboxGrid.Item style={{ marginBottom: "1rem" }} componentClass={Col} lg={12} md={24} sm={24}>
                <FlexboxGrid>
                    <FlexboxGrid.Item style={{ marginBottom: "1rem" }} componentClass={Col} lg={12} md={12} sm={24}>
                        <HighestDamagePlayer
                            players={battle.highestDamagePlayer.players}
                        />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item style={{ marginBottom: "1rem" }} componentClass={Col} lg={12} md={12} sm={24}>
                        <HighestKills
                            players={battle.highestKillsPlayer.players}
                        />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item style={{ marginBottom: "1rem" }} componentClass={Col} lg={12} md={12} sm={24}>
                        <HighestHealingPlayer
                            players={battle.highestHealingPlayer.players}
                        />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item style={{ marginBottom: "1rem" }} componentClass={Col} lg={12} md={12} sm={24}>
                        <HighestAssists
                            players={battle.highestAssists.players}
                        />
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item style={{ marginBottom: "1rem" }} componentClass={Col} lg={12} md={24} sm={24}>
                <MostExpensiveDeath
                    players={battle.mostExpensiveDeath}
                />
            </FlexboxGrid.Item>
        </FlexboxGrid>
    )
}

export default BattleMVPs