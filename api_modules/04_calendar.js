require('dotenv').config();
const sstsFetch = require('../modules/ssts_fetch_v2.0.0');
const utilDateTime = require('../modules/util_datetime_v1.0.0');

main()

async function  main( ) {
    start(process.env.CALENDAR_FINANCIALREPORT_URL,"calendarFinancialReport");
    start(process.env.CALENDAR_STOCKSPLIT_URL,"calendarStockSplit"); 
    start(process.env.CALENDAR_DIVIDEND_URL,"calendarDividend"); 
    start(process.env.CALENDAR_IPO_URL,"calendarIPO");  
}
 
async function  start(index_url, collectionName) {
    var dataURL = process.env.THIRD_PARTY_API + index_url

    var dateEnd = utilDateTime.formatDateToString(utilDateTime.addMonth(utilDateTime.getCurrentDate(), 1), 'yyyy-MM-dd') 
    var dateStart = utilDateTime.formatDateToString(utilDateTime.addMonth(utilDateTime.getCurrentDate(), -1), 'yyyy-MM-dd') 

    dataURL = dataURL.replace("[apikey]", process.env.THIRD_PARTY_KEY)
    dataURL = dataURL.replace("[from]", dateStart)
    dataURL = dataURL.replace("[to]", dateEnd)
  
    var result1 = await sstsFetch.createData(dataURL, false, collectionName, 
        sstsFetch.saveType.ignoreDuplicate, "symbol", "date", false, "data")
 
}
 