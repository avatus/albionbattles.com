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
        </div>
    )
}

export default BattleList