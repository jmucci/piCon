
//
// irDevices
//
var irDevices = [

]
exports.irDevices = irDevices;

//
// httpDevices
//
var httpDevices = [

	{	id: "piconMucciMucci", hostAddress:  'http://piconMucciHome:8080', hostVerb: 'get' }
]
exports.httpDevices = httpDevices;

//
// httpCOMMANDS
//
var httpCOMMANDS = {

	"piconMucciHome.DoorSensorOn": "/api/DoorSensor/ON",
	"piconMucciHome.DoorSensorOn": "/api/DoorSensor/OFF"

};
exports.httpCOMMANDS = httpCOMMANDS;

//
// irCOMMANDS ... sendir,<connectoraddress module:connector>,<ID>,<frequency>,<repeat>,<offset>,<on1>,
//
var irCOMMANDS = {

};
exports.irCOMMANDS = irCOMMANDS;

var pageItems = [

]
exports.pageItems = pageItems;	


//
// data model
//
var mySSlist = [



	//	//////////////////////////////////////////////////////////////////////
	//  input sensors
	//
	{ 
	style: "sensor-toggle",  device: "gpio", pin : "4", direction: "in", edges: "both", activeLow: false,
	name: "Visitor Detected"
	},
	
	{ 
	style: "sensor-toggle",  device: "gpio", pin : "22", direction: "in", edges: "both", activeLow: false,
	name: "Garage Door Sensor"
	},  
	
	
	//	//////////////////////////////////////////////////////////////////////
	//  relay drivers
	//
	{ 
		device: "gpio", pin : "20",	direction: "out", edges: "both", name: "Garage Relay 1", state: true
	},	
	
	{ 
		device: "gpio", pin : "16",	direction: "out", edges: "both", name: "Garage Relay 2", state: true
	},	


] // end mySSlist


exports.mySSlist = mySSlist;









