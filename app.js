const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const url = require('url');
const mongoose = require('mongoose');
//var Index = require("./models/index")
var sstsFetch = require("./modules/ssts_fetch_v1.1.0")
var sstsProperties = require("./modules/ssts_properties")
const utilDateTime = require('./modules/util_datetime_v1.0.0');

const app = express();

//allow app to use all local files (css & images) inside public folder
app.use(express.static("public"));

//allow app to use body parser to get input value inside the form
app.use(bodyParser.urlencoded({extended:true}));

//allow app to use ejs
app.set("view engine", "ejs");

//start the app with designated app_port
app.listen(sstsProperties.app_port, () => {
  console.log(`Server listening at http://localhost:${sstsProperties.app_port}`);
})

app.post("/api/v1/index", function(req, res) {
  var endpoint = sstsProperties.sourcedata_url + '/quotes/index?apikey=' + sstsProperties.sourcedata_key;
  var currentDate = utilDateTime.formatDateToString(new Date(), "yyyy-MM-dd");
  var user_id = req.body.user_id;
  var user_app_key = req.body.user_app_key;

  console.log("currentDate : " + currentDate);

  sstsFetch.fetchData(user_id, user_app_key, res, sstsProperties.db, 'indexes', {timestamp: currentDate} , endpoint,
    function(jsonResult, collection) {
      collection.deleteMany({});
    });
})
