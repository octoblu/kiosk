'use strict';

var connection = meshblu.createConnection({
  uuid: location.hash.substring(2).split('/')[0],
  token: location.hash.substring(2).split('/')[1]
});

var currentUrl, currentText, currentHTML;


connection.on('ready', function(data){
  console.log('ready');
  $('#text').fitText();

  connection.on('message', function(message){
    var object = {};
    object.url = getProperty(message, 'url');
    object.text = getProperty(message, 'text');
    object.textStyles = getProperty(message, 'textStyles');
    object.html = getProperty(message, 'html');
    updateKiosk(object);
  });
  connection.whoami({}, function(result){
    result = result || {};
    if(result.error){
      return console.log('whoami error', result);
    }
    updateKiosk(result);
  });
});

function getProperty(message, key){
  var value = message[key];
  if(!value){
    var payload = message.payload || {};
    value = payload[key];
  }
  return value;
}

function updateKiosk(object){
  object = object || {};
  object.textStyles = {};
  $('#text').hide();
  $('#text').empty();
  $('#text').attr('styles', '');
  $('#html').hide();
  $('#html').empty();

  if(object.url && currentUrl !== object.url){
    console.log('Opening URL', object.url);
    currentUrl = object.url;
    $('#default-page').hide();
    $('#iframe').attr('src', object.url);
    return;
  }

  if(object.text && currentText !== object.text){
    console.log('Showing Text', object.text, object.textStyles);
    currentText = object.text;
    $('#default-page').hide();
    $('#text').show();
    $('#text').text(object.text);
    $('#text').css(object.textStyles);
    return;
  }

  if(object.html && currentHTML !== object.html){
    console.log('Showing HTML', object.html);
    currentHTML = object.html;
    $('#default-page').hide();
    $('#html').show();
    $('#html').html(object.html);
    return;
  }
}
