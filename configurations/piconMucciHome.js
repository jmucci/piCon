
//
// irDevices
//
var irDevices = [
	{	id: "TVremote", hostAddress:  '192.168.86.31' },
	{	id: "AMPremote", hostAddress:  '192.168.86.32' }
]
exports.irDevices = irDevices;

//
// httpDevices
//
var httpDevices = [
	{	id: "RokuLivingRoom", hostAddress:  'http://192.168.86.35:8060', hostVerb: 'post' },
	{	id: "RokuBedRoom", hostAddress:  'http://192.168.86.36:8060', hostVerb: 'post'},
	{	id: "IFTTT", hostAddress:  'https://maker.ifttt.com/trigger', hostVerb: 'post'},
	{	id: "piconMucciGarage", hostAddress:  'http://piconMucciGarage:8080', hostVerb: 'get'}
]
exports.httpDevices = httpDevices;

//
// httpCOMMANDS
//
var httpCOMMANDS = {
	"roku.Home": "/keypress/Home",
	"roku.Right": "/keypress/Right",
	"roku.Left": "/keypress/Left",
	"roku.Enter": "/keypress/Enter",
	"roku.Select": "/keypress/Select",
	"roku.Rev": "/keypress/Rev",
	"roku.Fwd": "/keypress/Fwd",
	"roku.Play": "/keypress/Play",
	"roku.Down": "/keypress/Down",
	"roku.Up": "/keypress/Up",
	"roku.Back": "/keypress/Back",
	"roku.InstantReplay": "/keypress/InstantReplay",
	"roku.Options": "/keypress/Info",
	"roku.Backspace": "/keypress/Backspace",
	"roku.Search": "/keypress/Search",

	"IFTTT.piConEvent": "/piConEvent/with/key/dh5BVMQuljyTGGBNSKzZUF",

	"piconMucciGarage.OutLetON": "/api/Outlet/ON",
	"piconMucciGarage.OutLetOFF": "/api/Outlet/OFF"

};
exports.httpCOMMANDS = httpCOMMANDS;

//
// irCOMMANDS ... sendir,<connectoraddress module:connector>,<ID>,<frequency>,<repeat>,<offset>,<on1>,
//
var irCOMMANDS = {
	"amp.MUTETOGGLE":"sendir,1:1,1,38000,<repeat>,69,343,172,21,21,21,64,21,21,21,21,21,64,21,21,21,64,21,64,21,64,21,21,21,64,21,64,21,21,21,64,21,64,21,21,21,64,21,21,21,64,21,21,21,21,21,21,21,21,21,21,21,21,21,64,21,21,21,64,21,64,21,64,21,64,21,64,21,1483,343,87,21,3670",
	"amp.VOLUMEUP": "sendir,1:1,1,38000,<repeat>,1,339,170,21,21,21,63,21,21,21,21,21,63,21,21,21,63,21,63,21,63,21,21,21,63,21,63,21,21,21,63,21,63,21,21,21,21,21,63,21,21,21,21,21,21,21,21,21,21,21,21,21,63,21,21,21,63,21,63,21,63,21,63,21,63,21,63,21,1466",
	"amp.VOLUMEDOWN": "sendir,1:1,1,38000,<repeat>,1,339,170,21,21,21,63,21,21,21,21,21,63,21,21,21,63,21,63,21,63,21,21,21,63,21,63,21,21,21,63,21,63,21,21,21,63,21,63,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,63,21,63,21,63,21,63,21,63,21,63,21,1466",
	"amp.POWEROFF": "sendir,1:1,1,38000,<repeat>,69,342,172,22,22,22,64,22,22,22,22,22,64,22,22,22,64,22,64,22,22,22,22,22,64,22,64,22,22,22,64,22,64,22,22,22,64,22,64,22,64,22,22,22,22,22,22,22,64,22,22,22,22,22,22,22,22,22,64,22,64,22,64,22,22,22,64,22,1484,342,85,22,3677",
	"amp.POWERON":  "sendir,1:1,1,38000,<repeat>,69,342,172,22,22,22,64,22,22,22,22,22,64,22,22,22,64,22,64,22,64,22,22,22,64,22,64,22,22,22,64,22,64,22,22,22,22,22,22,22,64,22,22,22,22,22,22,22,22,22,22,22,64,22,64,22,22,22,64,22,64,22,64,22,64,22,64,22,1484,342,85,22,3677",
	"amp.POWER TOGGLE": "sendir,1:1,1,38000,<repeat>,69,339,170,21,21,21,63,21,21,21,21,21,63,21,21,21,63,21,63,21,63,21,21,21,63,21,63,21,21,21,63,21,63,21,21,21,21,21,21,21,63,21,21,21,21,21,21,21,21,21,21,21,63,21,63,21,21,21,63,21,63,21,63,21,63,21,63,21,1466,339,84,21,3633",
	
	"tv.POWEROFF": "sendir,1:1,1,38000,<repeat>,1,173,173,21,65,21,65,21,65,21,21,21,21,21,21,21,21,21,21,21,65,21,65,21,65,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,65,21,65,21,21,21,21,21,65,21,65,21,65,21,65,21,21,21,21,21,65,21,65,21,21,21,1832",
	"tv.POWERON": "sendir,1:1,1,38000,<repeat>,1,172,172,22,64,22,64,22,64,22,21,22,21,22,21,22,21,22,21,22,64,22,64,22,64,22,21,22,21,22,21,22,21,22,21,22,64,22,21,22,21,22,64,22,64,22,21,22,21,22,64,22,21,22,64,22,64,22,21,22,21,22,64,22,64,22,21,22,1820",
//	"tv.power": "sendir,1:1,1,37735,<repeat>,1,171,171,21,64BB,21,21CCCCBBBCCCCCCBCCCCCCBCBBBBBB,21,3773",

//  tv2 (MasterBedroom) uses port 1:2
	"tv2.POWEROFF": "sendir,1:2,1,38000,<repeat>,1,173,173,21,65,21,65,21,65,21,21,21,21,21,21,21,21,21,21,21,65,21,65,21,65,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,65,21,65,21,21,21,21,21,65,21,65,21,65,21,65,21,21,21,21,21,65,21,65,21,21,21,1832",
	"tv2.POWERON": "sendir,1:2,1,38000,<repeat>,1,172,172,22,64,22,64,22,64,22,21,22,21,22,21,22,21,22,21,22,64,22,64,22,64,22,21,22,21,22,21,22,21,22,21,22,64,22,21,22,21,22,64,22,64,22,21,22,21,22,64,22,21,22,64,22,64,22,21,22,21,22,64,22,64,22,21,22,1820",
	"tv2.POWER": "sendir,1:2,1,37735,<repeat>,1,171,171,21,64BB,21,21CCCCBBBCCCCCCBCCCCCCBCBBBBBB,21,3773",    
	// note repeat count = 3
	
	"switch1.input1":"sendir,1:1,1,37878,<repeat>,1,343,170,22,21,22,21,22,21,22,21,22,21,22,21,22,21,22,63,22,63,22,63,22,63,22,63,22,63,22,63,22,63,22,21,22,21,22,21,22,63,22,21,22,21,22,21,22,21,22,21,22,63,22,63,22,21,22,63,22,63,22,63,22,63,22,63,22,1509,343,85,22,3638,343,85,22,3638,343,85,22,3638,343,85,22,3700",
	"switch1.input2":"sendir,1:1,1,37993,<repeat>,1,343,171,22,21,22,21,22,21,22,21,22,21,22,21,22,21,22,63,22,63,22,63,22,63,22,63,22,63,22,63,22,63,22,21,22,21,22,63,22,63,22,21,22,21,22,21,22,21,22,21,22,63,22,21,22,21,22,63,22,63,22,63,22,63,22,63,22,3700",
	"switch1.input3":"sendir,1:1,1,37993,<repeat>,1,343,171,22,21,22,21,22,21,22,21,22,21,22,21,22,21,22,63,22,63,22,63,22,63,22,63,22,63,22,63,22,63,22,21,22,21,22,63,22,21,22,63,22,21,22,21,22,21,22,21,22,63,22,21,22,63,22,21,22,63,22,63,22,63,22,63,22,1513,237,3700",
	"switch1.input4":"sendir,1:1,1,37878,<repeat>,1,343,170,22,21,22,21,22,21,22,21,22,21,22,21,22,21,22,63,22,63,22,63,22,63,22,63,22,63,22,63,22,63,22,21,22,63,22,63,22,63,22,63,22,63,22,21,22,21,22,21,22,21,22,21,22,21,22,21,22,21,22,63,22,63,22,63,22,1508,343,85,22,3700",

//	tv2 (MasterBedroom) uses port 1:2
	"tv2.switch1.input1":"sendir,1:2,1,37878,<repeat>,1,343,170,22,21,22,21,22,21,22,21,22,21,22,21,22,21,22,63,22,63,22,63,22,63,22,63,22,63,22,63,22,63,22,21,22,21,22,21,22,63,22,21,22,21,22,21,22,21,22,21,22,63,22,63,22,21,22,63,22,63,22,63,22,63,22,63,22,1509,343,85,22,3638,343,85,22,3638,343,85,22,3638,343,85,22,3700",
	"tv2.switch1.input2":"sendir,1:2,1,37993,<repeat>,1,343,171,22,21,22,21,22,21,22,21,22,21,22,21,22,21,22,63,22,63,22,63,22,63,22,63,22,63,22,63,22,63,22,21,22,21,22,63,22,63,22,21,22,21,22,21,22,21,22,21,22,63,22,21,22,21,22,63,22,63,22,63,22,63,22,63,22,3700",
	"tv2.switch1.input3":"sendir,1:2,1,37993,<repeat>,1,343,171,22,21,22,21,22,21,22,21,22,21,22,21,22,21,22,63,22,63,22,63,22,63,22,63,22,63,22,63,22,63,22,21,22,21,22,63,22,21,22,63,22,21,22,21,22,21,22,21,22,63,22,21,22,63,22,21,22,63,22,63,22,63,22,63,22,1513,237,3700",
	"tv2.switch1.input4":"sendir,1:2,1,37878,<repeat>,1,343,170,22,21,22,21,22,21,22,21,22,21,22,21,22,21,22,63,22,63,22,63,22,63,22,63,22,63,22,63,22,63,22,21,22,63,22,63,22,63,22,63,22,63,22,21,22,21,22,21,22,21,22,21,22,21,22,21,22,21,22,63,22,63,22,63,22,1508,343,85,22,3700",


	//  uses port 1:3
	"sb2.VOLUMEDOWN": "sendir,1:3,1,38000,<repeat>,69,347,174,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,65,21,65,21,65,21,65,21,65,21,65,21,65,21,65,21,65,21,21,21,65,21,21,21,21,21,21,21,65,21,21,21,21,21,65,21,21,21,65,21,65,21,65,21,21,21,65,21,1572,347,87,21,3708",	
	"sb2.VOLUMEUP": "sendir,1:3,1,38000,<repeat>,69,343,172,21,22,21,22,21,22,21,22,21,22,21,22,21,22,21,22,21,65,21,65,21,65,21,65,21,65,21,65,21,65,21,65,21,65,21,22,21,22,21,22,21,22,21,22,21,65,21,22,21,22,21,65,21,65,21,65,21,65,21,65,21,22,21,65,21,1673,343,86,21,3732",
	"sb2.INPUTOPTICAL": "sendir,1:3,1,38000,<repeat>,69,346,174,22,21,22,21,22,21,22,21,22,21,22,21,22,21,22,21,22,65,22,65,22,65,22,65,22,65,22,65,22,65,22,65,22,21,22,21,22,21,22,65,22,21,22,21,22,65,22,65,22,65,22,65,22,65,22,21,22,65,22,65,22,21,22,21,22,1688,346,87,22,3766",
	
	//  uses port 1:3
	"DVD.FORWARD":"sendir,1:3,1,38000,1,1,170,170,18,18,18,18,18,18,18,18,18,18,18,56,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,170,18,56,18,56,18,56,18,18,18,56,18,18,18,56,18,18,18,56,18,18,18,18,18,18,18,18,18,56,18,18,18,56,18,18,18,56,18,56,18,56,18,2185",
	"DVD.REVERSE":"sendir,1:3,1,38000,1,1,170,170,18,18,18,18,18,18,18,18,18,18,18,56,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,170,18,56,18,56,18,56,18,18,18,18,18,56,18,18,18,18,18,56,18,18,18,18,18,18,18,56,18,18,18,56,18,56,18,18,18,56,18,56,18,56,18,2185",
	"DVD.POWER": "sendir,1:3,1,38000,<repeat>,1,170,170,18,18,18,18,18,18,18,18,18,18,18,56,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,170,18,56,18,56,18,56,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,56,18,56,18,56,18,56,18,56,18,56,18,56,18,56,18,2185",
	"DVD.TRAY": "sendir,1:3,1,38000,<repeat>,1,170,170,18,18,18,18,18,18,18,18,18,18,18,56,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,170,18,56,18,56,18,56,18,18,18,56,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,56,18,56,18,56,18,56,18,56,18,56,18,56,18,2185",
	"DVD.PLAY": "sendir,1:3,1,38000,<repeat>,1,170,170,18,18,18,18,18,18,18,18,18,18,18,56,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,170,18,56,18,56,18,56,18,18,18,18,18,18,18,56,18,18,18,56,18,18,18,18,18,18,18,56,18,56,18,18,18,56,18,18,18,56,18,56,18,56,18,2185",
	"DVD.STOP": "sendir,1:3,1,38000,<repeat>,1,170,170,18,18,18,18,18,18,18,18,18,18,18,56,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,170,18,56,18,56,18,56,18,18,18,56,18,56,18,18,18,18,18,56,18,18,18,18,18,18,18,18,18,18,18,56,18,56,18,18,18,56,18,56,18,56,18,2185",
	"DVD.CURSORDOWN":"sendir,1:3,1,38000,<repeat>,1,170,170,18,18,18,18,18,18,18,18,18,18,18,56,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,170,18,56,18,56,18,56,18,18,18,56,18,18,18,18,18,56,18,56,18,18,18,18,18,18,18,18,18,56,18,56,18,18,18,18,18,56,18,56,18,56,18,2185",
	"DVD.CURSORENTER":"sendir,1:3,1,38000,<repeat>,1,170,170,18,18,18,18,18,18,18,18,18,18,18,56,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,170,18,56,18,56,18,56,18,18,18,18,18,18,18,56,18,56,18,56,18,18,18,18,18,18,18,56,18,56,18,18,18,18,18,18,18,56,18,56,18,56,18,2185",
	"DVD.CURSORLEFT":"sendir,1:3,1,38000,<repeat>,1,170,170,19,19,19,18,20,18,19,19,19,19,19,56,19,19,19,18,20,18,19,19,19,19,19,18,20,18,19,19,19,19,19,18,20,169,19,57,19,56,19,56,20,18,19,57,19,56,19,19,19,56,20,56,19,19,19,18,20,18,19,19,19,19,19,56,19,19,19,18,20,56,19,56,20,56,19,2149",
	"DVD.CURSORRIGHT":"sendir,1:3,1,38000,<repeat>,1,170,170,18,18,18,18,18,18,18,18,18,18,18,56,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,170,18,56,18,56,18,56,18,18,18,18,18,56,18,18,18,56,18,56,18,18,18,18,18,18,18,56,18,18,18,56,18,18,18,18,18,56,18,56,18,56,18,2185",
	"DVD.CURSORUP":"sendir,1:3,1,38000,<repeat>,1,170,170,18,18,18,18,18,18,18,18,18,18,18,56,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,170,18,56,18,56,18,56,18,18,18,18,18,18,18,18,18,56,18,56,18,18,18,18,18,18,18,56,18,56,18,56,18,18,18,18,18,56,18,56,18,56,18,2185",
	"DVD.MENUDISC": "sendir,1:3,1,38000,<repeat>,1,170,170,18,18,18,18,18,18,18,18,18,18,18,56,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,170,18,56,18,56,18,56,18,18,18,56,18,18,18,56,18,56,18,56,18,18,18,18,18,18,18,18,18,56,18,18,18,18,18,18,18,56,18,56,18,56,18,2185",
	"DVD.PAUSE": "sendir,1:3,1,38000,<repeat>,1,170,170,19,19,19,18,20,18,19,19,19,19,19,56,19,19,19,18,20,18,19,19,19,19,19,18,20,18,19,19,19,19,19,18,20,169,19,57,19,56,19,56,20,18,19,19,19,56,20,18,19,19,19,56,20,56,19,19,19,18,20,56,19,19,19,56,19,56,20,18,19,19,19,56,20,56,19,2149",
	/*
	"receiver.powerOff": "sendir,1:1,1,40453,,1,342,171,22,63,22,20,22,63,22,20,22,20,22,63,22,20,22,63,22,20,22,63,22,20,22,63,22,63,22,20,22,63,22,20,22,63,22,63,22,20,22,63,22,63,22,20,22,20,22,20,22,20,22,20,22,63,22,20,22,20,22,63,22,63,22,63,22,1430,342,171,22,63,22,20,22,63,22,20,22,20,22,63,22,20,22,63,22,20,22,63,22,20,22,63,22,63,22,20,22,63,22,20,22,63,22,63,22,20,22,63,22,63,22,20,22,20,22,20,22,20,22,20,22,63,22,20,22,20,22,63,22,63,22,63,22,4045",
    "receiver.powerOn": "sendir,1:1,1,40453,,1,342,171,22,63,22,20,22,63,22,20,22,20,22,63,22,20,22,63,22,20,22,63,22,20,22,63,22,63,22,20,22,63,22,20,22,20,22,63,22,20,22,63,22,63,22,20,22,20,22,20,22,63,22,20,22,63,22,20,22,20,22,63,22,63,22,63,22,1430,342,171,22,63,22,20,22,63,22,20,22,20,22,63,22,20,22,63,22,20,22,63,22,20,22,63,22,63,22,20,22,63,22,20,22,20,22,63,22,20,22,63,22,63,22,20,22,20,22,20,22,63,22,20,22,63,22,20,22,20,22,63,22,63,22,63,22,4045",
    "receiver.volumeDown": "sendir,1:1,1,40453,1,1,189,4,4,317,22,63,22,21CD,20,23,13,72,18,25,12,73,19,24,9,4,4,73,14,28,8,77,10,75,11,32,6,79,13,30,9,76,16,69,20,22,13,72,19,24,12,31,8,35,8,35,9,34,10,33,11,73DCCCC,22,1086,214,294CDCD,13,30,8,77,11,32,4,81,5,123,4,4010",
    "receiver.volumeUp": "sendir,1:1,1,40453,1,1,342,170,22,63,22,21BCCBCBCBCBBCBCCBCBCCCCBCBCBBBB,22,1086ABCBCCBCBCB,21,22,12,73,15,70,12,31,5,80,7,36,4,127,4,2002,10,4010",
    "receiver.dvd": "sendir,1:1,1,40453,1,1,339,169,22,63,22,20,22,63,22,20,22,20,22,63,22,20,22,63,22,20,22,63,22,20,22,63,22,63,22,20,22,63,22,0,20,22,63,22,20,22,63,22,20,22,63,22,63,22,20,22,63,22,20,22,20,22,63,22,20,22,63,22,63,22,20,22,20,22,20,22,63,22,20,22,63,22,20,22,20,22,63,22,63,22,63,22,4006"
*/
};
exports.irCOMMANDS = irCOMMANDS;


//  colors of toogle buttons: 'primary', 'info', 'success', 'warning', 'danger', 'default'
// Possible values onstyle / offstyle are: default,primary,success,info,warning,danger

var colorMap = {
	'darkblue': 'primary', 
	'lightblue': 'info', 
	'green': 'success', 
	'gold': 'warning', 
	'red': 'danger', 
	'gray': 'default'
};

//
// http://getbootstrap.com/components/#alerts 
//
var alertStyles = [
	
	"alert-success",
	"alert-info",
	"alert-warning",
	"alert-danger"
	
];



var pageItems = [

	{
		id: "Home",
		title: "Home",
		isActive: true
	},
	{
		id: "LivingRoom",
		title: "Living Room",
		style: 'grid'
	},
	{
		id: "WatchLivingRoomRoku",
		title: "Watch Living Room Roko",
		style: 'grid'
	},
	
	{
		id: "WatchDVD",
		title: "Watch DVD",
		style: 'grid'
	},
	
	{
		id: "MasterBedroom",
		title: "Master Bedroom"
	},

	{
		id: "Bathroom",
		title: "Bathroom"
	},

	{
		id: "Kitchen",
		title: "Kitchen"
	},
	{
		id: "Garage",
		title: "Garage",
		isActive: false
	},
	{
		id: "Office",
		title: "Office",
		isActive: false
	},	
	{
		id: "pageMISC",  // DO NOT DELETE! at least this page must exisit - default when not sepcified
		title: "MISC",
		isActive: false
	}
]
exports.pageItems = pageItems;	


//
// data model
//
var mySSlist = [

	//	//////////////////////////////////////////////////////////////////////
	//
	//  cron items // https://www.npmjs.com/package/ontime
	//
	// YYYY-MM-DDThh:mm:ss or 
	// cycle: ['10', '30', '50'] // every minute at 20 30 40  secs 
	// cycle: '2-9T00:00:00'  // February 9 every year
	// cycle: [ '1T12:00:00', '15T12:00:00' ] // 1th and 15th days of each month
	// cycle: '12:00:00' // noon every day
	// cycle: [ 'Sunday 12:00:00', 'sat 12:00:00' ] // Saturday and Sunday every week
	// cycle: [ '00:00', '30:00' ] // every 30 minutes (twice an hour)
	// cycle: [ '10', '30', '50' ] // 10th, 30th and 50th seconds of every minute
	
	{
	name: "Scheduled Bedroom Light Toggle", device: "cron", cycle: ['11:15:00'] , cronLink: 'BedroomLightToggle',
	modalAlert: { style:'alert-info' }, iftttAlert:{}
	},
	


	//	//////////////////////////////////////////////////////////////////////
	//  input sensors
	//
	{ 
	style: "sensor-toggle", page:"Garage", device: "gpio", pin : "4", direction: "in", edges: "both", activeLow: false,
	name: "Visitor Detected",  onText : "yes",  offText : "no",
	onColor : 'warning',  offColor : 'success', 
	modalAlert: { whenValueIs:true, style:'alert-warning' }, iftttAlert:{ whenValueIs:true }
	},
	
	{ 
	style: "sensor-toggle", page:"Garage", device: "gpio", pin : "22",	direction: "in", edges: "both", activeLow: false,
	name: "Garage Door",  onText : "open",  offText : "closed" ,
	onColor : 'danger',  offColor : 'success' , /* onSoundFile: "ThanksForPuttingMyCrownOn.mp3",  offSoundFile: "ThanksForTakingMyCrownOff.mp3", */
	modalAlert: { whenValueIs:true, style:'alert-danger' }, iftttAlert:{ whenValueIs:true }
	},  
	
	
	//	//////////////////////////////////////////////////////////////////////
	//
	// 	roku buttons:  iconOnly, iconAndText  TODO use Materail cion reference
	//

	{ 
	style: "button-momentary", page: 'WatchLivingRoomRoku',   device: "http",  hostName: "RokuLivingRoom", hostCommand:  "roku.Home",
	name: "Roku Home", icon:"/images/Home (Roku).png",  iconStyle:"iconOnly", position: { row:2, col:1 }
	},
	{ 
	style: "button-momentary",  page: 'WatchLivingRoomRoku',   device: "http",  hostName: "RokuLivingRoom", hostCommand:  "roku.Back",
	name: "Roku Back", icon:"/images/Back (Roku).png", iconStyle:"iconOnly", position: { row:2, col:3 }
	},	
	{ 
	style: "button-momentary",  page: 'WatchLivingRoomRoku',   device: "http",  hostName: "RokuLivingRoom", hostCommand:  "roku.Right",
	name: "Roku Right", icon:"/images/Nav - Right.png",  iconStyle:"iconOnly", position: { row:3, col:3 }
	},
	{ 
	style: "button-momentary",  page: 'WatchLivingRoomRoku',   device: "http",  hostName: "RokuLivingRoom", hostCommand:  "roku.Left",
	name: "Roku Left", icon:"/images/Nav - Left.png",   iconStyle:"iconOnly", position: { row:3, col:1 }
	},
	{ 
	style: "button-momentary",  page: 'WatchLivingRoomRoku',   device: "http",  hostName: "RokuLivingRoom", hostCommand:  "roku.Up",
	name: "Roku Up", icon:"/images/Nav - Up.png",    iconStyle:"iconOnly", position: { row:2, col:2 }
	},
	{ 
	style: "button-momentary",  page: 'WatchLivingRoomRoku',   device: "http",  hostName: "RokuLivingRoom", hostCommand:  "roku.Down",
	name: "Roku Down", icon:"/images/Nav - Down.png",   iconStyle:"iconOnly", position: { row:4, col:2 }
	},
	{ 
	style: "button-momentary",  page: 'WatchLivingRoomRoku',   device: "http",  hostName: "RokuLivingRoom", hostCommand:  "roku.Select",
	name: "Roku Select", icon:"/images/OK (Roku).png",   iconStyle:"iconOnly", position: { row:3, col:2 }
	},
	{ 
	style: "button-momentary",  page: 'WatchLivingRoomRoku',   device: "http",  hostName: "RokuLivingRoom", hostCommand:  "roku.Play",
	name: "Roku Play", icon:"/images/Transports - Play.png",   iconStyle:"iconOnly", position: { row:5, col:2 }
	},	
	{ 
	style: "button-momentary",  page: 'WatchLivingRoomRoku',   device: "http",  hostName: "RokuLivingRoom", hostCommand:  "roku.Rev",
	name: "Roku Rev", icon:"/images/Transports - Fast Backward.png",    iconStyle:"iconOnly", position: { row:5, col:1 }
	},	
	{ 
	style: "button-momentary",  page: 'WatchLivingRoomRoku',   device: "http",  hostName: "RokuLivingRoom", hostCommand:  "roku.Fwd",
	name: "Roku Fwd", icon:"/images/Transports - Fast Forward.png",    iconStyle:"iconOnly", position: { row:5, col:3 }
	},	
	{ 
	style: "button-momentary",  page: 'WatchLivingRoomRoku',   device: "http",  hostName: "RokuLivingRoom", hostCommand:  "roku.InstantReplay",
	name: "Roku InstantReplay", icon:"/images/Replay (Roku).png",   iconStyle:"iconOnly", position: { row:4, col:1 }
	},
	{ 
	style: "button-momentary",  page: 'WatchLivingRoomRoku',   device: "http",  hostName: "RokuLivingRoom", hostCommand:  "roku.Options",
	name: "Roku Options", icon:"/images/Options (Roku).png",   iconStyle:"iconOnly",  position: { row:4, col:3 }
	},	
	// Volume
	{ 
	style: "button-momentary",  page: 'WatchLivingRoomRoku',   device: "ir",  hostName: "AMPremote", hostCommand:  "amp.VOLUMEDOWN",
	name: "Volume DOWN", icon:"/images/Volume Down.png",   iconStyle:"iconOnly",  position: { row:1, col:3 }
	},
 	{ 
	style: "button-momentary",  page: 'WatchLivingRoomRoku',   device: "ir",  hostName: "AMPremote", hostCommand:  "amp.MUTETOGGLE",
	name: "Volume Mute", icon:"/images/Volume Mute.png",   iconStyle:"iconOnly",  position: { row:1, col:2 }
	}, 
	{ 
	style: "button-momentary",  page: 'WatchLivingRoomRoku',   device: "ir",  hostName: "AMPremote", hostCommand:  "amp.VOLUMEUP",
	name: "Volume UP", icon:"/images/Volume Up.png",   iconStyle:"iconOnly",  position: { row:1, col:1 }
	},
	

	// navigation on th UI side

	{ 
	style: "button-navigation",  page: 'WatchLivingRoomRoku',  target:"LivingRoom",  
	name: "Go to Living Room", icon:"home",   iconStyle:"iconOnly",  position: { row:5, col:5 }
	},
	
	
	{ 
	style: "button-navigation",  page: 'LivingRoom',  target:"Home",  
	name: "Go to Living Room", icon:"home",   iconStyle:"iconOnly",  
	},
	
	{ 
		style: "button-navigation",  page: 'MasterBedroom',  target:"Bathroom",  
		name: "Bathroom", icon:"navigation" 
	},
	{ 
		style: "button-navigation",  page: 'Bathroom',  target:"MasterBedroom",  
		name: "Bedroom", icon:"navigation" 
	},
	{ 
		style: "button-navigation",  page: 'Home',  target:"MasterBedroom",  
		name: "Bedroom", icon:"navigation" 
	},
	
	
	
	// navigation on th server side )part of sequnce execution
	// TODO make this NOT visible at UI - but will execute with sequence serverside - emeit to cleint on execute
	
	{ 
	 name: "Navigate to Living Room", target: "LivingRoom",  sequenceGroups: ["Watch Living Room TV"], device: "client-navigate"  
	},

	{ 
	 name: "Navigate to DVD Controls", target: "WatchDVD",  sequenceGroups: ["Watch Living Room DVD"], device: "client-navigate"  
	},

	{ 
	name: "Navigate to Bedroom", target: "MasterBedroom",  sequenceGroups: ["Go to Bed"], device: "client-navigate"  
	},

	
	//
	// test speaking buttons
	//
	{ 
	style: "button-momentary",  
	name: "Say something", id: 'Saysomething', soundFile: "/audio/upfile_2474029492.mp3"
	},
	
	{ 
	style: "button-momentary",   
	name: "Say something else",  soundFile: "/audio/HeythereIseeyouhavepushedthebutton.mp3"
	},	
	
	{ 
	style: "button-momentary",  
	name: "Speak something else else", soundFile: "Hello there it appears you have pushed the button, good for you"
	},	
	
	
	//
	// radio RF controls (code, p, t)
	//

	// remote POST version
	{
	name: "Outlet Power Post", page:['Office', 'Home'],   
	style: "button-toggle", device: "discete_toggle",  onLink: 'OutletPowerONpost', offLink: 'OutletPowerOFFpost', 
	onText : "ON",  offText : "OFF", onColor : 'success',  offColor : 'default'
	},

	{ 
	style: "button-momentary",  device: "http", hostName: "piconMucciGarage", hostCommand:  "piconMucciGarage.OutLetON",
	name: "Outlet Power ON", referLink: 'OutletPowerONpost'  
	},
	
	{ 
	style: "button-momentary",  device: "http", hostName: "piconMucciGarage", hostCommand:  "piconMucciGarage.OutLetOFF",
	name: "Outlet Power OFF", referLink: 'OutletPowerOFFpost'  
	},

	// native version
	{
	name: "Outlet Power Native", page:['Office', 'Home'],   
	style: "button-toggle", device: "discete_toggle",  onLink: 'OutletPowerON', offLink: 'OutletPowerOFF', 
	onText : "ON",  offText : "OFF", onColor : 'success',  offColor : 'default'
	},

	{ 
	style: "button-momentary",  device: "rf", hostName: "433",  code:"87347",  p:"177" , t:"1",
	name: "Outlet Power ON", referLink: 'OutletPowerON'  
	},
	
	{ 
	style: "button-momentary", device: "rf", hostName: "433",  code:"87356",  p:"177" , t:"1",
	name: "Outlet Power OFF", referLink: 'OutletPowerOFF'  
	},
	 

	{ 
	style: "button-momentary",  page:'Office',  device: "rf", hostName: "433",  code:"8528385",  p:"410" , t:"1",
	name: "Office LED Light", icon:"",  iconStyle:"iconAndText"
	},
	


	// 2017-08-13 15:00:58 - [INFO] rfrx433: 2833921 [pulselength 415, protocol 1]


	// TV Controls MasterBedroom
	{ 
	style: "button-momentary",   page:"MasterBedroom",   device: "ir",  hostName: "TVremote", hostCommand:  "tv2.POWER", repeatCount: 3,
	name: "TV Bedroom Power", sequenceGroups: ["Good Night", "Go to Bed"]
	},
			
	{
	name: "Bed Light", style: "widget-3c", page: "MasterBedroom", device: "widget", referLink: "BedLight-widget-grid-3c"
	},

	/* { 
	style: "button-momentary",  page:'MasterBedroom',  device: "rf", hostName: "433",  code:"5592321",  p:"398" , t:"1",
	name: "Bed Light", icon:"",  iconStyle:"iconAndText", sequenceGroups: ["Good Night"], referLink: "BedroomLightToggle", state: false
	},
	 */
	{
		style: "button-momentary", page: 'MasterBedroom', device: "rf", hostName: "433", code: "5592325", p: "400", t: "1",
		name: "Bed Light UP", widget: { parentReferLink: "BedLight-widget-grid-3c" }, icon: "arrow_upward", iconStyle: "iconOnly"
	},
	{
		style: "button-momentary", page: 'MasterBedroom', device: "rf", hostName: "433", code: "5592321", p: "400", t: "1",
		name: "Bed Light Power", widget: { parentReferLink: "BedLight-widget-grid-3c" }, icon: "power_settings_new", iconStyle: "iconOnly",
		sequenceGroups: ["Good Night"], referLink: "BedroomLightToggle"
	},
	{
		style: "button-momentary", page: 'MasterBedroom', device: "rf", hostName: "433", code: "5592326", p: "400", t: "1",
		name: "Bed Light DOWN", widget: { parentReferLink: "BedLight-widget-grid-3c" }, icon: "arrow_downward", iconStyle: "iconOnly"
	},
	{
		style: "button-momentary", page: 'Bathroom', device: "rf", hostName: "433", code: "5592327", p: "400", t: "1",
		name: "Bed Light 100%", widget: { parentReferLink: "BedLight-widget-grid-3c" }, icon: "brightness_5", iconStyle: "iconOnly",
		sequenceGroups: ["LightsHigh"]
	},
	{
		style: "button-momentary", page: 'Bathroom', device: "rf", hostName: "433", code: "5592328", p: "400", t: "1",
		name: "Bed Light 50%", widget: { parentReferLink: "BedLight-widget-grid-3c" }, icon: "brightness_6", iconStyle: "iconOnly",
		sequenceGroups: ["LightsMedium"]
	},
	{
		style: "button-momentary", page: 'Bathroom', device: "rf", hostName: "433", code: "5592329", p: "400", t: "1",
		name: "Bed Light 25%", widget: { parentReferLink: "BedLight-widget-grid-3c" }, icon: "brightness_7", iconStyle: "iconOnly",
		sequenceGroups: ["LightsLow"]
	},	

	{ 
	sequence: "Good Night", style: "button-momentary",  page:'MasterBedroom',  device: "sequencer",
	name: "Good Night"
	},
	

	{ name: "Roku Source", style: "button-momentary",  page:"MasterBedroom",  device: "ir",  hostName: "TVremote", hostCommand: "tv2.switch1.input1" },
	{ name: "Cast Source", style: "button-momentary",  page:"MasterBedroom",  device: "ir",  hostName: "TVremote", hostCommand: "tv2.switch1.input2" }, 
	{ name: "Source 3", style: "button-momentary",  page:"MasterBedroom",  device: "ir",  hostName: "TVremote", hostCommand: "tv2.switch1.input3" },
	{ name: "Source 4", style: "button-momentary",  page:"MasterBedroom",  device: "ir",  hostName: "TVremote", hostCommand: "tv2.switch1.input4" }, 
	

	
	// ////////////////////////////////////////////////////////////
	//
	// Bathroom 433 mhz RF lighting controls
	//
	// //////////////////////////////////////////////////////////
	{
		name: "Bath Light (His)", style: "widget-3c", page: "Bathroom", device: "widget", referLink: "A-widget-grid-3c"
	},
	// ///////////////
	{
		style: "button-momentary", page: 'Bathroom', device: "rf", hostName: "433", code: "2833925", p: "410", t: "1",
		name: "Light(A) UP", widget: { parentReferLink: "A-widget-grid-3c" }, icon: "arrow_upward", iconStyle: "iconOnly"
	},
	{
		style: "button-momentary", page: 'Bathroom', device: "rf", hostName: "433", code: "2833921", p: "410", t: "1",
		name: "Light(A) Power", widget: { parentReferLink: "A-widget-grid-3c" }, icon: "power_settings_new", iconStyle: "iconOnly"
	},
	{
		style: "button-momentary", page: 'Bathroom', device: "rf", hostName: "433", code: "2833926", p: "410", t: "1",
		name: "Light(A) DOWN", widget: { parentReferLink: "A-widget-grid-3c" }, icon: "arrow_downward", iconStyle: "iconOnly",
		sequenceGroups: ["LightsLowNudge"]
	},
	{
		style: "button-momentary", page: 'Bathroom', device: "rf", hostName: "433", code: "2833927", p: "410", t: "1",
		name: "Light(A) 100%", widget: { parentReferLink: "A-widget-grid-3c" }, icon: "brightness_5", iconStyle: "iconOnly",
		sequenceGroups: ["LightsHigh"]
	},
	{
		style: "button-momentary", page: 'Bathroom', device: "rf", hostName: "433", code: "2833928", p: "410", t: "1",
		name: "Light(A) 50%", widget: { parentReferLink: "A-widget-grid-3c" }, icon: "brightness_6", iconStyle: "iconOnly",
		sequenceGroups: ["LightsMedium"]
	},
	{
		style: "button-momentary", page: 'Bathroom', device: "rf", hostName: "433", code: "2833929", p: "410", t: "1",
		name: "Light(A) 25%", widget: { parentReferLink: "A-widget-grid-3c" }, icon: "brightness_7", iconStyle: "iconOnly",
		sequenceGroups: ["LightsLow"]
		
	},	

	// //////////////////////////////////////////////////////////
	{
		name: "Bath Light (Hers)", style: "widget-3c", page: "Bathroom", device: "widget", referLink: "D-widget-grid-3c"
	},
	// ///////////////
	{
		style: "button-momentary", page: 'Bathroom', device: "rf", hostName: "433", code: "19461", p: "413", t: "1",
		name: "Light(D) UP", widget: { parentReferLink: "D-widget-grid-3c" }, icon: "arrow_upward", iconStyle: "iconOnly"
	},
	{
		style: "button-momentary", page: 'Bathroom', device: "rf", hostName: "433", code: "19457", p: "413", t: "1",
		name: "Light(D) Power", widget: { parentReferLink: "D-widget-grid-3c" }, icon: "power_settings_new", iconStyle: "iconOnly",
		sequenceGroups: ["Go to Bed"]
	},
	{
		style: "button-momentary", page: 'Bathroom', device: "rf", hostName: "433", code: "19462", p: "413", t: "1",
		name: "Light(D) DOWN", widget: { parentReferLink: "D-widget-grid-3c" }, icon: "arrow_downward", iconStyle: "iconOnly",
		sequenceGroups: ["LightsLowNudge"]
	},
	{
		style: "button-momentary", page: 'Bathroom', device: "rf", hostName: "433", code: "19463", p: "413", t: "1",
		name: "Light(D) 100%", widget: { parentReferLink: "D-widget-grid-3c" }, icon: "brightness_5", iconStyle: "iconOnly",
		sequenceGroups: ["LightsHigh"]
	},
	{
		style: "button-momentary", page: 'Bathroom', device: "rf", hostName: "433", code: "19464", p: "413", t: "1",
		name: "Light(D) 50%", widget: { parentReferLink: "D-widget-grid-3c" }, icon: "brightness_6", iconStyle: "iconOnly",
		sequenceGroups: ["LightsMedium"]
	},
	{
		style: "button-momentary", page: 'Bathroom', device: "rf", hostName: "433", code: "19465", p: "413", t: "1",
		name: "Light(D) 25%", widget: { parentReferLink: "D-widget-grid-3c" }, icon: "brightness_7", iconStyle: "iconOnly",
		sequenceGroups: ["LightsLow"]
	},	

	
	// TODO this should be a repeat count on a SEQUENCE
	// TODO add priotity (order) seq items - here we MUST have 25% set BEFORE nudging to get the effect
	{
		/* style: "button-momentary", page: 'Bathroom', */ device: "rf", hostName: "433", code: "2833926", p: "410", t: "1",
		name: "Light(A) DOWN NUDGE", rampCount: 3,
		sequenceGroups: ["LightsLow"]
	},

	{
		/* style: "button-momentary", page: 'Bathroom', */ device: "rf", hostName: "433", code: "16476678", p: "413", t: "1",
		name: "Light(D) DOWN NUDGE", rampCount: 3,
		sequenceGroups: ["LightsLow"]
	},

	//
	//	////////////////////////////////////////////////
	// TODO widget children do not rewolve correctly when widget duplicated on > 1 pages.
	//

	{
		name: "Bath Light Scenes", style: "widget-3c", page: ["Bathroom"], device: "widget", referLink: "BathLightScenes"
	},
	
	{ 
		sequence: "LightsHigh", style: "button-momentary",   page: ['Bathroom'],  device: "sequencer",
		name: "Lights High", widget: { parentReferLink: "BathLightScenes" }, icon: "brightness_5", iconStyle: "iconOnly"
	},	
	{ 
		sequence: "LightsMedium", style: "button-momentary",  page: ['Bathroom'],  device: "sequencer",
		name: "Lights Medium", widget: { parentReferLink: "BathLightScenes" }, icon: "brightness_6", iconStyle: "iconOnly"
	},	
	{ 
		sequence: "LightsLow", style: "button-momentary",   page: ['Bathroom'],  device: "sequencer",
		name: "Lights Low", sequenceGroups: ["Good Night", "Go to Bed"], widget: { parentReferLink: "BathLightScenes" }, icon: "brightness_7", iconStyle: "iconOnly"
	},
/* 
	{ 
		sequence: "LightsLowNudge",  device: "sequencer", name: "Lights Low Nudge", sequenceGroups: ["LightsLow"], rampCount: 3
	},
 */
	//
	// infared (ir) controls
	//
	
	// HOME page
	{
	name: "TV Power",
	style: "button-toggle",  page:"Home",  device: "discete_toggle",  
	onLink: 'TVPowerON', offLink: 'TVPowerOFF', 
	onText : "ON",  offText : "OFF", onColor : 'success',  offColor : 'default'
	},
	
	// Living Room page
	// TV Controls LivingRoom
	
	{ name: "TV Source Cast", style: "button-momentary",  page:"LivingRoom",  device: "ir",  hostName: "TVremote", hostCommand: "switch1.input1", sequenceGroups: ["Watch Living Room TV"], position: { row:2, col:1 } },
	{ name: "TV Source DVD", style: "button-momentary",  page:"LivingRoom",  device: "ir",  hostName: "TVremote", hostCommand: "switch1.input2", sequenceGroups: ["Watch Living Room DVD"], position: { row:2, col:2 }  },
	{ name: "Input Source 3", style: "button-momentary",  page:"LivingRoom",  device: "ir",  hostName: "TVremote", hostCommand: "switch1.input3", position: { row:2, col:3 } },
	{ name: "Input Source 4", style: "button-momentary",  page:"LivingRoom",  device: "ir",  hostName: "TVremote", hostCommand: "switch1.input4", position: { row:2, col:4 }  },
	
	
	{
	name: "TV Power",
	style: "button-toggle",  page:"LivingRoom",  device: "discete_toggle",  
	onLink: 'TVPowerON', offLink: 'TVPowerOFF', 
	onText : "ON",  offText : "OFF", onColor : 'success',  offColor : 'default', position: { row:1, col:1 } 
	},
	
	{ 
	style: "button-momentary",   page:"LivingRoom",   device: "ir",  hostName: "TVremote", hostCommand:  "tv.POWEROFF",
	name: "TV Power OFF",  referLink:'TVPowerOFF',  /* soundFile: " TV Power Off ", */ sequenceGroups: ["System OFF", "Go to Bed"], position: { row:1, col:3 } 
	},
	
	{ 
	style: "button-momentary",  page:"LivingRoom",    device: "ir",  hostName: "TVremote", hostCommand:  "tv.POWERON",
	name: "TV Power ON", referLink:'TVPowerON', /* soundFile: " TV Power On ", */ sequenceGroups: ["Watch Living Room TV", "Watch Living Room DVD"], position:{ row:1, col:2 }
	},
	
	
	//
	//
	//
	
		
	// ////////////////////////////////
	//
	//

	{ name: "DVD Power", style: "button-momentary",  page:"WatchDVD",  device: "ir",  hostName: "TVremote", hostCommand: "DVD.POWER", sequenceGroups: ["Watch Living Room DVD"],
	/* widget: { parentReferLink: "DVDControl", classId:"widget-DVDControl-xxxxx-target" }, */ icon:"power_settings_new"
	},
	{ name: "Tray", style: "button-momentary",  page:"WatchDVD",  device: "ir",  hostName: "TVremote", hostCommand: "DVD.TRAY",
	/* widget: { parentReferLink: "DVDControl", classId:"widget-DVDControl-xxxxx-target" }, */ icon:"open_in_browser"
	},
	
			// TODO Do widget items need a page property?
	// ////////////////////////////////
	//
	//

	{ 
	name: "DVD Transports", style: "widget-mediaTransports",  page:"WatchDVD",  device: "widget", referLink:"DVDTransports"
	},

	{ name: "Play", style: "button-momentary",  page:"WatchDVD",  device: "ir",  hostName: "TVremote", hostCommand: "DVD.PLAY",
	widget: { parentReferLink: "DVDTransports", classId:"widgetTarget-play" }, icon:"play_circle_outline",   iconStyle:"iconOnly"
	},
	{ name: "Stop", style: "button-momentary",  page:"WatchDVD",  device: "ir",  hostName: "TVremote", hostCommand: "DVD.STOP",
	widget: { parentReferLink: "DVDTransports", classId:"widgetTarget-stop" }, icon:"stop",   iconStyle:"iconOnly"
	},
	{ name: "Pause", style: "button-momentary",  page:"WatchDVD",  device: "ir",  hostName: "TVremote", hostCommand: "DVD.PAUSE",
	widget: { parentReferLink: "DVDTransports", classId:"widgetTarget-pause" }, icon:"pause_circle_outline",   iconStyle:"iconOnly"
	},
	{ name: "Forward", style: "button-momentary",  page:"WatchDVD",  device: "ir",  hostName: "TVremote", hostCommand: "DVD.FORWARD",
	widget: { parentReferLink: "DVDTransports", classId:"widgetTarget-forward" }, icon:"fast_forward",   iconStyle:"iconOnly"
	},
	{ name: "Reverse", style: "button-momentary",  page:"WatchDVD",  device: "ir",  hostName: "TVremote", hostCommand: "DVD.REVERSE",
	widget: { parentReferLink: "DVDTransports", classId:"widgetTarget-reverse" }, icon:"fast_rewind",   iconStyle:"iconOnly"
	},
	
	
 
	// ////////////////////////////////
	//
	//

	{ 
	name: "DVD Navigation", style: "widget-cursorNavigation",  page:"WatchDVD",  device: "widget", referLink:"DVDNavigation"
	},
	
	{ name: "UP", style: "button-momentary",  page:"WatchDVD",  device: "ir",  hostName: "TVremote", hostCommand: "DVD.CURSORUP",
	widget: { parentReferLink: "DVDNavigation", classId:"widgetTarget-cursorup" }, icon:"arrow_upward",  iconStyle:"iconOnly"
	},
	{ name: "DOWN", style: "button-momentary",  page:"WatchDVD",  device: "ir",  hostName: "TVremote", hostCommand: "DVD.CURSORDOWN",
	widget: { parentReferLink: "DVDNavigation", classId:"widgetTarget-cursordown" }, icon:"arrow_downward" ,  iconStyle:"iconOnly"
	},
	{ name: "LEFT", style: "button-momentary",  page:"WatchDVD",  device: "ir",  hostName: "TVremote", hostCommand: "DVD.CURSORLEFT",
	widget: { parentReferLink: "DVDNavigation", classId:"widgetTarget-cursorLeft" }, icon:"arrow_back",  iconStyle:"iconOnly"
	},
	{ name: "RIGHT", style: "button-momentary",  page:"WatchDVD",  device: "ir",  hostName: "TVremote", hostCommand: "DVD.CURSORRIGHT",
	widget: { parentReferLink: "DVDNavigation", classId:"widgetTarget-cursorRight" }, icon:"arrow_forward",  iconStyle:"iconOnly"
	},
	{ name: "ENTER", style: "button-momentary",  page:"WatchDVD",  device: "ir",  hostName: "TVremote", hostCommand: "DVD.CURSORENTER",
	widget: { parentReferLink: "DVDNavigation", classId:"widgetTarget-done" }, icon:"radio_button_checked",  iconStyle:"iconOnly"
	},
	{ name: "MENU", style: "button-momentary",  page:"WatchDVD",  device: "ir",  hostName: "TVremote", hostCommand: "DVD.MENUDISC",
	widget: { parentReferLink: "DVDNavigation", classId:"widgetTarget-menu" }, icon:"menu",  iconStyle:"iconOnly"
	},

 
 	// ////////////////////////////////
 
	
	// ////////////////////////////////
	//
	//


	{ 
	name: "Sound Bar (TV) Volume", style: "widget-upDown",  page:"LivingRoom",  device: "widget", referLink:"SBVol"
	},
	
	{ 
	name: "UP", style: "button-momentary",  page:"LivingRoom",  device: "ir",  hostName: "TVremote", hostCommand: "sb2.VOLUMEUP",
	widget: { parentReferLink: "SBVol", classId:"widgetTarget-UP" }, icon:"volume_up"
	}, 
	
	{ 
	name: "DOWN", style: "button-momentary",  page:"LivingRoom",  device: "ir",  hostName: "TVremote", hostCommand: "sb2.VOLUMEDOWN",
	widget: { parentReferLink: "SBVol", classId:"widgetTarget-DOWN" }, icon:"volume_down"
	},
	
	// ////////////////////////////////
	
	{ name: "SB Vol WAY DOWN", style: "button-momentary",  page:"LivingRoom",  device: "ir",  hostName: "TVremote", hostCommand: "sb2.VOLUMEDOWN", repeatCount: 1, rampCount: 35 },
	{ name: "SB Vol WAY UP", style: "button-momentary",  page:"LivingRoom",  device: "ir",  hostName: "TVremote", hostCommand: "sb2.VOLUMEUP", repeatCount: 1, rampCount: 35 },
	
	{ name: "SB INPUT TV", style: "button-momentary",  page:"LivingRoom",  device: "ir",  hostName: "TVremote", hostCommand: "sb2.INPUTOPTICAL", sequenceGroups: ["Watch Living Room TV", "Watch Living Room DVD"]},
	


	
	//
	// sequences
	//
	{ 
	name: "Watch Living Room TV", device: "sequencer", sequence: "Watch Living Room TV", style: "button-momentary",  page:'Home',  
	},

	{ 
	name: "Go to Bed", device: "sequencer", sequence: "Go to Bed", style: "button-momentary",  page:'Home',  
	},
	
	{ 
	name: "Watch Living Room DVD", device: "sequencer", sequence: "Watch Living Room DVD", style: "button-momentary",  page:'Home',  
	},
	
	

	/* these discreets do not work
	{ 
	style: "button-momentary",   page:"MasterBedroom",   device: "ir",  hostName: "TVremote", hostCommand:  "tv2.POWEROFF",
	name: "TV Power OFF",  referLink:'TVPowerOFF2',  sequenceGroups: ["System OFF"]
	},
	{ 
	style: "button-momentary",  page:"MasterBedroom",    device: "ir",  hostName: "TVremote", hostCommand:  "tv2.POWERON",
	name: "TV Power ON", referLink:'TVPowerON2', sequenceGroups: ["System ON"]
	},
	{
	name: "TV Power Toggle",   
	style: "button-toggle",  page:"MasterBedroom",  device: "discete_toggle",  
	onLink: 'TVPowerON2', offLink: 'TVPowerOFF2', 
	onText : "ON",  offText : "OFF", onColor : 'success',  offColor : 'default'
	},
	*/
	

	
	] // end mySSlist


exports.mySSlist = mySSlist;









