'use strict';

var connection = meshblu.createConnection({
  uuid: location.hash.substring(2).split('/')[0],
  token: location.hash.substring(2).split('/')[1]
});

connection.on('ready', function(data){
  console.log('ready');
  connection.on('message', function(message){
    $('iframe').attr('src', message.url);
  });
});
