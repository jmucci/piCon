function start() {
  var pin0 = new Pin(0);
var pin2 = new Pin(2);
var http = require ("http");
var queryData;
var httpsrv = http.createServer (function(request, response)
	{
	response.writeHead(200, {"Content-Type": "text/plain"});

	queryData = url.parse(request.url, true);
	//console.log(queryData);

	if (queryData.pathname == "/hello") {
		response.write ("<b>Welcome</b> to the ESP8266 test");
	}

	else if (queryData.pathname == "/set") {
		//console.log("have set command");

		var message = "set not executed, bad parameters";

		if(queryData.query.pin){ pin = queryData.query.pin; }
		if(queryData.query.value) { value = queryData.query.value; }

		if((pin == 0 || pin == 2) && (value == 0 || value == 1))
		{
			if(pin == 0) {  pin0.write(parseInt(value)); }
			if(pin == 2) {  pin2.write(parseInt(value)); }
			message = "set pin: " + pin + " to value: " + value;
			//console.log(message);
		}

		response.write(message);

	}
	response.end();
});
httpsrv.listen (8088);
console.log("Listening on port 8088");
}
E.on("init", start);
save();

