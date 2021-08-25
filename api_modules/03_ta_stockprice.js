require('dotenv').config();
const sstsFetch = require('../modules/ssts_fetch_v2.0.0');

start(process.env.TA_STOCKPRICE_DAILY_URL,"taStockPriceDaily", "pricePerDay");
//start(process.env.TA_STOCKPRICE_PERMINUTE_URL,"taStockPricePerMinute", "pricePerMin"); 
 
async function  start(index_url, collectionName, layer2Name) {
    var dataURL = process.env.THIRD_PARTY_API + index_url
 
    dataURL = dataURL.replace("[apikey]", process.env.THIRD_PARTY_KEY)
     
    var result1 = await sstsFetch.createData(dataURL, true, collectionName, 
        sstsFetch.saveType.ignoreDuplicate, "symbol", "date", true, layer2Name)

}