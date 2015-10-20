'use strict';

var connection = meshblu.createConnection({
  uuid: location.hash.substring(2).split('/')[0],
  token: location.hash.substring(2).split('/')[1]
});

var currentUrl;

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
  $('#text').hide();
  $('#text').empty();
  $('#text').attr('styles', '');
  $('#text-container').attr('style', '');
  $('#text-container').css({});
  $('#html').hide();
  $('#html').empty();

  if(object.url && currentUrl !== object.url){
    console.log('Opening URL', object.url);
    currentUrl = object.url;
    $('#default-page').hide();
    $('#iframe').attr('src', object.url);
    return;
  }

  if(object.text){
    console.log('Showing Text', object.text, 'with styles', object.textStyles);
    $('#default-page').hide();
    $('#text').show();
    $('#text').text(object.text);

    if (!object.textStyles) return;

    if (typeof object.textStyles === 'string') {
      $('#text-container').attr('style', object.textStyles);
    }
    else if (typeof object.textStyles === 'object') {
      $('#text-container').css(object.textStyles);
    }

    return;
  }

  if(object.html){
    console.log('Showing HTML', object.html);
    $('#default-page').hide();
    $('#html').show();
    $('#html').html(object.html);
    return;
  }
}
