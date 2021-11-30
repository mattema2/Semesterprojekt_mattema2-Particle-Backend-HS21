const logger = require('./db/logger.js');

exports.sendEvent = null;

exports.registerEventHandlers = function (source) {
    source.addEventListener('Lux', luxEvent);
    source.addEventListener('Beleuchtungszeit', shineEvent);
    // Register more event handlers here
}

function luxEvent(event) {
    // read variables from the event
    var data = {
        eventName: event.type,
        eventData: JSON.parse(event.data).data, // the value of the event
        deviceId: JSON.parse(event.data).coreid,
        timestamp: JSON.parse(event.data).published_at
    };

    try {        
        // Log the event in the database
        logger.logOne("MyDB", "Lux", data);
        console.log("Hoi David_2");

        

        // send data to all connected clients
        exports.sendEvent(data);
    } catch (error) {
        console.log("Could not handle event: " + JSON.stringify(event) + "\n");
        console.log(error)
    }
}

function shineEvent(event) {
        // read variables from the event
    var data = {
        eventName: event.type,
        eventData: JSON.parse(event.data).data, // the value of the event
        deviceId: JSON.parse(event.data).coreid,
        timestamp: JSON.parse(event.data).published_at
    };
    
    try {        
        // Log the event in the database
        logger.logOne("MyDB", "Beleuchtungszeit", data);
        console.log("Hoi David");
    
        // send data to all connected clients
        exports.sendEvent(data);
    } catch (error) {
        console.log("Could not handle event: " + JSON.stringify(event) + "\n");
        console.log(error)
    }
}
