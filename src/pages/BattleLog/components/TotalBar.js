import React from 'react'
import Tooltip from 'rsuite/lib/Tooltip'
import Whisper from 'rsuite/lib/Whisper'
import abbreviate from 'number-abbreviate'

const intToString = (value, prec) => {
    return (abbreviate(value, prec || 1));
}

const renderTotalBar = ({ a, t, background }) => {
    const percent = Math.round((a / t) * 100)
    const tooltip = (
        <Tooltip>{a > 1000 ? intToString(a) : a}</Tooltip>
    )
    return (
        <Whisper placement="left" trigger="hover" speaker={tooltip}>
            <div style={{ flexBasis: "75%", display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <div style={{
                    borderRadius: 5,
                    background: background,
                    height: 15,
                    width: `${percent}%`
                }} />
            </div>
        </Whisper>
    )
}

export default renderTotalBar