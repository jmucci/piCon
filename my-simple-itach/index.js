'use strict';
var Itach;
var net = require('net');


var commandQueue = [];
var nextCommand;
var result = [];
var socket;
var inProcess = false;

module.exports = Itach = function (host) {
  this.hostAddress = host;
};

Itach.prototype.send = function (command, callback) {
	var err;

	if (!this.hostAddress) { return callback(new Error('No host')); }

	commandQueue.push( {command: command, callback: callback, delay: 250 } );
	console.log("my itach commandQueue.length: " + commandQueue.length);
	
	console.log("inProcess: " + inProcess)
	if(inProcess)
	{
		console.log("pushed command inProcess: " + inProcess)
		return callback(null, "pushed command");
	}
  
	// kick off first command
	if(commandQueue.length == 1)
	{
		console.log("calling new net.Socket()");
		socket = new net.Socket();
		socket.setEncoding('ASCII');
		socket.connect(4998, this.hostAddress);  
		
		nextCommand = commandQueue.shift();
		console.log("calling socket.write() at: " + this.hostAddress);
		inProcess = true;
		socket.write(nextCommand.command, 'ASCII');
	}
  
	// recieved ack back from previous write
	socket.on('data', function (ack) {
		console.log("socket.on.data: " + ack);  
		result.push(ack);
		// dequeue and execute the next command
		if(commandQueue.length > 0)
		{
			// setTimeout(function () {   
				nextCommand = commandQueue.shift();
				console.log("calling socket.write()");
				socket.write(nextCommand.command, 'ASCII');
			// }, 100);
			
		}
		else 
		{
			console.log("calling socket.end()");
			inProcess = false;
			socket.end();
		}
	});

  
  socket.on('error', function (error) {
    err = error; // error with connection, closes socket
  });
  socket.on('close', function () {
	console.log("socket.on.close()");
    if (err) {
      return callback(err);
    }
    return callback(null, result.pop());
  });

};