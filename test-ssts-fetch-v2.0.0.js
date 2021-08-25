require('dotenv').config();
var sstsFetch = require("./modules/ssts_fetch_temp_v2.0.0")
 
start();

function start() {
    runDataNasdaq();
}

function runDataNasdaq() {
  var jsonData = getJSONData_NasdaqList();
    
  sstsFetch.saveDataAllSymbol(jsonData, "indexNasdaqs", null, null, null )
}

function getJSONData_NasdaqList() {
    var data = 
    [ {
        "symbol" : "DX-Y.NYB",
        "name" : "US Dollar/USDX - Index - Cash ",
        "price" : 92.52300000,
        "changesPercentage" : 0.01000000,
        "change" : 0.00500000,
        "dayLow" : 92.47100000,
        "dayHigh" : 93.01100000,
        "yearHigh" : 94.74000000,
        "yearLow" : 89.21000000,
        "marketCap" : null,
        "priceAvg50" : 92.50085400,
        "priceAvg200" : 91.43796000,
        "volume" : null,
        "avgVolume" : 0,
        "exchange" : "INDEX",
        "open" : 92.96600000,
        "previousClose" : 92.51800000,
        "eps" : null,
        "pe" : null,
        "earningsAnnouncement" : null,
        "sharesOutstanding" : null,
        "timestamp" : 1629049450
      }, {
        "symbol" : "^XAX",
        "name" : "NYSE AMEX COMPOSITE INDEX",
        "price" : 3034.83280000,
        "changesPercentage" : -0.46000000,
        "change" : -14.03720000,
        "dayLow" : 3032.85250000,
        "dayHigh" : 3060.71240000,
        "yearHigh" : 3353.28000000,
        "yearLow" : 1864.66000000,
        "marketCap" : null,
        "priceAvg50" : 3224.24460000,
        "priceAvg200" : 2793.28150000,
        "volume" : 0,
        "avgVolume" : 0,
        "exchange" : "INDEX",
        "open" : 3048.87130000,
        "previousClose" : 3048.87000000,
        "eps" : null,
        "pe" : null,
        "earningsAnnouncement" : null,
        "sharesOutstanding" : null,
        "timestamp" : 1629049450
      }, {
        "symbol" : "^HSI",
        "name" : "HANG SENG INDEX",
        "price" : 26391.62000000,
        "changesPercentage" : -0.48000000,
        "change" : -126.18000000,
        "dayLow" : 26200.24000000,
        "dayHigh" : 26521.95000000,
        "yearHigh" : 31183.36000000,
        "yearLow" : 23124.25000000,
        "marketCap" : null,
        "priceAvg50" : 27149.72900000,
        "priceAvg200" : 28505.52300000,
        "volume" : 0,
        "avgVolume" : 2183461614,
        "exchange" : "INDEX",
        "open" : 26296.19000000,
        "previousClose" : 26517.80000000,
        "eps" : null,
        "pe" : null,
        "earningsAnnouncement" : null,
        "sharesOutstanding" : null,
        "timestamp" : 1629049450
      }, {
        "symbol" : "^DJI",
        "name" : "Dow Jones Industrial Average",
        "price" : 35515.38000000,
        "changesPercentage" : 0.04000000,
        "change" : 15.48000000,
        "dayLow" : 35474.78000000,
        "dayHigh" : 35610.57000000,
        "yearHigh" : 35610.57000000,
        "yearLow" : 26143.77000000,
        "marketCap" : null,
        "priceAvg50" : 34874.69500000,
        "priceAvg200" : 33540.89000000,
        "volume" : 238678774,
        "avgVolume" : 300092380,
        "exchange" : "INDEX",
        "open" : 35551.56000000,
        "previousClose" : 35499.90000000,
        "eps" : null,
        "pe" : null,
        "earningsAnnouncement" : null,
        "sharesOutstanding" : null,
        "timestamp" : 1629049450
      }]
    return data;
}