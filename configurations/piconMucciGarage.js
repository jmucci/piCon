
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

	{	id: "piconHost", hostAddress:  'http://piconMucciDev:8080', hostVerb: 'get' }
]
exports.httpDevices = httpDevices;

//
// httpCOMMANDS
//
var httpCOMMANDS = {

	"piconHost.DoorSensorChange": "/api/DoorSensorChange/{state}",
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
	device: "gpio", pin : "4", direction: "in", edges: "both", activeLow: false,
	name: "Visitor Detected"
	},
	
	{ 
	device: "gpio", pin : "22", direction: "in", edges: "rising", activeLow: false,
	name: "Garage Door Sensor", relayHostAddress: "http://piconMucciDev:8080", relayHostCommand: "/api/DoorSensorChange/"
	},  
	
	
	//	//////////////////////////////////////////////////////////////////////
	//  relay drivers
	//
	{ 
		device: "gpio", pin : "20",	direction: "out", edges: "both", name: "Garage Relay 1", state: true
	},	
	
	{ 
		device: "gpio", pin : "16",	direction: "out", edges: "both", name: "Garage Relay 2", state: true, momentaryDelay: 1000
	},	


] // end mySSlist


exports.mySSlist = mySSlist;









