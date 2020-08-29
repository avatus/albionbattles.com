export const ITEM_ICON_URL = `https://render.albiononline.com/v1/item/` // UNIQUE_ID
export const ITEM_DATA_URL = `https://gameinfo.albiononline.com/api/gameinfo/items/` // UNIQUE_ID/data
export const SPELL_ICON_URL = `https://render.albiononline.com/v1/spell/` // UNIQUE_ID
export const KILL_FEED_URL = `https://gameinfo.albiononline.com/api/gameinfo/events?limit=10&offset=0`
export const ROOT_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5001' : 'https://albion-builds-api.herokuapp.com'

export const TAG_DATA = [
    {value: "pve", label: "PvE", img: "https://res.cloudinary.com/synaptics/image/upload/v1598167622/rsz_nkdihxo_csvjdc.jpg"},
    {value: "pvp", label: "PvP", img: "https://res.cloudinary.com/synaptics/image/upload/v1598167855/rsz_f7504025f328d9f6576c3f495e65318dce281e1d_wge53v.jpg"},
    {value: "zvz", label: "ZvZ", img: "https://res.cloudinary.com/synaptics/image/upload/v1598167895/rsz_7907b5e030c8dd81de15f1827c1082e07f141eb0_ebwfp9.jpg"},
    {value: "hce", label: "Hardcore Expeditions", img: "https://res.cloudinary.com/synaptics/image/upload/v1598167927/rsz_a4ce860061a2e35622b3cade9550ebe9e10e0cd8_zkaduu.jpg"},
    {value: "solo", label: "Solo", img: "https://res.cloudinary.com/synaptics/image/upload/v1598167815/rsz_pxydc6n_zmswmb.jpg"},
    {value: "ganking", label: "Ganking", img: "https://res.cloudinary.com/synaptics/image/upload/v1598167969/rsz_96a2a4505ca066c49faedad67c2c79af1adb566f_x1bqgb.jpg"},
]