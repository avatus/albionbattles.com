import React from 'react'
import Sidenav from 'rsuite/lib/Sidenav'
import { Link } from 'react-router-dom'
import Nav from 'rsuite/lib/Nav'
import Icon from 'rsuite/lib/Icon'

const SideNavigation = props => {
    return (
        <div style={{width: 200}}>
            <Sidenav
                expanded={true}
                style={{ minHeight: "100vh",borderRight: "1px solid #222222" }}
                defaultOpenKeys={['3', '4']}
                activeKey="1"
            >
                <Sidenav.Header>
                    <div style={{
                        width: "100%",
                        height: "160px", 
                        textAlign: 'center',
                    }}>
                        {/* <p>TestingTesting</p> */}
                    </div>
                </Sidenav.Header>
                <Sidenav.Body>
                    <Nav>
                        <Nav.Item icon={<Icon icon="cubes" />}>Builds</Nav.Item>
                        <Nav.Item icon={<Icon icon="book" />}>Guides</Nav.Item>
                        <Nav.Item componentClass={Link} to="/battle/113347427" icon={<Icon icon="book" />}>Battles</Nav.Item>
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        </div>
    )
}

export default SideNavigation