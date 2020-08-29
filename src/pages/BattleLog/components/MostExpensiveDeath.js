import React from 'react'
// import axios from 'axios'
import { ITEM_ICON_URL } from '../../../utils/constants'
import Panel from 'rsuite/lib/Panel'
// import Whisper from 'rsuite/lib/Whisper'
// import Tooltip from 'rsuite/lib/Tooltip'
// import abbreviate from 'number-abbreviate'

// const intToString = (value, prec) => {
//     return (abbreviate(value, prec || 1));
// }

const thousands_separators = (num) => {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
}

const renderItem = ({ item, quant }) => {
    const image = `${ITEM_ICON_URL}${item}?size=64`
    // const tooltip = (
    //     <Tooltip>
    //         <img
    //             src={image}
    //             alt={item}
    //         />
    //         <p>{item}</p>
    //     </Tooltip>
    // )
    return (
        <div 
            key={`${item}`}
            style={{
            minWidth: 48,
            height: 48,
            backgroundSize: 'cover',
            backgroundImage: `url(${image})`
        }}>
            {quant > 1 && 
                <span style={{
                position: 'relative',
                top: "30%",
                right: "10%",
                color: "white", 
                fontWeight: 'bold'}}>{quant}</span>}
        </div>
        // <Whisper placement="auto" speaker={tooltip}>
        // <span 
        //     key={item}
        //     style={{
        //         backgroundSize: 'cover',
        //         backgroundImage: `url(${image})`,
        //     }}
        // >
        //     <div style={{height: 48, width: 48}} />
        // </span>
        // </Whisper>
    )
}

const MostExpensiveDeath = ({ players }) => {
    const player = players.player
    // const [price, setPrice] = useState(null)
    let inv = player.Inventory.filter(i => i !== null)
    let eq = Object.keys(player.Equipment)
    let items = []
    eq.forEach(e => {
        if (player.Equipment[e]) {
            items.push({ item: player.Equipment[e].Type, quant: 1 })
        }
    })
    inv.forEach(i => {
        items.push({ item: i.Type, quant: i.Count })
    })
    // useEffect(() => {
    //     let totalPrice = 0
    //     let totalItems = 0
    //     let totals = {}
    //     axios.get(`https://www.albion-online-data.com/api/v2/stats/Prices/${items.join(',')}?locations=Thetford,Bridgewatch,Lymhurst,Fort Sterling,Martlock`)
    //         .then(response => {
    //             response.data.forEach(i => {
    //                 if (i.buy_price_max > 0) {
    //                     let quant = 1
    //                     let total = Math.round(i.buy_price_max)
    //                     inv.forEach(n => {
    //                         if (n.Type === i.item_id && n.Count > 1) {
    //                             quant = n.Count
    //                         }
    //                     })
    //                     if (totals[i.item_id]) {
    //                         if (total < totals[i.item_id].total) {
    //                             totals[i.item_id].total = total 
    //                         }
    //                         totals[i.item_id].quant = quant
    //                     }
    //                     else {
    //                         totals[i.item_id] = {
    //                             quant,
    //                             total,
    //                         }
    //                     }
    //                 }
    //             })
    //             console.log(totals)
    //             setPrice(Math.round(totalPrice / totalItems))
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }, [items, inv])
    return (
        <Panel
            bodyFill
            style={{
                minHeight: 220,
                padding: "10px",
                borderLeft: "3px solid rgb(41, 206, 224)",
                backgroundColor: "#0f131a",
            }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: "1rem"
                }}>
                <span>Biggest Donation</span>
                <span style={{ color: "rgb(41, 206, 224)" }}>{`${thousands_separators(player.DeathFame)} Death Fame`}</span>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                fontSize: "1.2rem",
            }}>
                <div style={{ minWidth: 200 }}>
                    <span>{player.Name}</span>
                    <p style={{ color: "#999999" }}>{`${player.GuildName} [${player.AllianceName}]`}</p>
                    <span style={{fontSize: 16, color: "#999999"}}>{`Item Power: ${Math.round(player.AverageItemPower)}`}</span>
                    {/* <p>Estimated Cost: <span style={{ color: "rgb(41, 206, 224)" }}>{`${price ? intToString(price) : 'Estimating...'}`}</span></p> */}
                </div>
                <div
                    className="item-list"
                    style={{
                        overflowY: 'auto',
                        maxHeight: 160,
                        width: '100%',
                        textAlign: 'right',
                        maxWidth: 350
                    }}>
                    {items.map(renderItem)}
                </div>
            </div>
        </Panel>
    )
}

export default MostExpensiveDeath