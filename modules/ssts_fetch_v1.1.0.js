const https = require('https');
const url = require('url');
const utilDateTime = require('./util_datetime_v1.0.0');

exports.fetchData = async function (user_id, user_apikey, responseFetch, db, collectionName, keyFindJSON, sourceDataURL, functionBeforeSaveData) {

  // find in database
  var result = db.collection(collectionName).find(keyFindJSON);
  var jsonResult  = [ ];
  await result.forEach((item) => {
    delete item._id
    jsonResult.push(item)
  });

  console.log("after retrieve from db : jsonResult.length : " + jsonResult.length)

   // if not found in database, get from API sourceData and save it to DB
   if (jsonResult.length == 0) {
     var options = url.parse(sourceDataURL);
     https.get(options, function(response) {

       // Start collecting data when success
       if (response.statusCode == 200) {

         let chunks = [];
         response.on("data", function(data) {

         // Collect data as it's coming per chunks
         chunks.push(data);

         // Start processing data
         }).on("end", function() {
           let dataJSONByte   = Buffer.concat(chunks);

           // Parse byte data into JSON object
           jsonResult = JSON.parse(dataJSONByte);

           console.log("after retrieve from api : jsonResult.length : " + jsonResult.length)

           // Add timestamp
           var currentDate = utilDateTime.formatDateToString(new Date(), "yyyy-MM-dd");
           jsonResult.forEach((item) => {
             item.timestamp = currentDate
           });

           //call function before save data
           functionBeforeSaveData(jsonResult, db.collection(collectionName));

           // Insert JSON straight into MongoDB
           db.collection(collectionName).insertMany(jsonResult, function (err, result) {
             if (err) {
               console.log(err);
             }
             else {
               sendJSONResponse(responseFetch, jsonResult)
             }
           })
         })
       }
     })
  }
  else {
    sendJSONResponse(responseFetch, jsonResult)
  }

};

function sendJSONResponse(responseFetch, jsonResult) {
  // send to sender
  console.log("send response");
  responseFetch.setHeader('Content-Type', 'application/json');
  responseFetch.send(jsonResult);
  console.log("done");

}
