import React from 'react'
import List from 'rsuite/lib/List'
import Pagination from 'rsuite/lib/Pagination'
import BattleListItem from './BattleListItem'

const BattleList = ({battles, activePage, setActivePage}) => {
    return (
        <div>
            <List>
                {battles && battles.docs && battles.docs.map(b => <BattleListItem key={b.id} battle={b} />)}
            </List>
            {
                battles.totalDocs > 50 &&
                <div style={{ textAlign: 'right' }}>
                    <Pagination
                        first={true}
                        last={true}
                        boundaryLinks={true}
                        ellipsis={true}
                        pages={Math.ceil(battles.totalDocs / 50)}
                        maxButtons={3}
                        next={true}
                        prev={true}
                        activePage={activePage}
                        onSelect={setActivePage}
                    />
                </div>
            }
            <div style={{marginTop: "1rem", color: "#666"}}>
                <p>I'm currently removing any battle 5 days after it has been parsed. If a battle accessed from a link is not found in the database, it will parse the battle again. I can adjust the time to live higher once I get a sense of how much data can be realistically stored. I aim to hover around 85% capacity to give space for big reset days.</p>
            </div>
        </div>
    )
}

export default BattleList