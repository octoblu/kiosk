'use strict';

var connection = meshblu.createConnection({
  uuid: location.hash.substring(2).split('/')[0],
  token: location.hash.substring(2).split('/')[1]
});
var currentUrl;

connection.on('ready', function(data){
  console.log('ready');
  connection.on('message', function(message){
    var url = message.url;
    if(!url){
      var payload = message.payload || {};
      url = payload.url;
    }
    updateKiosk(url);
  });
  connection.whoami({}, function(result){
    result = result || {};
    if(result.error){
      return console.log('whoami error', result);
    }
    var url = result.url;
    if(!currentUrl && url){
      updateKiosk(url);
    }
  });
});


function updateKiosk(url){
  currentUrl = url;
  console.log('Opening URL', url);
  $('#default-page').hide();
  $('iframe').attr('src', url);
}
