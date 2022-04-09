var SerialPort = require('serialport').SerialPort;
var xbee_api = require('xbee-api');
var path = require('path');
var C = xbee_api.constants;
 
var xbeeAPI = new xbee_api.XBeeAPI({
  api_mode: 1
});
 
var serialport = new SerialPort("/dev/ttyS3", {
  baudrate: 9600,
});
 
serialport.pipe(xbeeAPI.parser);
xbeeAPI.builder.pipe(serialport);
 
serialport.on("open", function() {
  var frame_obj = { // AT Request to be sent
    type: C.FRAME_TYPE.AT_COMMAND,
    command: "NI",
    commandParameter: [],
  };
 
  xbeeAPI.builder.write(frame_obj);
});
 
// All frames parsed by the XBee will be emitted here
xbeeAPI.parser.on("data", function(frame) {
    console.log(">>", frame);
});