// server.js

var myVersion = "1.0";
//
// call the packages we need
//
var _ = require('underscore');
var ip = require('ip');
var os = require('os')
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
// var socket;
var Gpio = require('onoff').Gpio;
var say = require('say');
var async = require('async');
var sprintf = require("sprintf-js").sprintf;
var omx = require('omxdirector');

var iTach = require('./my-simple-itach');  // my home grown version
/* 
var rpi433    = require('rpi-433'),
rfSniffer = rpi433.sniffer({
  pin: 2,                     //Snif on GPIO 2 (or Physical PIN 13) 
  debounceDelay: 500          //Wait 500ms before reading another code 
}),
rfEmitter = rpi433.emitter({
  pin: 17,                     //Send through GPIO 0 (or Physical PIN 11) 
  pulseLength: 350            //Send the code with a 350 pulse length 
});
 */


// var smartcast = require('vizio-smart-cast');
var exec = require('child_process').exec;
var needle = require('needle');
var path = require('path');  // The path module exposes a join method that allows us to chain together variables to create a file path.
var nodeCleanup = require('node-cleanup');

// var cron = require('node-cron'); // much heavier than 'ontime' 
var ontime = require('ontime')  // https://www.npmjs.com/package/ontime
var sunCalc = require('suncalc');

// Oasis Lat,Lon: 28.191061,-82.459028

var toDay = new Date();
var sun = sunCalc.getTimes(/*Date*/ toDay, /*Number*/ 28.191061, /*Number*/ -82.459028);
console.log(sun);
 
 

app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.urlencoded(
	{
		extended: true
	}
));

app.use(bodyParser.json());
//
//
/* console.log("process.env.PICON_CONFIGDATA_FILEPATH: " + process.env.PICON_CONFIGDATA_FILEPATH);
process.env.PICON_CONFIGDATA_FILEPATH = "./configData_MucciHome";
// var configData = require('./configData.js
var configData = require(process.env.PICON_CONFIGDATA_FILEPATH);
 */

console.log("Loading configuration file: " + "./configurations/" + os.hostname());
var configData = require("./configurations/" + os.hostname());

var pageItems = configData.pageItems;
var clientsCurrentPage = [];

var irDevices = configData.irDevices;
var irCOMMANDS = configData.irCOMMANDS;

var httpDevices = configData.httpDevices;
var httpCOMMANDS = configData.httpCOMMANDS;

// var categoryStyles = configData.categoryStyles;

var mySSlist = configData.mySSlist;
var soundPlayStack = [];
var soundCheckInterval = 0;
var activityLED = new Gpio(12, 'out'); // todo - get rid of this (now in data)




//
// utitliy functions
//
function hasProp(item, propName, ifHas, ifNotHas)
{
    if (item.hasOwnProperty(propName))
    {
        return ifHas;
    }
    else
    {
        return ifNotHas;
    }
}

function playSound(item)
{
    soundToPlay = null;
    if (item.hasOwnProperty('soundFile'))
    {
        soundToPlay = item.soundFile;
    }
    else if (item.hasOwnProperty('onSoundFile') && item.state == true)
    {
        soundToPlay = item.onSoundFile;
    }
    else if (item.hasOwnProperty('offSoundFile') && item.state == false)
    {
        soundToPlay = item.offSoundFile;
    }
    // console.log ('sound to play: ' + soundToPlay + ' state:' + item.state);
    if (soundToPlay) // have something
    {
        if (soundToPlay.includes('.mp3'))
        {
            soundPlayStack.push('/home/pi/myapp/public/' + soundToPlay);
            console.log("pushed on play stack soundFile: " + soundToPlay + " stack size: " + soundPlayStack.length);
            //
            //  poll if palyer is playing, when it stops playing pop the next item and play it
            //
            if (soundCheckInterval == 0)
            {
                soundCheckInterval = setInterval(function()
                {
                    state = omx.isPlaying();
                    // console.log("player is playing: " + state);
                    if (!state)
                    { // done playing - are there more?
                        if (soundPlayStack.length > 0)
                        {
                            omx.play(soundPlayStack.pop(),
                            {
                                audioOutput: 'local'
                            });
                            console.log("popped play stack soundFile: " + soundToPlay + " stack size: " + soundPlayStack.length);
                        }
                        else
                        {
                            clearInterval(soundCheckInterval);
                            soundCheckInterval = 0;
                        }
                    }
                }, 500, soundCheckInterval, soundPlayStack);
            }
        }
        else
        {
            console.log("saying soundFile: " + soundToPlay);
            say.speak(soundToPlay);
        }
    } /// end have sound file
}

function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sendRFCommand(code, p, t)
{
    // console.log("rpi-rf_send -p " + p + " -t " + t + " " + code);
    exec("~/picon/bin/rpi-rf_send -p " + p + " -t " + t + " " + code, function(error, stdout, stderr)
    {
        //console.log('stdout: ' + stdout);
        //console.log('stderr: ' + stderr);
        if (error !== null)
        {
            console.log('exec error: ' + error);
        }
    });
}


function xxxsendRFCommand(code, p, t)
{
	rfEmitter.sendCode(code, {pulseLength: p});
}


// find items by ID
function myFindId(list, id)
{
    return _.find(list, function(obj)
    {
        return obj.id == id
    });
}

// find items by name
function myFindName(list, name)
{
    return _.find(list, function(obj)
    {
        return obj.name == name
    });
}

// presporcess page layouts
pageItems.forEach(function(page, index)
{
	console.log(sprintf("----- preprocessing page: %s ", page.title));
	
    items = findPageItems(mySSlist, page.id);
	if(items.length > 0)
	{
		count = Math.max.apply(Math,items.map(function(o)
		{
			if(o.position) { return o.position.row;  }
			return 0;
		}))
		page.rows = count;
		
		count = Math.max.apply(Math,items.map(function(o)
		{
			if(o.position) { return o.position.col;  }
			return 0;
		}))
		page.columns = count;

		console.log(sprintf("page: %s maxRow: %s maxCol: %s", page.title, page.rows, page.columns ));
	}
});

//
//
//

function setActivePage(id)
{
	setTrueIndex = findIndexOfPageID(id);
	pageItems.forEach(function(item, index)
	{
		item.isActive = false;
		if(index == setTrueIndex)
		{
			item.isActive = true;
		}
	});
}

function findIndexOfPageID(id){
	return _.findIndex(pageItems, function(item) {
		console.log("findIndexOfPageID: " + item.title + "  " + item.id);
		return item.id == id;
	});
};

//
// find page groups
//
function findPageItems(list, pageid)
{
    var newList = _.filter(list, function(item)
    {
        // console.log(sprintf('Looking at item [%s[] with page [%s] for %s', item.name, item.page, pageid));
		
        // console.log('contains it?: ' + _.contains(item.sequenceGroups, sequenceName));
        // return _.contains(item.sequenceGroups, sequenceName);  // to do - when making items allowed in more that on category
		
		return (item.page == pageid); 
    });
    return newList;
}


// presporcess category layouts
/* 
categoryStyles.forEach(function(category, index)
{
	console.log(sprintf("----- preprocessing category: %s ", category.name));
	
    items = findCategoryGroupItems(mySSlist, category.name);
	
	count = Math.max.apply(Math,items.map(function(o){return o.position.row;}))
	category.rows = count;
	count = Math.max.apply(Math,items.map(function(o){return o.position.col;}))
	category.columns = count;

	console.log(sprintf("category: %s maxRow: %s maxCol: %s", category.name, category.rows, category.columns ));
});
 */
//
// find category groups
//
/* 
function findCategoryGroupItems(list, categoryName)
{
    var newList = _.filter(list, function(item)
    {
        console.log(sprintf('Looking at item [%s[] with category [%s] for %s', item.name, item.category, categoryName));
		
        // console.log('contains it?: ' + _.contains(item.sequenceGroups, sequenceName));
        // return _.contains(item.sequenceGroups, sequenceName);  // to do - when making items allowed in more that on category
		
		return (item.category == categoryName); 
    });
    return newList;
}
 */

// find items in a sequenceGroups
function findSequenceGroupItems(list, sequenceName)
{
    var newList = _.filter(list, function(item)
    {
        // console.log(sprintf('Looking at item [%s[] with group [%s] for %s', item.name, item.sequenceGroups, sequenceName));
        // console.log('contains it?: ' + _.contains(item.sequenceGroups, sequenceName));
        return _.contains(item.sequenceGroups, sequenceName);
    });
    return newList;
}
// find referLink (ed) items
function myFindLink(list, referLink)
{
    return _.find(list, function(obj)
    {
        return obj.referLink == referLink
    });
}

function activityLEDBlink(duration, pace)
{
    // start blinking in 'delay' cycle period	
    var iv = setInterval(function()
    {
        activityLED.writeSync(activityLED.readSync() === 0 ? 1 : 0)
    }, pace / 2);
    // Stop blinking after 'duration'
    setTimeout(function()
    {
        clearInterval(iv); // Stop blinking
        activityLED.writeSync(0); // Turn LED off.
    }, duration);
};

//
// loop trhough each  irDevices  and do needed inits 
// 
irDevices.forEach(function(item, index)
{
    activityLEDBlink(200, 50);
/* 	
    item.host = new iTach(
    {
        host: item.hostAddress
    });
	 */
	item.host = new iTach(item.hostAddress);
	
});


//
// loop through each CONTROL item create controls needs for multi-page items
// 
var newItems = [];

mySSlist.forEach(function(item, index)
{
	var newItem;

	var pages = [];
	if(Array.isArray(item.page))
	{
		pages = item.page;
		pages.forEach(function(page, index)
		{
			if(index == 0)
			{
				item.page = page;  // make it a one page item
				console.log("item: " + item.name + " has page(s): " + page + "  index: " + index);

			}
			else // we need to add new items
			{
				newItem = JSON.parse(JSON.stringify(item));
				newItem.page = page;  // make it a one page item
				console.log("added item: " + newItem.name + " has page(s): " + newItem.page + "  index: " + index + "    " + newItem.device);
				newItems.push(newItem);
			}
			
		});
	}
});

console.log ("--------newItems: " + newItems.length + "  mySSlist: " , mySSlist.length);

newItems.forEach(function(item, index)
{
		console.log("New Item Processing: " + item.name + "  page: " + item.page);
});

mySSlist.push.apply(mySSlist, newItems);
console.log ("--------newItems: " + newItems.length + "  mySSlist: " , mySSlist.length);
//
// loop through each CONTROL item list and do needed inits 
// 
mySSlist.forEach(function(item, index)
{
    activityLEDBlink(200, 50);
	
	//
	// Do general configdata fixup (fillin the blanks)
	//
	console.log("Processing: " + index + "   "  + item.name + "  page: " + item.page);
	
	if (item.id == undefined)
	{
		if (item.page == undefined) item.page = "pageMISC";  // todo should create this too if needed (in config)
		id = item.page + item.name + generateUID();
		id = id.replace(/^[^a-z]+|[^\w:.-]+/gi, "");
		testItem = myFindId(mySSlist, id);
		if (testItem !== undefined)
		{
			console.log(sprintf("WARNING!!! the item [%s] resolves to id [%s] that already exists for item [%s].  Fix duplication in configuration data.", item.name, id, testItem.name));
		}
		else
		{
			// console.log(' created ite.id: ' + id + ' is it unique: ' + testItem);
			item.id = id;
		}
	}
	
	item['classId'] = "piCon-" + (item.name).replace(/^[^a-z]+|[^\w:.-]+/gi, "");

	if(item.widget !== undefined)
	{
		
		parentItem = myFindLink(mySSlist, item.widget.parentReferLink);
		
		item.widget['parentItemId'] = parentItem.id;  // transfer parent id to child
		console.log(item.widget);
	}
	
		
	if (item.device == 'cron')
    {
        initCRONdevice(item);
    }
	
    if (item.device == 'gpio')
    {
        initGPIOdevice(item);
    }
    if (item.device == 'ir')
    {
        initIRdevice(item);
    }
	if (item.device == 'http')
    {
        inithttpDevice(item);
    }
		
    else
    {
        // console.log ("did not init item, device: ", item.device);
    }
});


//
//  init initCRONdevice item
//
function initCRONdevice(item)
{
	console.log("cron enabling: " + item.name );
	executeItem = myFindLink(mySSlist, item.cronLink);
	item['executeItem'] = executeItem;
	console.log("found cron item to exectuote: " + executeItem.name);
	item.state = item.executeItem.state;

	ontime({ cycle:  item.cycle  }, function (ot) {
		// executeItem = myFindLink(mySSlist, item.cronLink);
		io.sockets.emit('toastAlert',   item.name );
		if(item.modalAlert != undefined)
		{
		io.sockets.emit('modalAlert',
			{
				item: item,
				occuredDateTime: Date()
			});			
		}
		
		if(item.iftttAlert != undefined)
		{
			sendIFTTTalert(item);
		}
		
		executeCommand(item.executeItem, null);
		// console.log("cron executing: " + item.executeItem.name )
		ot.done();

	})
};


//
//  init initGPIOdevice item
//
function initGPIOdevice(item)
{
    item.gpioObj = new Gpio(item.pin, item.direction, item.edges);
    if(item.direction == 'out')
        {
            if(item.state == undefined) {item.state = false; }
            item.gpioObj.writeSync(+item.state); 
        }
    
    if(item.direction == 'in')
        {
            item.state = !!+item.gpioObj.readSync();  //  !!+"1" == true, !!+"0" == false
            if (item.activeLow)
            {
                item.state = !item.state;
            }
        }
    
	console.log("item.pin %s  item.direction %s item.edges %s item.state %s", item.pin, item.direction, item.edges, item.state);
	//
	// setup Gpio watch INPUTs for change - emit message to client on change
	//
	if (item.direction == 'in')
	{
		// console.log(' Now Watching   pin: ' + item.pin + ' name: ' + item.name + ' id: ' + item.id);
		if (item.gpioObj)
		{
			item.gpioObj.unwatchAll();
		} // clear out previous interupt requests
		item.gpioObj.watch(function(err, state)
		{
			if (err)
			{
				console.log('item.gpioObj.watch error: ' + err);
			}
			// state = 1 - state; // invert TODO data drive this
			item.state = !!+state;
			if (item.activeLow)
			{
				item.state = !item.state;
			}
			console.log('change on: ' + item.id + ': ' + item.state);
			activityLEDBlink(300, 100);
            // broadcast
            
            if(item.relayHostAddress != undefined){ // we are not in charge - just do post to host
               console.log("making host get: %s", item.relayHostAddress + item.relayHostCommand + item.state );
                needle.get(item.relayHostAddress + item.relayHostCommand + item.state, '',  function(err, resp)  {
                    console.log(sprintf("httpget resp: %s err %s", resp, err));
                    });
            }

            else
                {
                    io.sockets.emit('sensorStateChange',  
                    {
                        id: item.id,
                        classId: item.classId,
                        state: item.state,
                    });
                    //
                    // test for alert condition --- todo archive these alerts
                    //
                    if (item.modalAlert != undefined && item.state == item.modalAlert.whenValueIs) // todo make this work for analog and other comparison operetos ( <=, >=, etc)
                    {
                        // console.log("test for alert condition" + item.modalAlert.whenValueIs + "    " + item.state);
                        // broadcast
                        io.sockets.emit('modalAlert',
                        {
                            item: item,
                            occuredDateTime: Date()
                        });
                    }
                    //
                    //
                    //
                    if (item.iftttAlert != undefined && item.state == item.iftttAlert.whenValueIs) // todo make this work for analog and other comparison operetos ( <=, >=, etc)
                    {
                        sendIFTTTalert(item);
                    }

                }

			
			
		});
	}	
};

//
//  init initIRdevice item
//
function initIRdevice(item)
{
	item.host = myFindId(irDevices, item.hostName).host;
	if(item.repeatCount == undefined)
	{
		item.repeatCount = 1; // default
	}
	if(item.rampCount == undefined)
	{
		item.rampCount = 1; // default
	}
	if(item.defaultDelayAfter == undefined)
	{
		item.defaultDelayAfter = 150; // default 150 ms
	}	
	
};

//
//  init inithttpDevice item
//hostVerb
function inithttpDevice(item)
{
    device = myFindId(httpDevices, item.hostName);
    item.hostAddress = device.hostAddress;
    item.hostVerb = device.hostVerb;
};

//
//
//
function generateUID() {
    // I generate the UID from two parts here 
    // to ensure the random number provide enough bits.
    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
}


//
//
//
function executeCommand(item, socket)
{
	
	if (item.device == 'client-navigate')
    {
        console.log("processing client-navigate: " + item.name + " " + socket);
		if(typeof(socket) != 'undefined') socket.emit('clientNavigate',
		{
			target: item.target
		});
    }

    else if (item.device == 'sequencer')
    {
        console.log("processing sequence: " + item.sequence);
        findSequenceGroupItems(mySSlist, item.sequence).forEach(function(subItem, index)
        {
            subItem.state = item.state;
            subItem.command = item.command; // transferr sequence request to each subitme  todo - what is this???
            console.log("found item in sequence executing: " + subItem.name + " index: " + index);
			io.sockets.emit('toastAlert',   subItem.name );
			/* {
				id: item.id,
				state: item.state,
			});		 */

            executeCommand(subItem, socket);
        });
    }
	

    else if (item.device == 'discete_toggle')
    {
        subItem = function()
        {
            console.log("processing discete_toggle choices: " + item.onLink + "   " + item.offLink + "  state:  " + item.state);
            if (item.state)
            {
                return myFindLink(mySSlist, item.onLink)
            }
            else
            {
                return myFindLink(mySSlist, item.offLink)
            }
        }();
        console.log("processing discete_toggle- executing: " + subItem.name + "  state:  " + item.state);
        executeCommand(subItem, socket);
		
		io.sockets.emit('discete_toggleStateChange',  
			{
				id: item.id,
				classId: item.classId,
				state: item.state,
			});		

    }
    else if (item.device == 'gpio') // todo are these the best tests??? fix  && item.style == 'button-toggle'
    {
        // if(item.state == undefined) { item.state = false; }
        item.state = !!+item.gpioObj.readSync();  //  !!+"1" == true, !!+"0" == false
        item.state = !item.state;
        console.log('setting gpio item: ' + item.name + "  " + ' state: ' + item.state);
        // item.state = 1 - item.state;  // todo maybe we should just read gpio state
        item.gpioObj.writeSync(+item.state); // todo check for null // implicit cast +true; // 1 +false; // 0
    }
    else if (item.device == 'rf') 
    {
        sendRFCommand(item.code, item.p, item.t);
    }
	
	else if (item.device == 'http') 
    {
        command = item.hostAddress + httpCOMMANDS[item.hostCommand];
			
        console.log(sprintf("http %s", command));

        if(item.hostVerb == 'post')
            {
                needle.post(item.hostAddress + httpCOMMANDS[item.hostCommand], '',  function(err, resp)  {
                    console.log(sprintf("httppost resp: %s err %s", resp, err));
                  });
            }

        if(item.hostVerb == 'get')
            {
                needle.get(item.hostAddress + httpCOMMANDS[item.hostCommand], '',  function(err, resp)  {
                    console.log(sprintf("httpget resp: %s err %s", resp, err));
                    });
            }
      
    }
	
    else if (item.device == 'ir') 
    {
		command = irCOMMANDS[item.hostCommand].replace("<repeat>", item.repeatCount);
		command += '\r';  //  need this for npm simple-itach
		// console.log("sending command: "  + "rampCount = " + item.rampCount);
		item.host.send(command, function callback(err) { if (err) console.log(err); });	
		
		if(item.rampCount > 1)
		{
			for (i = 0; i < item.rampCount; i++) {
			item.host.send(command, function callback(err) { if (err) console.log(err); });	
			}
		}	
	}

    else
    {
        console.log("did not process executeCommand item, unknown device: ", item.device);
    }
    //
    // plays any sound assoiciated with this item
    //
    playSound(item);
};


function collectPageItems(socket)
{
	//
	// if client is resrefreshing - set it to the last page navigation before refresh.
	//
	if(clientsCurrentPage[socket.handshake.address] !== undefined)
	{
		setActivePage(clientsCurrentPage[socket.handshake.address]);
	}
	
	return pageItems; // from configData
}

function sendIFTTTalert(item)
{
	stateText = (item.state ? item.onText : item.offText);
	hostAddress = myFindId(httpDevices, "IFTTT").hostAddress + httpCOMMANDS["IFTTT.piConEvent"];
	console.log("hostAddress: " + hostAddress  );
	needle.post(hostAddress, { "value1" : item.name, "value2" : stateText, "value3" : "TBD" } ,  function(err, resp)  {
	console.log(sprintf("httppost resp: %s err %s", resp, err));
	});
};

//  ///////////////////////////////////////////////////////
//  
//  Whenever client connects to our socket ...
//
var socketbeat = 0;
var socketbeatInterval;

io.on('connection', function(socket)
{
	
    console.log('A user connected ... socket.id: ' + socket.id + "  "  + socket.handshake.address);
	
	if(socketbeatInterval) { clearInterval(socketbeatInterval); }
	socketbeatInterval = setInterval(function()
	{
		socketbeat++
		io.sockets.emit('ping', 
		{
			 beat : socketbeat
		});
		// console.log("sending sock heartbeat: " + socketbeat);
	}, 5000);
			
    //
    //  emit our server time so client can sync clocks
    //	
	socket.emit('currentServerTime',
    {
        currentServerTime: Date()
    });
	
	//
    // emit to client our Page item list
    //	
	socket.emit('pagesInit',
    {
		pageItems : collectPageItems(socket)
       
    });
	
    //
    // emit to client our control item list - each our contol items
    //
    mySSlist.forEach(function(item, index)
    {
		//
		// decide which NOT to emit init to client
		//
        if (item.enabled == false) return; // config says don't use this
		if (item.device == "client-navigate") return;  // these stay server side only
		if (item.device == "cron") return;  // these stay server side only
	
        socket.emit('itemInit',
        {
            id: item.id, 
			classId: item.classId,
            style: item.style,
			device: item.device,
            state: item.state,
            name: item.name,
            page: item.page,
			// category: item.category,
            // categoryID: item.categoryID,
            onText: hasProp(item, 'onText', item.onText, item.name),
            offText: hasProp(item, 'offText', item.offText, item.name),
            onColor: hasProp(item, 'onColor', item.onColor, 'success'),
            offColor: hasProp(item, 'offColor', item.offColor, 'success'),
			icon: item.icon,
			iconStyle: item.iconStyle,
			// categoryStyle:  myFindName(categoryStyles, item.category),
			position: item.position,
			target: item.target, // for navigation controls
			widget: (item.widget == undefined) ? null : item.widget
        });
    });
	
    //  /////////////////////////////////////////////////////////////
    //  
    //  Handle messages FROM client
	//
    //  on disconnects 
	//
    socket.on('disconnect', function()
    {
        //console.log('A user disconnected');
    });
	
	//
    // on heartbeat from client
	//
    socket.on('pong', function(data)
    {
        console.log('client ponged the hearbeat: ' + data.beat );
    });
	
	
	//
    // on clientNavigatedToPage from client
	//
    socket.on('clientNavigatedToPage', function(data)
    {
        console.log('client: ' + socket.handshake.address + "   NavigatedToPage: " + data.currentPageItem.id + "  " + data.currentPageItem.title + "   " + data.currentPageItem.isActive);
		clientsCurrentPage[socket.handshake.address] = data.currentPageItem.id;
		console.log('clients: ' + clientsCurrentPage.length);
		console.log('clientsCurrentPage[socket.handshake.address]: ' + clientsCurrentPage[socket.handshake.address]);
	
	});
	
    //
    // on userClick  message sent from client
    //
    socket.on('userClick', function(data)
    {
        console.log('user Clicked: ' + data.id);
        activityLEDBlink(300, 100);
        item = myFindId(mySSlist, data.id);
        item.state = data.state;
        executeCommand(item, socket);
    }); // end socket.on('userClick')
    
}); // end io.on('connection')


//
//  This runs when this node server exits
//
nodeCleanup(function (exitCode, signal) {
    // release resources here before node exits
	
	console.log('////////////////////////  Goodbye!');
});

//
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router


router.get('/start', function(req, res)
{
    res.redirect('/?sa=' + ip.address() + '&sp=' + port);
});

router.get('/public/favicon.ico', function(req, res) {
console.log("router asked for '/public/favicon.ico'")
  var filename = 'favicon.ico';
  res.sendFile(filename, { root: __dirname + '/public' }, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', filename);
    }
  });
});


router.get('/api/GarageDoorSensor/ON', function(req, res)
{
    res.send('<h2>GarageDoorSensor/ON</h2>');
    activityLEDBlink(300, 100);
    // item = myFindName(mySSlist, "Garage Relay 1");
	// executeCommand(item);
});

router.get('/api/GarageDoorSensor/OFF', function(req, res)
{
    console.log('GarageDoorSensor/OFF');
    activityLEDBlink(300, 100);
    // item = myFindName(mySSlist, "Garage Relay 1");
	// executeCommand(item);
});

router.get('/api/Relay1/ON', function(req, res)
{
    res.send('<h2>Relay1/ON</h2>');
    activityLEDBlink(300, 100);
    item = myFindName(mySSlist, "Garage Relay 1");
	executeCommand(item);
});

router.get('/api/Relay2/ON', function(req, res)
{
    res.send('<h2>Relay2/ON</h2>');
    activityLEDBlink(300, 100);
    item = myFindName(mySSlist, "Garage Relay 2");
	executeCommand(item);
});

router.get('/api/Outlet/ON', function(req, res)
{
    res.send('<h2>Outlet is ON</h2>');
    activityLEDBlink(300, 100);
    sendRFCommand("87347", "177", "1");
});
router.get('/api/Outlet/OFF', function(req, res)
{
    res.send('<h2>Outlet is OFF</h2>');
    activityLEDBlink(300, 100);
    sendRFCommand("87356", "177", "1");
});

router.get('/api/BedLight/TOGGLE', function(req, res)
{
    res.send('<h2>BedLight is TOGGLED</h2>');
    activityLEDBlink(300, 100);
    sendRFCommand("5592321", "398", "1");
});
router.get('/api/OfficeLight/TOGGLE', function(req, res)
{
    res.send('<h2>BedLight is TOGGLED</h2>');
    activityLEDBlink(300, 100);
    sendRFCommand("2833921", "416", "1");
});


router.get('/api/LIVINGROOM/TV/POWERON', function(req, res)
{
	item = myFindName(mySSlist, "TV Power ON");
	executeCommand(item);
	res.send('<h2>LIVINGROOM/TV/POWERON</h2>');
});

router.get('/api/LIVINGROOM/TV/POWEROFF', function(req, res)
{
	item = myFindName(mySSlist, "TV Power OFF");
	executeCommand(item);
	res.send('<h2>LIVINGROOM/TV/POWERON</h2>');
});

router.get('/api/BEDROOM/TV/POWERTOGGLE', function(req, res)
{
	item = myFindName(mySSlist, "TV Bedroom Power");
	executeCommand(item);
	res.send('<h2>BEDROOM/TV/POWERTOGGLE</h2>'); 

});

router.get('/api/BEDROOM/GOODNIGHT', function(req, res)
{
	item = myFindName(mySSlist, "Good Night");
	executeCommand(item);
	res.send('<h2>BEDROOM/Good Night</h2>'); 

});

router.get('/api/LIVINGROOM/WatchLivingRoomTV', function(req, res)
{
	item = myFindName(mySSlist, "Watch Living Room TV");
	executeCommand(item);
	res.send('<h2>Watch Living Room TV</h2>'); 

});

router.get('/api/LIVINGROOM/WatchLivingRoomDVD', function(req, res)
{
	item = myFindName(mySSlist, "Watch Living Room DVD");
	executeCommand(item);
	res.send('<h2>Watch Living Room DVD</h2>'); 

});

router.get('/api/LIVINGROOM/DVDPower', function(req, res)
{
	item = myFindName(mySSlist, "DVD Power");
	executeCommand(item);
	res.send('<h2>Toggle DVD Power</h2>'); 

});

router.get('/api/LIVINGROOM/DVDTray', function(req, res)
{
	item = myFindName(mySSlist, "DVD Tray");
	executeCommand(item);
	res.send('<h2>Toggle DVD Tray</h2>'); 

});



/* 

// NOT WORKING - TOdo
router.get('/api/RELOAD', function(req, res) {

	console.log("RELOAD");
	delete require.cache['./myModule.js'];
	res.send('<h2>RELOAD</h2>');   

});

 */


// more routes for our API will happen here
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api 
app.use('/', router);
// START THE SERVER
// =============================================================================
var port = process.env.PORT || 8080; // set our port
server.listen(port);
console.log("Server version: " + myVersion + ".  The magic happens on: " + os.hostname() + " at  "  + ip.address() + " on port: " + port);
// start heartbeat LED
activityLEDBlink(300, 100);
// start heartbeat LED
setInterval(function()
{
    activityLED.writeSync(activityLED.readSync() === 0 ? 1 : 0);
	
}, 1000);