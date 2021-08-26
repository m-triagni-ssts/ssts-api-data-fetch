require('dotenv').config();
const sstsFetch = require('../modules/ssts_fetch_v2.0.0');

start(process.env.INDEX_SP_URL,"indexSPs", sstsFetch.saveType.ignoreDuplicate );
start(process.env.INDEX_NASDAQ_URL,"indexNasdaqs" , sstsFetch.saveType.ignoreDuplicate);
start(process.env.INDEX_DOWJONES_URL,"indexDowJones", sstsFetch.saveType.ignoreDuplicate );
start(process.env.INDEX_SECTORPERFORMANCE_URL,"indexSectorPerformances", sstsFetch.saveType.updateDuplicate );

function start(index_url, collectionName, saveType) {
    var dataURL = process.env.THIRD_PARTY_API + index_url

    dataURL = dataURL.replace("[apikey]", process.env.THIRD_PARTY_KEY)

    sstsFetch.createData(dataURL, false, collectionName, saveType, "symbol", null, false, "data")

}
