require('dotenv').config();
const sstsFetch = require('../modules/ssts_fetch_v2.0.0');

main()

async function  main( ) {
    await startQuarterly(process.env.FA_INCOME_URL,"faIncomes");
    await startQuarterly(process.env.FA_BALANCESHEET_URL,"faBalanceSheet");
    await startQuarterly(process.env.FA_CASHFLOW_URL,"faCashFlow");
    await startQuarterly(process.env.FA_FINANCIALRATIO_URL,"faFinancialRatio");
    await startQuarterly(process.env.FA_FINANCIALGROWTH_URL,"faFinancialGrowth");
    await startQuarterly(process.env.FA_KEYMETRICS_URL,"faKeyMetrics");
    await startQuarterly(process.env.FA_STOCKSPLIT_URL,"faStockSplit");
    await startQuarterly(process.env.FA_DIVIDEND_URL,"faDividend");
 
    await startYearly(process.env.FA_INCOME_URL,"faIncomes");
    await startYearly(process.env.FA_BALANCESHEET_URL,"faBalanceSheet");
    await startYearly(process.env.FA_CASHFLOW_URL,"faCashFlow");
    await startYearly(process.env.FA_FINANCIALRATIO_URL,"faFinancialRatio");
    await startYearly(process.env.FA_FINANCIALGROWTH_URL,"faFinancialGrowth");
    await startYearly(process.env.FA_KEYMETRICS_URL,"faKeyMetrics");
    await startYearly(process.env.FA_STOCKSPLIT_URL,"faStockSplit");
    await startYearly(process.env.FA_DIVIDEND_URL,"faDividend");
}
 
async function  startQuarterly(index_url, collectionName, layer2Name) {
    var dataURL = process.env.THIRD_PARTY_API + index_url
 
    dataURL = dataURL.replace("[apikey]", process.env.THIRD_PARTY_KEY)

    var dataURL_Quarter = dataURL.replace("[quarter-period]", "&period=quarter" )
  
    var result1 = await sstsFetch.createData(dataURL_Quarter, true, collectionName, sstsFetch.saveType.ignoreDuplicate, "symbol", "date", true, "quarterly")
}

async function  startYearly(index_url, collectionName) {
    var dataURL = process.env.THIRD_PARTY_API + index_url
 
    dataURL = dataURL.replace("[apikey]", process.env.THIRD_PARTY_KEY)

    var dataURL_Year = dataURL.replace("[quarter-period]", "" )
     
    var result1 = await sstsFetch.createData(dataURL_Year, true, collectionName, sstsFetch.saveType.ignoreDuplicate, "symbol", "date", true, "yearly")

}