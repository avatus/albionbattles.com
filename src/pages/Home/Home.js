import React from 'react'
import Panel from 'rsuite/lib/Panel'
import FlexboxGrid from 'rsuite/lib/FlexboxGrid'
import Col from 'rsuite/lib/Col'
import Icon from 'rsuite/lib/Icon'
import Input from 'rsuite/lib/Input'
import InputGroup from 'rsuite/lib/InputGroup'

import { TAG_DATA } from '../../utils/constants'

const Home = () => {

    const renderItem = ({ value, label, img }) => {
        return (
            <FlexboxGrid.Item
                key={value}
                componentClass={Col}
                lg={8}
                md={12}
                sm={24}
                style={{
                    cursor: "pointer",
                    padding: "0.5rem"
                }}
            >
                <Panel 
                    shaded 
                    bodyFill
                    className="tag-panel"
                >
                    <div 
                    className="tag-card"
                    style={{
                        height: 160,
                        backgroundImage: `url(${img})`,
                    }}/>
                    {/* <img alt={label} src={img} width="100%" /> */}
                    <div 
                        style={{
                            background: "linear-gradient(90deg, rgba(41,45,51,1) 0%, rgba(43,47,54,1) 100%)",
                            padding: "0.5rem",
                    }}>
                        <p style={{fontSize: "1rem", fontWeight: 'bold'}}>{label}</p>
                    </div>
                </Panel>
            </FlexboxGrid.Item>
        )
    }

    const renderSearch = () => {
        return (
            <div style={{marginBottom: "3rem", padding: "0.5rem"}}>
                <p style={{
                    textAlign: 'center',
                    marginBottom: "1rem",
                    fontSize: "1.3rem",
                    fontWeight: "bold",
                }}>SEARCH BUILDS</p>
                <InputGroup size="lg" inside>
                    <Input />
                    <InputGroup.Button>
                        <Icon icon="search" />
                    </InputGroup.Button>
                </InputGroup>
            </div>
        )
    }

    const renderBuildTypes = () => {
        return (
            <div>
                <p style={{
                    textAlign: 'center',
                    marginBottom: "1rem",
                    fontSize: "1.3rem",
                    fontWeight: "bold",
                }}>SELECT BY CONTENT TYPE</p>
                <FlexboxGrid>
                    {TAG_DATA.map(renderItem)}
                </FlexboxGrid>
            </div>
        )
    }
    return (
        <div>
            <Col style={{height: "5vh"}} smHidden />
            {renderSearch()}
            {renderBuildTypes()}
        </div>
    )
}

export default Home