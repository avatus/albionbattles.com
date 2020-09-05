import React, { createRef, useEffect, useState } from 'react'
import Loader from 'rsuite/lib/Loader'
import Panel from 'rsuite/lib/Panel'
import { Link } from 'react-router-dom'
import Col from 'rsuite/lib/Col'
import InputGroup from 'rsuite/lib/InputGroup'
import Input from 'rsuite/lib/Input'
import Icon from 'rsuite/lib/Icon'
import Helmet from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import FlexboxGrid from 'rsuite/lib/FlexboxGrid'
import * as ACTIONS from '../../reducers/battleReducer'
import OverallStats from './components/BattleOverallStats'
import queryString from 'query-string'
import moment from 'moment'
import TotalPlayerStats from './components/TotalPlayerStats'
import reactga from 'react-ga'
import TotalKillStats from './components/TotalKillStats'
import TotalFameStats from './components/TotalFameStats'
import AllianceTable from './components/AllianceTable'
import GuildTable from './components/GuildTable'
import PlayerTable from './components/PlayerTable'
import BattleMVPs from './components/BattleMVPs'

const formatName = (alliances) => {
    if (alliances.length < 1) {
        return "Unallied"
    }
    if (alliances.length > 4) {
        return `${alliances.slice(0, 3).join(', ')} and ${alliances.slice(4, alliances.length).length} more`
    }
    return alliances.join(', ')
}

const formatDescription = ({ alliances, time, kills, players }) => {
    const string = `Battle: ${formatName(alliances)} at ${time} - ${players} players and ${kills} kills`
    return string
}

const BattleLog = props => {
    const params = queryString.parse(window.location.search)
    const { ids } = params
    const battle = useSelector(ACTIONS.getBattle)
    const [parsingMessage, setParsingMessage] = useState("")
    const [filter, setFilter] = useState(params.filter ? params.filter : '')
    const loading = useSelector(ACTIONS.getLoadingBattle)
    const error = useSelector(ACTIONS.getError)
    const dispatch = useDispatch()
    const inputEl = createRef()
    const { id } = props.match.params


    useEffect(() => {
        const timer = setTimeout(() => {
            setParsingMessage("Parsing battle report...")
        }, 3000);
        return () => clearTimeout(timer);
    }, [])

    useEffect(() => {
    }, [])

    useEffect(() => {
        reactga.pageview(`/battles/${id}`)
    }, [id])

    useEffect(() => {
        if (props.match.path !== '/multilog') {
            dispatch(ACTIONS.fetchBattle(id))
            return function cleanup() {
                dispatch(ACTIONS.unsetBattle())
            };
        }
    }, [dispatch, id, props.match.path])

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    },[battle])

    useEffect(() => {
        if (props.match.path === '/multilog') {
            dispatch(ACTIONS.fetchMultiLog(ids))
                return function cleanup() {
                dispatch(ACTIONS.unsetBattle())
            };
        }
    }, [dispatch, props.match.path, ids])

    const handleSearch = (clear) => {
        if (clear === true || inputEl.current.value === '') {
            setFilter('')
            let newParams = queryString.parse(window.location.search)
            delete newParams.filter
            inputEl.current.value = ''
            props.history.replace({
                search: queryString.stringify(newParams)
            })
        }
        if (inputEl && inputEl.current && inputEl.current.value !== '') {
            setFilter(inputEl.current.value)
            let newParams = queryString.parse(window.location.search)
            newParams.filter = inputEl.current.value
            props.history.replace({
                search: queryString.stringify(newParams)
            })
        }
        // if (inputEl && inputEl.current && inputEl.current.value === '') {
        //     setFilter('')
        //     let newParams = queryString.parse(window.location.search)
        //     newParams.filter = inputEl.current.value
        //     props.history.replace({
        //         search: queryString.stringify(newParams)
        //     })
        // }
        // if (inputEl && inputEl.current && inputEl.current.value === '') {
        //     setFilter(inputEl.current.value)
        //     return props.history.replace({
        //         search: ''
        //     })
        // }

    }

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
                <div
                    style={{
                        backgroundColor: "#0f131a",
                        maxWidth: 400,
                        padding: "2rem",
                        textAlign: 'center',
                        margin: "auto",
                        marginTop: "5vh",
                    }}
                >
                    <Loader size="sm" content={parsingMessage} vertical />
                </div>
            </div>
        )
    }

    let alliances = filter !== '' && battle.alliances.alliances.length > 0 ? battle.alliances.alliances.filter(a => a.name.toLowerCase().includes(filter.toLowerCase())) : battle.alliances.alliances
    let guilds = filter !== '' && battle.guilds.guilds.length > 0 ? battle.guilds.guilds.filter(a => a.alliance.toLowerCase().includes(filter.toLowerCase())) : battle.guilds.guilds
    let players = filter !== '' && battle.players.players.length > 0 ? battle.players.players.filter(a => a.allianceName.toLowerCase().includes(filter.toLowerCase())) : battle.players.players

    return (
        <div>
            <Helmet>
                {
                    props.match.path === '/multilog' ?
                    <title>{`MultiLog Report - ${ids}`}</title>
                    : 
                    <title>{`Battle Report - ${battle.id}`}</title>

                }
                <meta name="description" content={`${formatDescription({
                    alliances: battle.alliances.list,
                    kills: battle.totalKills,
                    time: moment(battle.startTime).add(7, 'hours').format('MM-DD: HH:mm'),
                    players: battle.players.players.length
                })}`} />
            </Helmet>
            <div
                style={{ minHeight: 600 }}
            >
                <div style={{
                    paddingLeft: "0.5rem",
                    paddingRight: "0.5rem",
                    justifyContent: 'space-between',
                    display: 'flex',
                    alignItems: 'flex-end',
                    marginBottom: "1rem",
                }}>
                    <div>
                        {
                            props.match.path === '/multilog' ?
                            <h3>MULTILOG REPORT</h3>
                            :
                            <h3>BATTLE REPORT</h3>
                        }
                        <div style={{ textAlign: 'left' }}>
                            <Link to="/">Return to index</Link>
                        </div>
                    </div>
                    <div>
                        <p>Filter By Alliance</p>
                        <InputGroup inside>
                            <Input
                                defaultValue={params.filter}
                                inputRef={inputEl}
                                onKeyDown={event => {
                                    if (event.keyCode === 13) {
                                        handleSearch()
                                    }
                                }}
                                placeholder="Type..."
                            />
                            <InputGroup.Button appearance="subtle" onClick={() => handleSearch(true)}>
                                <Icon icon="close" />
                            </InputGroup.Button>
                        </InputGroup>
                    </div>
                </div>
                <FlexboxGrid>
                    <FlexboxGrid.Item style={{ marginBottom: "1rem" }} componentClass={Col} lg={6} md={12} xs={24}>
                        <OverallStats match={props.match} ids={ids || []} />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item style={{ marginBottom: "1rem" }} componentClass={Col} lg={6} md={12} xs={24}>
                        <TotalPlayerStats />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item style={{ marginBottom: "1rem" }} componentClass={Col} lg={6} md={12} xs={24}>
                        <TotalKillStats />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item style={{ marginBottom: "1rem" }} componentClass={Col} lg={6} md={12} xs={24}>
                        <TotalFameStats />
                    </FlexboxGrid.Item>
                </FlexboxGrid>
                {<BattleMVPs battle={battle} />}
                <FlexboxGrid>
                    <FlexboxGrid.Item style={{ marginBottom: "1rem" }} componentClass={Col} lg={12} xs={24}>
                        <AllianceTable
                            alliances={alliances}
                        />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item style={{ marginBottom: "1rem" }} componentClass={Col} lg={12} xs={24}>
                        <GuildTable
                            guilds={guilds}
                        />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item style={{ marginBottom: "1rem" }} componentClass={Col} xs={24}>
                        <PlayerTable
                            players={players}
                        />
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </div>
        </div>
    )
}

export default BattleLog