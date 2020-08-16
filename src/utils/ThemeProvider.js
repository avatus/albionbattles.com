import React from 'react'
import {Helmet} from "react-helmet";

const ThemeProvider = ({ theme, children }) => {
    return (
        <React.Fragment>
            <Helmet>
                <link async rel='stylesheet' href='./light.css' />
                <link async rel='stylesheet' href={theme === 'dark' ? './dark.css' : './light.css'} />
            </Helmet>
            {children}
        </React.Fragment>
    )
}

export default ThemeProvider