import React, { useState, useEffect, createRef } from 'react'
import Helmet from 'react-helmet'
import useInterval from '@use-it/interval';
import axios from 'axios'
import Icon from 'rsuite/lib/Icon'
import Panel from 'rsuite/lib/Panel'
import reactga from 'react-ga'
import { ROOT_URL } from '../../utils/constants'
import FlexboxGrid from 'rsuite/lib/FlexboxGrid'
import Loader from 'rsuite/lib/Loader'
import Checkbox from 'rsuite/lib/Checkbox'
import Input from 'rsuite/lib/Input'
import Col from 'rsuite/lib/Col'
import InputGroup from 'rsuite/lib/InputGroup'
import BattleList from './BattleList'

const BattlesSearch = () => {
    const [loading, setLoading] = useState(true)
    const inputEl = createRef()
    const [battles, setBattles] = useState([])
    const [refreshingTimer, setRefreshingTimer] = useState(60)
    const [largeOnly, setLargeOnly] = useState(window.localStorage.getItem('largeOnly') === 'true' || false)
    const [activePage, setActivePage] = useState(1)
    const [searching, setSearching] = useState(false)

    const handleLargeOnly = (_, checked) => {
        window.localStorage.setItem('largeOnly', checked)
        setLargeOnly(checked)
        setActivePage(1)
    }

    const getData = () => {
        let searchdata = inputEl && inputEl.current && inputEl.current.value ? inputEl.current.value : ''
        axios.get(`${ROOT_URL}/battles?largeOnly=${largeOnly}&offset=${(activePage - 1) * 20}&search=${searchdata}`)
            .then(response => {
                setBattles(response.data)
                setLoading(false)
                setSearching(false)
            })
            .catch(err => {
                setLoading(false)
            })
    }

    useInterval(() => {
        if (refreshingTimer > 0) {
            setRefreshingTimer(refreshingTimer - 1)
        }
        else {
            getData()
            setRefreshingTimer(60)
        }
    }, 1000)

    const handleSearch = () => {
        setSearching(true)
        getData()
    }

    useEffect(() => {
        reactga.pageview('/battles')
    }, [])

    useEffect(() => {
        setLoading(true)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        getData()
        //eslint-disable-next-line
    }, [largeOnly, activePage])

    const renderLoader = () => {
        return (
            <Panel style={{ padding: "4rem", textAlign: 'center', backgroundColor: "#0f131a" }}>
                <Loader />
            </Panel>
        )
    }

    return (
        <div style={{
            width: "100%",
            maxWidth: 900,
            // padding: "1rem",
            margin: "auto",
            marginBottom: "5vh",
        }}>
            <Helmet>
                <title>Albion Battle Reports</title>
            </Helmet>
            <Col style={{ height: "5vh" }} smHidden />
            <div style={{
                // textAlign: 'center'
            }}>
                <h1>ALBION BATTLES</h1>
            </div>
            <p style={{
                // textAlign: 'center',
                marginBottom: "1rem",
                fontSize: "1.3rem",
                fontWeight: "bold",
            }}>SEARCH BATTLES</p>
            <InputGroup size="lg" inside style={{ marginBottom: "2rem" }}>
                <Input
                    inputRef={inputEl}
                    // onChange={handleInputChange}
                    onKeyDown={event => {
                        if (event.keyCode === 13) {
                            handleSearch()
                        }
                    }}
                    placeholder="Search alliance, guild, or player..."
                />
                <InputGroup.Button loading={searching} onClick={getData}>
                    {
                        !searching &&
                        <Icon icon="search" />
                    }
                </InputGroup.Button>
            </InputGroup>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{color: "#999999"}}>Auto refreshing in {refreshingTimer}</p>
                <Checkbox
                    onChange={handleLargeOnly}
                    checked={largeOnly}>Exclude small battles</Checkbox>
            </div>
            <div style={{ backgroundColor: "#0f131a", marginBottom: "1rem", padding: '0.5rem' }}>
                <FlexboxGrid style={{ color: "#AAAAAA" }}>
                    <FlexboxGrid.Item componentClass={Col} md={3} sm={5} xs={4}>
                        <p>Date</p>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} md={10} sm={8} xs={11}>
                        <p>Alliances</p>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} md={3} sm={3} xs={3}>
                        <p style={{ textAlign: 'right' }}>Fame</p>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} md={3} sm={3} xs={3}>
                        <p style={{ textAlign: 'right' }}>Players</p>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} md={2} sm={2} xs={3}>
                        <p style={{ textAlign: 'right' }}>Kills</p>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} md={3} smHidden xsHidden>
                        <p style={{ textAlign: 'right' }}>ID</p>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </div>
            {loading ? renderLoader() : <BattleList battles={battles} activePage={activePage} setActivePage={setActivePage} />}
        </div>
    )
}

export default BattlesSearch