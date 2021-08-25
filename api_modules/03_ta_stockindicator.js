require('dotenv').config();
const sstsFetch = require('../modules/ssts_fetch_v2.0.0');

main()

async function  main( ) {
    await start(process.env.TA_STOCKINDICATOR_URL,"taStockIndicators", "sma");
    await start(process.env.TA_STOCKINDICATOR_URL,"taStockIndicators", "ema");
    await start(process.env.TA_STOCKINDICATOR_URL,"taStockIndicators", "dema");
    await start(process.env.TA_STOCKINDICATOR_URL,"taStockIndicators", "tema");
    await start(process.env.TA_STOCKINDICATOR_URL,"taStockIndicators", "william");
    await start(process.env.TA_STOCKINDICATOR_URL,"taStockIndicators", "rsi");
    await start(process.env.TA_STOCKINDICATOR_URL,"taStockIndicators", "adx");
    await start(process.env.TA_STOCKINDICATOR_URL,"taStockIndicators", "standardDeviation");
}
 
async function  start(index_url, collectionName, layer2Name) {
    var dataURL = process.env.THIRD_PARTY_API + index_url
 
    dataURL = dataURL.replace("[apikey]", process.env.THIRD_PARTY_KEY)
    dataURL = dataURL.replace("[indicatorType]", layer2Name)
    dataURL = dataURL.replace("[dayPeriod]", 10)
 
    var result1 = await sstsFetch.createData(dataURL, true, collectionName, 
        sstsFetch.saveType.ignoreDuplicate, "symbol", "date", true, layer2Name)

}