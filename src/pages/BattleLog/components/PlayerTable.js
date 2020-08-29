import React, { useState } from 'react'
import { ITEM_ICON_URL } from '../../../utils/constants'
import FlexboxGrid from 'rsuite/lib/FlexboxGrid'
import List from 'rsuite/lib/List'
import Tooltip from 'rsuite/lib/Tooltip'
import InputGroup from 'rsuite/lib/InputGroup'
import Input from 'rsuite/lib/Input'
import Icon from 'rsuite/lib/Icon'
import Whisper from 'rsuite/lib/Whisper'
import Panel from 'rsuite/lib/Panel'
import Col from 'rsuite/lib/Col'
import Pagination from 'rsuite/lib/Pagination'
import abbreviate from 'number-abbreviate'

const intToString = (value, prec) => {
    return (abbreviate(value, prec || 1));
}

const tooltip = (
    <Tooltip>
        Albion API only provides the top 4 damage/healing contributors to a kill so the damage/healing tracker may be inaccurate.
    </Tooltip>
);

const PlayerTable = ({ players: p }) => {
    const players = [...p]
    const [activePage, setActivePage] = useState(1)
    const [sort, setSort] = useState('killFame')
    const [sortDirection, setSortDirection] = useState(true)
    const [search, setSearch] = useState('')
    const handleSort = column => _ => {
        if (sort === column) {
            setSortDirection(!sortDirection)
        }
        else {
            setSort(column)
            setSortDirection(true)
        }
    }

    //eslint-disable-next-line
    sort && players.sort((a, b) => {
        if (sort === 'name' || sort === "allianceName" || sort === "guildName") {
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

    let visible = players
        .filter(i => {
            return i.name.toLowerCase().includes(search.toLowerCase()) ||
            i.allianceName.toLowerCase().includes(search.toLowerCase()) ||
            i.guildName.toLowerCase().includes(search.toLowerCase())
        })
        .slice(((activePage - 1) * 10), activePage * 10)
    // let topKills = guild.kills === maxGuildKills
    // let topFame = guild.killFame === maxGuildKillFame
    // let borderClass = topKills && topFame ? "fameandkills" : topKills ? 'topkills' : topFame ? 'topfame' : null
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
    const renderPlayerStats = (player) => {
        const item = player.equipment && player.equipment.mainhand ? player.equipment.mainhand : null
        return (
            <List.Item
                key={player.id}
            >
                <FlexboxGrid>
                    <FlexboxGrid.Item componentClass={Col} md={6}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <div style={{
                                height: 32,
                                width: 32,
                                marginRight: "1rem",
                                backgroundImage: `url(${ITEM_ICON_URL}${item}?size=32)`,
                            }} />
                            {player.name}
                        </div>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} md={3}>
                        <p style={{ textAlign: "right" }}>{player.guildName}</p>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} md={3}>
                        <p style={{ textAlign: "right" }}>{player.allianceName}</p>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} md={2}>
                        <p style={{ textAlign: "right" }}>{player.kills}</p>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} md={2}>
                        <p style={{ textAlign: "right" }}>{player.deaths}</p>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} md={2}>
                        <p style={{ textAlign: "right" }}>{intToString(player.killFame)}</p>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} md={2}>
                        <p style={{ textAlign: "right" }}>{intToString(player.totalDamage)}</p>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} md={2}>
                        <p style={{ textAlign: "right" }}>{intToString(player.totalHealing)}</p>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} md={2}>
                        <p style={{ textAlign: "right" }}>{player.ip}</p>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </List.Item>
        )

    }

    return (
        <Panel
            header={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p>{`Players (${players.length})`}</p>
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
                </div>
            }
            style={{ backgroundColor: "#0f131a", minHeight: 740 }}>
            <FlexboxGrid style={{ marginBottom: "1rem", color: "#AAAAAA" }}>
                <FlexboxGrid.Item componentClass={Col} md={6}>
                    {renderSortHeader('Name', 'name', 'flex-start')}
                </FlexboxGrid.Item>
                <FlexboxGrid.Item componentClass={Col} md={3}>
                    {renderSortHeader('Guild', 'guildName', 'flex-end')}
                </FlexboxGrid.Item>
                <FlexboxGrid.Item componentClass={Col} md={3}>
                    {renderSortHeader('Alliance', 'allianceName', 'flex-end')}
                </FlexboxGrid.Item>
                <FlexboxGrid.Item componentClass={Col} md={2}>
                    {renderSortHeader('Kills', 'kills', 'flex-end')}
                </FlexboxGrid.Item>
                <FlexboxGrid.Item componentClass={Col} md={2}>
                    {renderSortHeader('Deaths', 'deaths', 'flex-end')}
                </FlexboxGrid.Item>
                <FlexboxGrid.Item componentClass={Col} md={2}>
                    {renderSortHeader('Fame', 'killFame', 'flex-end')}
                </FlexboxGrid.Item>
                <FlexboxGrid.Item componentClass={Col} md={2}>
                    <Whisper placement="top" trigger="hover" speaker={tooltip}>
                            {renderSortHeader('Damage', 'totalDamage', 'flex-end')}
                    </Whisper>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item componentClass={Col} md={2}>
                    <Whisper placement="top" trigger="hover" speaker={tooltip}>
                            {renderSortHeader('Healing', 'totalHealing', 'flex-end')}
                    </Whisper>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item componentClass={Col} md={2}>
                    {renderSortHeader('Item Power', 'ip', 'flex-end')}
                </FlexboxGrid.Item>
            </FlexboxGrid>
            <List hover>
                {visible.map(renderPlayerStats)}
            </List>
            <div style={{
                marginLeft: 'auto',
                position: 'absolute',
                bottom: 0,
                right: "1rem"
            }}>
                {
                    players.length > 10 &&
                    <Pagination
                        first={true}
                        last={true}
                        boundaryLinks={true}
                        ellipsis={true}
                        pages={Math.ceil(players.length / 10)}
                        maxButtons={5}
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

export default PlayerTable