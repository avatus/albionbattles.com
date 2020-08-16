const axios = require('axios')
const fs = require('fs')

const slotType = "offhand"
const itemsJSON = require(`./${slotType}.json`)

const data = []

itemsJSON.forEach(i => {
  data.push({
    uniqueName: i.uniqueName,
    name: i.localizedNames['EN-US']
  })
  // if (i.slotType === slotType) {
  //   data.push(i)
  // }
})

// const allowed_types = [
//   "shoes",
// ]

// let items = []

// const got = [];

const storeData = (data, path) => {
    try {
      fs.writeFileSync(`${slotType}_small.json`, JSON.stringify(data))
    } catch (err) {
      console.error(err)
    }
};

storeData(data)


// (async function () {
//   for (var i = 0; i < itemsJSON.length; i++) {
//     let item = itemsJSON[i]
//     try {
//       let itemname = item.uniqueName.replace('@1', "").replace("@2", "").replace("@3","")
//         if (!got.includes(itemname)) {
//           got.push(itemname)
//           const { data } = await axios.get(`https://gameinfo.albiononline.com/api/gameinfo/items/${itemname}/data`)
//           if (allowed_types.includes(data.slotType)) {
//             console.log(`adding: ${data.uniqueName}`)
//             items.push(data)
//           }
//         }
//     } catch (err) {
//       console.log(err)
//     }
//   }
//   storeData(items)
// })()
