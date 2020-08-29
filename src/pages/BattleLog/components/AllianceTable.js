import React, { useState } from 'react'
import FlexboxGrid from 'rsuite/lib/FlexboxGrid'
import List from 'rsuite/lib/List'
import Icon from 'rsuite/lib/Icon'
import Panel from 'rsuite/lib/Panel'
import InputGroup from 'rsuite/lib/InputGroup'
import Input from 'rsuite/lib/Input'
import Col from 'rsuite/lib/Col'
import Pagination from 'rsuite/lib/Pagination'
import Checkbox from 'rsuite/lib/Checkbox'
import abbreviate from 'number-abbreviate'

const intToString = (value, prec) => {
    return (abbreviate(value, prec || 1));
}

const AllianceTable = ({ alliances: a }) => {
    const [activePage, setActivePage] = useState(1)
    const [showLow, setShowLow] = useState(true)
    const [search, setSearch] = useState("")
    const [sort, setSort] = useState('killFame')
    const [sortDirection, setSortDirection] = useState(true)
    const alliances = showLow ? [...a] : [...a].filter(i => !i.low)
    const maxKills = alliances.sort((a, b) => b.kills - a.kills)[0].kills
    const maxKillFame = alliances.sort((a, b) => b.killFame - a.killFame)[0].killFame

    const handleSort = column => _ => {
        if (sort === column) {
            setSortDirection(!sortDirection)
        }
        else {
            setSort(column)
            setSortDirection(true)
        }
    }

    const renderAllianceStats = (alliance, index) => {
        let topKills = alliance.kills === maxKills
        let topFame = alliance.killFame === maxKillFame
        let borderClass = topKills && topFame ? "fameandkills" : topKills ? 'topkills' : topFame ? 'topfame' : null
        return (
            <List.Item
                key={alliance.id}
                className={borderClass}
                style={{
                    color: alliance.low ? "#666" : "#EEEEEE",
                }}>
                <FlexboxGrid>
                    <FlexboxGrid.Item componentClass={Col} md={6}>
                        <p style={{ paddingLeft: "1rem" }}>{alliance.name}</p>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} md={3}>
                        <p style={{ textAlign: "right" }}>{alliance.totalPlayers}</p>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} md={3}>
                        <p style={{ textAlign: "right", color: topKills ? "rgb(224, 41, 131)" : null }}>
                            {alliance.kills}
                        </p>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} md={3}>
                        <p style={{ textAlign: "right" }}>{alliance.deaths}</p>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} md={3}>
                        <p style={{ textAlign: "right", color: topFame ? "#29e09d" : null }}>
                            {intToString(alliance.killFame)}
                        </p>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} md={3}>
                        <p style={{ textAlign: "right" }}>{intToString(alliance.totalDamage)}</p>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} md={3}>
                        <p style={{ textAlign: "right" }}>
                            {alliance.averageIp}
                        </p>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </List.Item>
        )
    }

    const handleShowLow = (_, checked) => {
        setShowLow(checked)
    }

    const renderSortHeader = (header, field, flex) => {
        return (
            <div
                onClick={handleSort(field)}
                style={{ display: 'flex', justifyContent: flex, alignItems: 'center' }}>
                <p style={{ marginRight: 4 }}>{header}</p>
                {
                    sort === field && !sortDirection && <Icon icon="sort-up" style={{ color: "#34c3ff" }} />
                }
                {
                    sort === field && sortDirection && <Icon icon="sort-desc" style={{ color: "#34c3ff" }} />
                }
                {
                    sort !== field && <Icon icon="sort" style={{ color: "#34c3ff" }} />
                }
            </div>

        )
    }

    // eslint-disable-next-line
    sort && alliances.sort((a, b) => {
        if (sort === 'name') {
            if (sortDirection) {
                if(a[sort].toLowerCase() < b[sort].toLowerCase()) { return -1; }
                if(a[sort].toLowerCase() > b[sort].toLowerCase()) { return 1; }
            }
            else {
                if(a[sort].toLowerCase() < b[sort].toLowerCase()) { return 1; }
                if(a[sort].toLowerCase() > b[sort].toLowerCase()) { return -1; }
            }
        }
        else {
            if (sortDirection) {
                return b[sort] - a[sort]
            }
            return a[sort] - b[sort]
        }
    })


    let visible = alliances
        .filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
        .slice(((activePage - 1) * 10), activePage * 10)


    return (
        <Panel
            header={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {
                        showLow
                            ? <p>{`Alliances (${alliances.length})`}</p>
                            : <p>{`Alliances (${alliances.length})`}<span style={{ color: "#666", marginLeft: "1rem" }}>{`${a.length - alliances.length} hidden`}</span></p>
                    }
                    <InputGroup size="sm" inside style={{ width: 200, marginLeft: "2rem", marginRight: 'auto' }}>
                        <Input 
                            placeholder="Search..."
                            value={search} 
                            onChange={setSearch} 
                        />
                        <InputGroup.Button>
                            <Icon icon="search" />
                        </InputGroup.Button>
                    </InputGroup>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <p style={{ color: "#666666" }}>Show low participation</p>
                        <Checkbox checked={showLow} onChange={handleShowLow} />
                    </div>
                </div>
            }
            style={{ backgroundColor: "#0f131a", minHeight: 627 }}>
            <FlexboxGrid style={{ marginBottom: "1rem", color: "#AAAAAA" }}>
                <FlexboxGrid.Item componentClass={Col} md={6}>
                    {renderSortHeader('Name', 'name', 'flex-start')}
                </FlexboxGrid.Item>
                <FlexboxGrid.Item componentClass={Col} md={3}>
                    {renderSortHeader('Players', 'totalPlayers', 'flex-end')}
                </FlexboxGrid.Item>
                <FlexboxGrid.Item componentClass={Col} md={3}>
                    {renderSortHeader('Kills', 'kills', 'flex-end')}
                </FlexboxGrid.Item>
                <FlexboxGrid.Item componentClass={Col} md={3}>
                    {renderSortHeader('Deaths', 'deaths', 'flex-end')}
                </FlexboxGrid.Item>
                <FlexboxGrid.Item componentClass={Col} md={3}>
                    {renderSortHeader('Fame', 'killFame', 'flex-end')}
                </FlexboxGrid.Item>
                <FlexboxGrid.Item componentClass={Col} md={3}>
                    {renderSortHeader('Damage', 'totalDamage', 'flex-end')}
                </FlexboxGrid.Item>
                <FlexboxGrid.Item componentClass={Col} md={3}>
                    {renderSortHeader('IP', 'averageIp', 'flex-end')}
                </FlexboxGrid.Item>
            </FlexboxGrid>
            <List hover>
                {visible.map(renderAllianceStats)}
            </List>
            <div style={{
                marginLeft: 'auto',
                position: 'absolute',
                bottom: 10,
                right: "1rem"
            }}>
                {
                    alliances.length > 10 &&
                    <Pagination
                        // {...this.state}
                        pages={Math.ceil(alliances.length / 10)}
                        maxButtons={3}
                        next={true}
                        prev={true}
                        activePage={activePage}
                        onSelect={setActivePage}
                    />
                }
            </div>
        </Panel>
    )
}

export default AllianceTable