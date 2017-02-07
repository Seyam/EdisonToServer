var m = require('mraa');
var request = require('request');
var moment = require('moment');
var momentTimezone = require('moment-timezone');


console.log('MRAA Version: ' + m.getVersion());

var soundSensor = new m.Aio(0);

var threshold = 500; 

checkSoundLevels();


function checkSoundLevels(){

  var soundValue = soundSensor.read();
  console.log(soundValue);

  if(soundValue >= threshold){

    var currentTime = moment().tz("America/Chicago").format('YYYY/MM/DD HH:mm:ss');
   
    var data = {"sdata": soundValue, "did":"0001", "dtime":currentTime};
    
    request(
      {
        method: 'POST',
        url: 'http://192.168.10.107:80/sounddata',
        json: true,
        headers: {
            "content-type": "application/json",            
        },
        body: JSON.stringify(data)

      }, function(error, response, body){
      
	  //console.log(response);
     
      if(response.statusCode === 200){
        console.log('posted successfully with a sound value of ' + soundValue ); 
        setTimeout(function(){
          setTimeout(checkSoundLevels, 100);
        }, 10000);
      } else {
        console.log('oops, there was an error');
        console.log(response.statusCode + ' :::: ' + response.body);
        setTimeout(checkSoundLevels, 100);
      }
    });
  } else {
    setTimeout(checkSoundLevels, 100);
     console.log(soundValue);
  }
}