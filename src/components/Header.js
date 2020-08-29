import React from 'react'
import Navbar from 'rsuite/lib/Navbar'
import Nav from 'rsuite/lib/Nav'

const Header = () => {
    return (
        <Navbar>
            <Navbar.Body>
                <Nav style={{width: "100%", maxWidth: 1200, margin: 'auto'}}>
                    <Nav.Item>Home</Nav.Item>
                </Nav>
            </Navbar.Body>
        </Navbar>
    )
}

export default Header