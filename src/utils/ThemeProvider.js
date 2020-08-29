import React from 'react'
import {Helmet} from "react-helmet";

const ThemeProvider = ({ theme, children }) => {
    return (
        <React.Fragment>
            <Helmet>
                <link async rel='stylesheet' href='/dark.css' />
            </Helmet>
            {children}
        </React.Fragment>
    )
}

export default ThemeProvider