require('dotenv').config();
const sstsFetch = require('../modules/ssts_fetch_v2.0.0');

start(process.env.COMPANY_PROFILE_URL,"companyProfiles", sstsFetch.saveType.updateDuplicate, null, false );
start(process.env.COMPANY_QUOTE_URL,"companyQuotes", sstsFetch.saveType.updateDuplicate, null, false );

start(process.env.COMPANY_NEWS_URL,"companyNews", sstsFetch.saveType.ignoreDuplicate, "publishedDate", true);
start(process.env.COMPANY_MARKETCAP_URL,"companyMarketCaps", sstsFetch.saveType.ignoreDuplicate , "date", true);

function start(index_url, collectionName, saveType, filterDuplicate2, isLayer1Symbol) {
    var dataURL = process.env.THIRD_PARTY_API + index_url
 
    dataURL = dataURL.replace("[apikey]", process.env.THIRD_PARTY_KEY)

    sstsFetch.createData(dataURL, true, collectionName, saveType, "symbol", filterDuplicate2, isLayer1Symbol, "data")
}   
