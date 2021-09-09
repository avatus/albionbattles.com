import React, { useState, useEffect } from 'react';
import ThemeProvider from './utils/ThemeProvider'
import Container from 'rsuite/lib/Container'
import Footer from 'rsuite/lib/Footer'
import reactga from 'react-ga'
// import SideNavigation from './components/SideNavigation'
// import Header from './components/Header'
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom'

// import Home from './pages/Home/Home'
import BattleLog from './pages/BattleLog/BattleLog'
import BattleSearch from './pages/SearchBattles/BattleSearch'

const App = props => {
    useEffect(() => {
        reactga.initialize('UA-174250715-2')
    },[])
    const [theme] = useState(window.localStorage.getItem('theme') || 'light')
    return (
        <ThemeProvider theme={theme}>
            <Router>
                {/* <Header /> */}
                <Container style={{

                }}>
                    <div style={{
                        width: "100%", 
                        display: 'flex', 
                        backgroundSize: "cover",
                        backgroundImage: `url(https://res.cloudinary.com/synaptics/image/upload/v1598945915/rsz_sinyatt_recovered_-01_qgzzeg_fvvwjt.jpg)`,
                        // background: '#444444',
                        // backgroundAttachment: 'fixed',
                        padding: 0
                    }}>
                        {/* <SideNavigation /> */}
                        <div style={{
                            minHeight: "calc(100vh - 80px)",
                            width: "100%", 
                            maxWidth: 1600, 
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}>
                            <Switch>
                                {/* <Route exact path="/" component={Home} /> */}
                                <Route exact path="/" component={BattleSearch} />
                                <Route exact path="/battles/:id" component={BattleLog} />
                                <Route exact path="/multilog" component={BattleLog} />
                                <Redirect to="/" />
                            </Switch>
                        </div>
                    </div>
                        <Footer style={{
                            width: "100%", 
                            maxWidth: 1600, 
                            color: "#666666",
                            padding: 20,
                            margin: 'auto'}}>
                                <div style={{paddingLeft: 20, paddingRight: 20}}>This killboard is in beta. I have a google analytics tag running but it's only tracking page views, no data is stored. If you find any bugs or have any suggestions please contact me on discord: Alienzz#0001</div>
                            </Footer>
                </Container>
            </Router>
        </ThemeProvider>
    )
}

export default App
