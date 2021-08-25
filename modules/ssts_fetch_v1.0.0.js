const https = require('https');
const url = require('url');

exports.fetchData = function (responseFetch, db, collectionName, keyFindJSON, sourceDataURL) {
  var options = url.parse(sourceDataURL);
  var financeDataJSON;

  //get json data
  https.get(options, function(response) {

    //start collecting data when success
    if (response.statusCode == 200) {

      let chunks = [];
      response.on("data", function(data) {
        //collect data as it's coming per chunks
        chunks.push(data);

      //start processing data
      }).on("end", function() {
        let dataJSONByte   = Buffer.concat(chunks);

        financeDataJSON = JSON.parse(dataJSONByte);

        var bulk = db.collection(collectionName).initializeOrderedBulkOp();
        financeDataJSON.forEach(record => {

          Object.keys(keyFindJSON).forEach(key => {
            keyFindJSON[key]= record[key];
          })
          console.log("keyFindJSON :");
          console.log(keyFindJSON);
          console.log("record : ");
          console.log(record);

          bulk.find(keyFindJSON).upsert().replaceOne(record);
        })
        bulk.execute();
 
        //send result
        responseFetch.setHeader('Content-Type', 'application/json');
        responseFetch.send(JSON.stringify(financeDataJSON));

        console.log('Done')

        //convert JSON data into array of JSON objects
        /*
        var arrayRecord = [];
        financeDataJSON.forEach(record => {
            arrayRecord.push(record);
        });


        // Insert JSON straight into MongoDB
        db.collection(collectionName).insertMany(financeDataJSON, function (err, result) {
           if (err) {
              console.log(err);
            }
           else {
             //send result
             responseFetch.setHeader('Content-Type', 'application/json');
             responseFetch.send(JSON.stringify(financeDataJSON));

             console.log('Done')
          }
        })
        */
      })

    }
  })
};
