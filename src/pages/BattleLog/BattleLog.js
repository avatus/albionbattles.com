import React, { useEffect } from 'react'
import Loader from 'rsuite/lib/Loader'
import Panel from 'rsuite/lib/Panel'
import { Link } from 'react-router-dom'
import Col from 'rsuite/lib/Col'
import Helmet from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import FlexboxGrid from 'rsuite/lib/FlexboxGrid'
import * as ACTIONS from '../../reducers/battleReducer'
import OverallStats from './components/BattleOverallStats'
import TotalPlayerStats from './components/TotalPlayerStats'
import TotalKillStats from './components/TotalKillStats'
import TotalFameStats from './components/TotalFameStats'
import AllianceTable from './components/AllianceTable'
import GuildTable from './components/GuildTable'
import PlayerTable from './components/PlayerTable'
import BattleMVPs from './components/BattleMVPs'

const BattleLog = props => {
    const battle = useSelector(ACTIONS.getBattle)
    const loading = useSelector(ACTIONS.getLoadingBattle)
    const error = useSelector(ACTIONS.getError)
    const dispatch = useDispatch()
    const { id } = props.match.params

    useEffect(() => {
        dispatch(ACTIONS.fetchBattle(id))
        return function cleanup() {
            dispatch(ACTIONS.unsetBattle())
        };
    }, [dispatch, id])

    if (error) {
        return (
            <Panel
                style={{
                    padding: "4rem",
                    width: "100%",
                    maxWidth: 450,
                    backgroundColor: "#0f131a",
                    textAlign: 'center',
                    margin: "auto",
                }}
                bodyFill
                shaded
            >
                <p style={{ marginBottom: "2rem" }}>{error}</p>
                <Link
                    style={{
                        color: "#34c3ff",
                        textDecoration: 'none',
                    }}
                    to="/battles" >Return to Battle Index</Link>
            </Panel>
        )
    }

    if (loading) {
        return (
            <div>
                <Col style={{ height: "5vh" }} smHidden />
                <Panel
                    style={{
                        backgroundColor: "#0f131a",
                        maxWidth: 300,
                        textAlign: 'center',
                        margin: "auto",
                    }}
                    bodyFill
                    shaded
                >
                    <Loader size="sm" />
                </Panel>
            </div>
        )
    }

    return (
        <div>
            <Helmet>
                <title>{`Battle Report - ${battle.id}`}</title>
            </Helmet>
            <Panel
                style={{ minHeight: 600, padding: "0px !important" }}
            >
                <div style={{textAlign: 'right'}}>
                    <Link to="/">Return to index</Link>
                </div>
                <FlexboxGrid>
                    <FlexboxGrid.Item style={{ marginBottom: "1rem" }} componentClass={Col} lg={6} md={12} sm={24}>
                        <OverallStats />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item style={{ marginBottom: "1rem" }} componentClass={Col} lg={6} md={12} sm={24}>
                        <TotalPlayerStats />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item style={{ marginBottom: "1rem" }} componentClass={Col} lg={6} md={12} sm={24}>
                        <TotalKillStats />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item style={{ marginBottom: "1rem" }} componentClass={Col} lg={6} md={12} sm={24}>
                        <TotalFameStats />
                    </FlexboxGrid.Item>
                </FlexboxGrid>
                {<BattleMVPs battle={battle} />} 
                <FlexboxGrid>
                    <FlexboxGrid.Item style={{ marginBottom: "1rem" }} componentClass={Col} lg={12} sm={24}>
                        <AllianceTable
                            alliances={battle.alliances.alliances}
                        />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item style={{ marginBottom: "1rem" }} componentClass={Col} lg={12} sm={24}>
                        <GuildTable
                            guilds={battle.guilds.guilds}
                        />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item style={{ marginBottom: "1rem" }} componentClass={Col} sm={24}>
                        <PlayerTable
                            players={battle.players.players}
                        />
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Panel>
        </div>
    )
}

export default BattleLog