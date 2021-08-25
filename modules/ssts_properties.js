
var app_port = process.env.PORT;

var db_host = process.env.db_host;
var db_port = process.env.db_port;
var db_name = process.env.db_name;

var sourcedata_url = process.env.sourcedata_url;
var sourcedata_key = process.env.sourcedata_key;

//set default value to all env variable
if (app_port == null || app_port == "") {
  app_port = 3000;
}
if (db_host == null || db_host == "") {
  db_host = 'localhost';
}
if (db_port == null || db_port == "") {
  db_port = 27017;
}
if (db_name == null || db_name == "") {
  db_name = 'finance-data';
}
if (sourcedata_key == null || sourcedata_key == "") {
  sourcedata_key = 'd4edc9317e7c90e29ebd11dd5f85d094';
}
if (sourcedata_url == null || sourcedata_url == "") {
  sourcedata_url = 'https://financialmodelingprep.com/api/v3';
}

// Connection URL DB
var db_url = 'mongodb://' + db_host  + ':' +  db_port + '/' + db_name;

// Connection DB
var db;



exports.app_port = app_port
exports.db_host = db_host
exports.db_port = db_port
exports.db_name = db_name
exports.db_url = db_url
exports.sourcedata_key = sourcedata_key
exports.sourcedata_url = sourcedata_url
