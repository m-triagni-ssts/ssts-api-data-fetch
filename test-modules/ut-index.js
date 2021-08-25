

var endpoint_url = process.env.endpoint_url;
var endpoint_port = process.env.endpoint_port;

if (endpoint_url == null || endpoint_url == '') {
  endpoint_url = "localhost";
}
if (endpoint_port == null || endpoint_port == '') {
  endpoint_port = 3000;
}

var endpoint = "http://${endpoint_url}:${endpoint_port}"
