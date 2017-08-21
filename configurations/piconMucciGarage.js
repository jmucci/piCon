
//
// irDevices
//
var irDevices = [

]
exports.irDevices = irDevices;

//
// httppostDevices
//
var httppostDevices = [

	{	id: "piconMucciMucci", hostAddress:  'http://piconMucciHome:8080' }
]
exports.httppostDevices = httppostDevices;

//
// httppostCOMMANDS
//
var httppostCOMMANDS = {

	"piconMucciHome.DoorSensorOn": "/api/DoorSensor/ON",
	"piconMucciHome.DoorSensorOn": "/api/DoorSensor/OFF"

};
exports.httppostCOMMANDS = httppostCOMMANDS;

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
	name: "Garage Door"
	
	},  
	
	
	//
	// radio RF controls (code, p, t)
	//

	{
	name: "Outlet Power",    
	style: "button-toggle", device: "discete_toggle",  onLink: 'OutletPowerON', offLink: 'OutletPowerOFF'
	},

	{ 
	style: "button-momentary",   device: "rf", hostName: "433",  code:"87347",  p:"177" , t:"1",
	name: "Outlet Power ON", referLink: 'OutletPowerON'  
	},
	
	{ 
	style: "button-momentary",  device: "rf", hostName: "433",  code:"87356",  p:"177" , t:"1",
	name: "Outlet Power OFF", referLink: 'OutletPowerOFF'  
	},
	
	
] // end mySSlist


exports.mySSlist = mySSlist;









